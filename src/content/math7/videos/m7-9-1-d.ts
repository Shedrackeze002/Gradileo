import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { polygon } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { base, cart, coord, move, pt } from './lib/m7-9-figures.ts';

type P = [number, number];
const g = cart({ x: [-5, 5], y: [-3, 4] });

// Rectangle ABCD: A(−3, 2), B(4, 2), C(4, −1) and D(−3, −1).
const RECT: P[] = [
  [-3, 2],
  [4, 2],
  [4, -1],
  [-3, -1],
];
const NAMES = ['A', 'B', 'C', 'D'];
const PLACES = ['above left', 'above right', 'below right', 'below left'] as const;
const corner = (i: number, withCoords = true) => pt(g, NAMES[i], RECT[i][0], RECT[i][1], withCoords ? coord(RECT[i][0], RECT[i][1], NAMES[i]) : NAMES[i], PLACES[i], i === 3 ? 'good' : 'theta');

// Side AB, measured in two pieces either side of the y-axis.
const across = (id: string) =>
  figure(id, [
    g,
    polygon(g, { id: 'ab', corners: [RECT[0], RECT[1]], open: true, tone: 'brand' }),
    corner(0),
    corner(1),
    move(g, 'left', [-3, 2.6], [0, 2.6], { label: '3', side: 'left', dashed: false }),
    move(g, 'right', [0, 2.6], [4, 2.6], { label: '4', side: 'left', dashed: false }),
  ]);

// The missing corner D: below A, and across from C.
const missing = (id: string) =>
  figure(id, [
    g,
    polygon(g, { id: 'r', corners: RECT, tone: 'brand', dashed: [false, false, true, true] }),
    corner(0),
    corner(1),
    corner(2),
    move(g, 'down', [-3, 2], [-3, -1], { tone: 'good' }),
    move(g, 'over', [4, -1], [-3, -1], { tone: 'good' }),
    corner(3),
  ]);

// The perimeter: the length (7) along the top and the width (3) down the side, on a plane one
// unit wider so the width's label is clear of the x-axis.
const gw = cart({ x: [-5, 6], y: [-3, 4] });
const sides = (id: string) =>
  figure(id, [
    gw,
    polygon(g, { id: 'r', corners: RECT, tone: 'brand' }),
    ...[0, 1, 2, 3].map((i) => corner(i, false)),
    move(g, 'len', [-3, 2.6], [4, 2.6], { label: '7', side: 'left', tone: 'adj', dashed: false }),
    move(gw, 'wid', [4.6, 2], [4.6, -1], { label: '3', side: 'left', tone: 'opp', dashed: false }),
  ]);

