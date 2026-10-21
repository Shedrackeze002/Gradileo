import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, base, cart, mirror, shapeIds, triangle } from './lib/m7-9-figures.ts';

type P = [number, number];

// Reflection in the y-axis: A(1, 1), B(5, 2), C(2, 4) go to A'(−1, 1), B'(−5, 2), C'(−2, 4).
const gy = cart({ x: [-6, 6], y: [-1, 5] });
const Y_ABC: P[] = [
  [1, 1],
  [5, 2],
  [2, 4],
];
const inY = (id: string) =>
  figure(id, [
    gy,
    mirror(gy, 'm', 'y'),
    triangle(gy, { id: 't', corners: Y_ABC, names: ['A', 'B', 'C'], places: ['below right', 'right', 'above right'] }),
    triangle(gy, { id: 'i', corners: Y_ABC.map(([x, y]) => [-x, y] as P), names: ["A'", "B'", "C'"], places: ['below left', 'left', 'above left'], tone: 'good' }),
    arrow(gy, 'a1', [1, 1], [0, 1], { tone: 'theta', dashed: false, group: 'da' }),
    arrow(gy, 'a2', [0, 1], [-1, 1], { tone: 'theta', dashed: false, group: 'da' }),
    arrow(gy, 'b1', [5, 2], [0, 2], { tone: 'theta', dashed: false, label: '5', side: 'right', group: 'db' }),
    arrow(gy, 'b2', [0, 2], [-5, 2], { tone: 'theta', dashed: false, label: '5', side: 'right', group: 'db' }),
  ]);

// Reflection in the x-axis: P(−4, 1), Q(−1, 2), R(−3, 5) go to P'(−4, −1), Q'(−1, −2), R'(−3, −5).
const gx = cart({ x: [-6, 2], y: [-6, 6] });
const X_PQR: P[] = [
  [-4, 1],
  [-1, 2],
  [-3, 5],
];
const inX = (id: string) =>
  figure(id, [
    gx,
    mirror(gx, 'm', 'x'),
    triangle(gx, { id: 't', corners: X_PQR, names: ['P', 'Q', 'R'], places: ['above left', 'below left', 'above left'] }),
    triangle(gx, { id: 'i', corners: X_PQR.map(([x, y]) => [x, -y] as P), names: ["P'", "Q'", "R'"], places: ['below left', 'above left', 'below left'], tone: 'good' }),
    arrow(gx, 'p1', [-4, 1], [-4, 0], { tone: 'theta', dashed: false, group: 'dp' }),
    arrow(gx, 'p2', [-4, 0], [-4, -1], { tone: 'theta', dashed: false, group: 'dp' }),
  ]);