const video: Explainer = {
  id: 'm7-9-1-d',
  lessonId: 'm7-9-1',
  title: 'The Cartesian Plane, Part 4: Distances and Shapes',
  thumbnailTitle: 'Distances and Shapes',
  thumbnail: 'ms',
  summary:
    'Two points with the same y-coordinate are on a horizontal line; to find the distance between them across an axis, add the units on each side of 0: from A(−3, 2) to B(4, 2) is 3 + 4 = 7 units, not 4 − 3 = 1. Rectangle ABCD with A(−3, 2), B(4, 2) and C(4, −1) has its missing corner at D(−3, −1), a width of 3 units and a perimeter of 2 × (7 + 3) = 20 units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane and Transformations · Part 4', title: 'Distances and Shapes', subtitle: 'Counting units across an axis' }],
      lines: [
        { say: 'Points in the Cartesian plane can be the corners of a shape, like a rectangle drawn on a map.', show: 'title' },
        { say: 'In this video, you will find the length of a side that crosses an axis, find a missing corner, and work out a perimeter.' },
      ],
    },
    {
      chapter: 'Length across an axis',
      layout: 'split',
      leftWidth: 680,
      left: [across('ac')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'How long is side $AB$, from $A(-3,\\ 2)$ to $B(4,\\ 2)$?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['{-3} \\text{ to } 0\\!: \\ 3 \\text{ units}', '0 \\text{ to } 4\\!: \\ 4 \\text{ units}', 'AB = 3 + 4 = 7 \\text{ units}'] },
      ],
      lines: [
        { say: 'Point A is at negative three, two, and Point B is at four, two, on the same grid line. How long is side A B?', show: [...base('ac'), 'ac.A', 'ac.B', 'q'] },
        { say: 'Both points have a y-coordinate of two. So they are on the same horizontal line, and we can count the units across.', show: 'ac.ab', focus: 'ac.ab' },
        { say: 'The side crosses the y-axis, so count it in two pieces. From negative three to zero is three units.', show: ['ac.left', 'm.0'], focus: ['ac.left', 'm.0'] },
        { say: 'From zero to four is four units.', show: ['ac.right', 'm.1'], focus: ['ac.right', 'm.1'] },
        { say: 'Add the two pieces: three plus four is seven. So side A B is seven units long.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting across the axis', md: 'From $-3$ to $4$ is **not** $4 - 3 = 1$ unit. Count the units on **both sides** of the origin: $3 + 4 = 7$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{4 - 3 = 1} \\quad \\text{wrong}', '\\good{3 + 4 = 7} \\quad \\text{right}'] },
      ],
      lines: [
        { say: 'Watch out. It is tempting to look at the numbers four and three and subtract them. Four minus three is one. But the side is clearly longer than one unit!', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The three is really negative three, on the other side of the origin. So count the units on both sides of zero, and add them: three plus four is seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The missing corner',
      layout: 'split',
      leftWidth: 680,
      left: [missing('mc')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Rectangle $ABCD$ has $A(-3,\\ 2)$, $B(4,\\ 2)$ and $C(4,\\ {-1})$. Find $D$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{below } A\\!: \\ x = {-3}', '\\text{across from } C\\!: \\ y = {-1}', 'D(-3,\\ {-1})'] },
      ],
      lines: [
        { say: 'A rectangle A B C D has three of its corners at A, B and C. Where is the fourth corner, D?', show: [...base('mc'), 'mc.A', 'mc.B', 'mc.C', 'mc.r-s0', 'mc.r-s1', 'q'] },
        { say: 'In a rectangle, the sides meet at square corners. So D is straight below A. That means D has the same x-coordinate as A: negative three.', show: ['mc.down', 'm.0'], focus: ['mc.down', 'm.0'] },
        { say: 'D is also straight across from C, so it has the same y-coordinate as C: negative one.', show: ['mc.over', 'm.1'], focus: ['mc.over', 'm.1'] },
        { say: 'So the missing corner is D, at negative three, negative one.', show: ['mc.D', 'mc.r-s2', 'mc.r-s3', 'mc.r-fill', 'm.2'], focus: ['mc.D', 'm.2'] },
      ],
    },
    {
      chapter: 'The perimeter',
      layout: 'split',
      leftWidth: 680,
      left: [sides('pr')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\adj{\\text{length} = 7}', '\\opp{\\text{width} = 2 + 1 = 3}', 'P = 2 \\times (7 + 3)', 'P = 2 \\times 10 = 20 \\text{ units}'],
        },
      ],
      lines: [
        { say: 'Now find the perimeter of the rectangle. The perimeter is the distance all the way around it.', show: [...base('pr'), 'pr.r', 'pr.r-fill', 'pr.A', 'pr.B', 'pr.C', 'pr.D'] },
        { say: 'The length is side A B, which is seven units.', show: ['pr.len', 'm.0'], focus: ['pr.len', 'm.0'] },
        { say: 'The width is side B C. It goes from y equals two down to y equals negative one, so it crosses the x-axis. From two down to zero is two units, and from zero to negative one is one more. The width is three units.', show: ['pr.wid', 'm.1'], focus: ['pr.wid', 'm.1'] },
        { say: 'A rectangle has two lengths and two widths. So the perimeter is two times seven plus three. Seven plus three is ten, and two times ten is twenty. The perimeter is twenty units.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How far is it from $P(-5,\\ {-2})$ to $Q(1,\\ {-2})$?',
          choices: ['$4$ units', '$6$ units', '$7$ units', '$3$ units'],
          answer: 1,
          working: 'Both points have $y = -2$, so count across. From $-5$ to $0$ is $5$ units, and from $0$ to $1$ is $1$ unit: $5 + 1 = 6$ units.',
        },
      ],
      lines: [
        { say: 'Your turn. How far is it from Point P, at negative five, negative two, to Point Q, at one, negative two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: six units. From negative five to zero is five units, and from zero to one is one unit. Five plus one is six. Choice A subtracts five minus one, instead of counting both sides of the origin.', show: 'q.answer' },
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
            'Points with the same $y$-coordinate are on a horizontal line. Points with the same $x$-coordinate are on a vertical line.',
            'To find a distance across an axis, add the units on each side of $0$.',
            'The corners of a rectangle line up: each shares an $x$-coordinate with one corner and a $y$-coordinate with another.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Points with the same y-coordinate are on a horizontal line. Points with the same x-coordinate are on a vertical line.', show: 'sum.0' },
        { say: 'To find a distance across an axis, add the units on each side of zero.', show: 'sum.1' },
        { say: 'And the corners of a rectangle line up with each other, which helps you find a missing corner. In the next lesson, you will slide shapes across the plane. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