const video: Explainer = {
  id: 'm7-9-3',
  lessonId: 'm7-9-3',
  title: 'Reflections and Rotations, Part 1: Reflections in the Axes',
  thumbnailTitle: 'Reflections in the Axes',
  thumbnail: 'ry',
  summary:
    'A reflection flips a shape over a mirror line: each image point is the same distance from the mirror line as the original, on the other side. Reflected in the y-axis, x changes sign and y stays the same, so B(5, 2) goes to B′(−5, 2). Reflected in the x-axis, y changes sign and x stays the same, so R(−3, 5) goes to R′(−3, −5). Measure from the mirror line, not from the origin.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane and Transformations · Part 1', title: 'Reflections in the Axes', subtitle: 'Flipping a shape over a mirror line' }],
      lines: [
        { say: 'Hold a paper cut-out shape up to a mirror, and you see it flipped. That flip is another kind of transformation.', show: 'title' },
        { say: 'In this video, you will reflect shapes in the x-axis and the y-axis, and find the pattern in their coordinates.' },
      ],
    },
    {
      chapter: 'Reflection',
      layout: 'split',
      leftWidth: 660,
      left: [inY('rf')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Reflection',
          md: 'A **reflection** flips a shape over a **mirror line**. Each image point is the **same distance** from the mirror line as the original point, but on the **other side**.',
        },
      ],
      lines: [
        { say: 'Here is triangle A B C, and a mirror line. This time, the mirror line is the y-axis.', show: [...base('rf'), ...shapeIds('rf', 't'), 'rf.m'], focus: 'rf.m' },
        { say: 'A reflection flips a shape over a mirror line, like the picture you see in a mirror.', show: ['def', ...shapeIds('rf', 'i')], focus: 'rf.i' },
        { say: 'Each image point is the same distance from the mirror line as the original point, but on the other side. If you folded the grid along the mirror line, the triangle and its image would match exactly.', focus: ['rf.t', 'rf.i'] },
      ],
    },
    {
      chapter: 'Reflecting in the y-axis',
      layout: 'split',
      leftWidth: 660,
      left: [inY('ry')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Reflect $A(1,\\ 1)$, $B(5,\\ 2)$ and $C(2,\\ 4)$ in the $y$-axis.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["A(1,\\ 1) \\to A'(\\adj{-1},\\ 1)", "B(5,\\ 2) \\to B'(\\adj{-5},\\ 2)", "C(2,\\ 4) \\to C'(\\adj{-2},\\ 4)"] },
      ],
      lines: [
        { say: 'Let’s reflect triangle A B C in the y-axis, one vertex at a time.', show: [...base('ry'), ...shapeIds('ry', 't'), 'ry.m', 'q'] },
        { say: 'Point A is at one, one. It is one unit to the right of the y-axis. So its image is one unit to the left of the y-axis, at the same height. So A prime is at negative one, one.', show: ['ry.da', 'ry.i-0', 'm.0'], focus: ['ry.da', 'm.0'] },
        { say: 'Point B is five units right of the mirror line, so B prime is five units left of it. B prime is at negative five, two, at the same height as B.', show: ['ry.db', 'ry.i-1', 'm.1'], focus: ['ry.db', 'm.1'] },
        { say: 'In the same way, C at two, four goes to C prime at negative two, four.', show: ['ry.i-2', 'm.2'], focus: ['ry.i-2', 'm.2'] },
        { say: 'Look at the pattern. The y-coordinates stay the same. The x-coordinates change sign: positive becomes negative.', show: ['ry.i', 'ry.i-fill'], focus: 'm' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Measure from the mirror line', md: 'The image is the same distance from the **mirror line** as the original, not the same distance from the origin or from the original point.' }],
      lines: [
        { say: 'Watch out. Always measure from the mirror line.', show: 'oops' },
        { say: 'The image is the same distance from the mirror line as the original point. It is not the same distance from the origin, and you do not measure from the original point to the image.' },
        { say: 'For Point B, count the five units from B to the mirror line. Then count five more units past it, on the other side.' },
      ],
    },
    {
      chapter: 'Reflecting in the x-axis',
      layout: 'split',
      leftWidth: 520,
      left: [inX('rx')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Reflect $P(-4,\\ 1)$, $Q(-1,\\ 2)$ and $R(-3,\\ 5)$ in the $x$-axis.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["P(-4,\\ 1) \\to P'(-4,\\ \\opp{-1})", "Q(-1,\\ 2) \\to Q'(-1,\\ \\opp{-2})", "R(-3,\\ 5) \\to R'(-3,\\ \\opp{-5})"] },
      ],
      lines: [
        { say: 'Now the mirror line is the x-axis. Reflect triangle P Q R in it.', show: [...base('rx'), ...shapeIds('rx', 't'), 'rx.m', 'q'], focus: 'rx.m' },
        { say: 'Point P is at negative four, one. It is one unit above the x-axis. So its image is one unit below the x-axis. P prime is at negative four, negative one.', show: ['rx.dp', 'rx.i-0', 'm.0'], focus: ['rx.dp', 'm.0'] },
        { say: 'In the same way, Q at negative one, two goes to Q prime at negative one, negative two. And R at negative three, five goes to R prime at negative three, negative five.', show: ['rx.i-1', 'rx.i-2', 'm.1', 'm.2', 'rx.i', 'rx.i-fill'], focus: ['m.1', 'm.2'] },
        { say: 'This time the x-coordinates stay the same, and the y-coordinates change sign.', focus: 'm' },
      ],
    },
    {
      chapter: 'The two rules',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Reflection in the…', 'What happens', 'Example'],
          rows: [
            ['$x$-axis', '$y$ changes sign', '$(3,\\ 2) \\to (3,\\ {-2})$'],
            ['$y$-axis', '$x$ changes sign', '$(3,\\ 2) \\to (-3,\\ 2)$'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A way to remember', md: 'The coordinate that changes is the one that measures distance **across the mirror line**. The $x$-axis runs across, so it flips the up-down number, $y$.' },
      ],
      lines: [
        { say: 'Here are the two rules together. A reflection in the x-axis changes the sign of y. So the point at three, two goes to the point at three, negative two.', show: 't.0', focus: 't.0' },
        { say: 'A reflection in the y-axis changes the sign of x. So the point at three, two goes to the point at negative three, two, on the other side of the y-axis.', show: 't.1', focus: 't.1' },
        { say: 'To remember which one changes, think about which way the point moves. Reflecting in the x-axis moves a point up or down, so only y changes. Reflecting in the y-axis moves it left or right, so only x changes.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "Point $K(-3,\\ 5)$ is reflected in the $x$-axis. Where is $K'$?",
          choices: ['$(3,\\ 5)$', '$(-3,\\ {-5})$', '$(3,\\ {-5})$', '$(5,\\ {-3})$'],
          answer: 1,
          working: 'A reflection in the $x$-axis keeps $x$ and changes the sign of $y$: $(-3,\\ 5) \\to (-3,\\ {-5})$.',
        },
      ],
      lines: [
        { say: 'Your turn. Point K, at negative three, five, is reflected in the x-axis. Where is K prime? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: negative three, negative five. A reflection in the x-axis keeps x the same and changes the sign of y. Choice A reflects in the y-axis instead.', show: 'q.answer' },
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
          items: ['A reflection flips a shape over a mirror line. Each image point is the same distance from the line, on the other side.', 'In the $x$-axis, $y$ changes sign. In the $y$-axis, $x$ changes sign.', 'Measure from the mirror line, not from the origin.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A reflection flips a shape over a mirror line. Each image point is the same distance from the line, on the other side.', show: 'sum.0' },
        { say: 'In the x-axis, y changes sign. In the y-axis, x changes sign.', show: 'sum.1' },
        { say: 'And always measure from the mirror line, not from the origin. In the next part, you will turn shapes half way around the origin. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
