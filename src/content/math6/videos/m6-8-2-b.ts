import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { move } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { cart, triangle } from './lib/m6-8-figures.ts';

const gy = cart({ y: [-1, 5] });
const gx = cart({ x: [-1, 5] });
type P = [number, number];

// Reflection in the y-axis: A(1, 1), B(4, 1), C(1, 4) go to A'(−1, 1), B'(−4, 1), C'(−1, 4).
const Y_ABC: P[] = [
  [1, 1],
  [4, 1],
  [1, 4],
];
const inY = (id: string, arrows = false) =>
  figure(id, [
    gy,
    triangle(gy, { id: 't', corners: Y_ABC, names: ['A', 'B', 'C'], places: ['above right', 'below right', 'above right'] }),
    triangle(gy, { id: 'i', corners: Y_ABC.map(([x, y]) => [-x, y] as P), names: ["A'", "B'", "C'"], places: ['above left', 'below left', 'above left'], tone: 'good' }),
    ...(arrows ? [move(gy, 'to', [4, 1], [0, 1], { label: '4', side: 'left', tone: 'adj', dashed: false }), move(gy, 'fro', [0, 1], [-4, 1], { label: '4', side: 'left', tone: 'adj', dashed: false })] : []),
  ]);

// Reflection in the x-axis: A(1, 2), B(4, 3), C(2, 4) go to A'(1, −2), B'(4, −3), C'(2, −4).
const X_ABC: P[] = [
  [1, 2],
  [4, 3],
  [2, 4],
];
const inX = (id: string, arrows = false) =>
  figure(id, [
    gx,
    triangle(gx, { id: 't', corners: X_ABC, names: ['A', 'B', 'C'], places: ['left', 'right', 'above left'] }),
    triangle(gx, { id: 'i', corners: X_ABC.map(([x, y]) => [x, -y] as P), names: ["A'", "B'", "C'"], places: ['left', 'right', 'below left'], tone: 'good' }),
    ...(arrows ? [move(gx, 'to', [2, 4], [2, 0], { label: '4', side: 'left', tone: 'opp' }), move(gx, 'fro', [2, 0], [2, -4], { label: '4', side: 'left', tone: 'opp' })] : []),
  ]);

const shape = (id: string) => [`${id}.grid`, `${id}.axes`, `${id}.t`, `${id}.t-fill`, `${id}.t-0`, `${id}.t-1`, `${id}.t-2`];
const image = (id: string) => [`${id}.i`, `${id}.i-fill`, `${id}.i-0`, `${id}.i-1`, `${id}.i-2`];

const video: Explainer = {
  id: 'm6-8-2-b',
  lessonId: 'm6-8-2',
  title: 'Translations and Reflections, Part 2: Reflections in the Axes',
  thumbnailTitle: 'Reflections in the Axes',
  thumbnail: 'ry',
  summary:
    'In a reflection, the line of reflection is the mirror line: each point and its image are the same distance from it, on opposite sides. Reflected in the y-axis, y stays the same and x changes to its opposite, so B(4, 1) goes to B′(−4, 1). Reflected in the x-axis, x stays the same and y changes to its opposite, so C(2, 4) goes to C′(2, −4).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane · Part 2', title: 'Reflections in the Axes', subtitle: 'Flipping a shape over an axis' }],
      lines: [
        { say: 'On a garden plan, a flower bed can be flipped to the other side of a path, like a mirror image.', show: 'title' },
        { say: 'In this video, you will reflect shapes in the x-axis and the y-axis, and see how their coordinates change.' },
      ],
    },
    {
      chapter: 'Line of reflection',
      layout: 'split',
      leftWidth: 640,
      left: [inY('lr')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Line of reflection', md: 'In a reflection, the **line of reflection** is the mirror line. Each point and its image are the same distance from the line, on opposite sides.' },
      ],
      lines: [
        { say: 'A reflection flips a shape over a line, like a mirror. In a reflection, the mirror line is called the line of reflection.', show: 'def' },
        { say: 'Here is triangle A B C. Let’s reflect it in the y-axis. The y-axis is the mirror.', show: shape('lr'), focus: 'lr.y-axis' },
        { say: 'Each point and its image are the same distance from the line of reflection, but on opposite sides. The image is a mirror image, facing the other way.', show: image('lr'), focus: 'lr.i' },
      ],
    },
    {
      chapter: 'In the y-axis',
      layout: 'split',
      leftWidth: 640,
      left: [inY('ry', true)],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $B\'$, the image of $B(4,\\ 1)$, after a reflection in the $y$-axis.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{x: 4 \\to {-4}}', 'y: 1 \\to 1', "B'(-4,\\ 1)"] },
      ],
      lines: [
        { say: 'Find B prime, the image of B at four, one, after a reflection in the y-axis.', show: [...shape('ry'), 'q'], focus: 'ry.t-1' },
        { say: 'Point B is four units to the right of the y-axis. So its image is four units to the left of it. The x-coordinate becomes negative four.', show: ['ry.to', 'ry.fro', 'm.0'], focus: ['ry.to', 'ry.fro', 'm.0'] },
        { say: 'The point does not move up or down, so the y-coordinate stays one.', show: 'm.1', focus: 'm.1' },
        { say: 'So B prime is at negative four, one. Four and negative four are opposites: they are the same distance from zero, on opposite sides.', show: [...image('ry'), 'm.2'], focus: 'm.2' },
        { say: 'In a reflection in the y-axis, the y-coordinates stay the same, and the x-coordinates change to their opposites.' },
      ],
    },
    {
      chapter: 'In the x-axis',
      layout: 'split',
      leftWidth: 420,
      left: [inX('rx', true)],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $C\'$, the image of $C(2,\\ 4)$, after a reflection in the $x$-axis.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x: 2 \\to 2', '\\opp{y: 4 \\to {-4}}', "C'(2,\\ {-4})"] },
      ],
      lines: [
        { say: 'Now reflect a triangle in the x-axis. This time the x-axis is the mirror.', show: shape('rx'), focus: 'rx.x-axis' },
        { say: 'Find C prime, the image of C at two, four. Point C is four units above the x-axis, so its image is four units below it. The y-coordinate becomes negative four.', show: ['q', 'rx.to', 'rx.fro', 'm.1'], focus: ['rx.to', 'rx.fro', 'm.1'] },
        { say: 'The point does not move across, so the x-coordinate stays two. C prime is at two, negative four.', show: ['m.0', 'm.2'], focus: 'm.2' },
        { say: 'In a reflection in the x-axis, the x-coordinates stay the same, and the y-coordinates change to their opposites.', show: image('rx') },
      ],
    },
    {
      chapter: 'Every vertex',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Vertex', 'Image after a reflection in the $x$-axis'],
          rows: [
            ['$A(1,\\ 2)$', "$A'(1,\\ {-2})$"],
            ['$B(4,\\ 3)$', "$B'(4,\\ {-3})$"],
            ['$C(2,\\ 4)$', "$C'(2,\\ {-4})$"],
          ],
        },
      ],
      lines: [
        { say: 'Here are all three vertices, reflected in the x-axis. Point A at one, two goes to A prime, at one, negative two.', show: 't.0', focus: 't.0' },
        { say: 'Point B at four, three goes to B prime, at four, negative three.', show: 't.1', focus: 't.1' },
        { say: 'And Point C at two, four goes to C prime, at two, negative four. Every x stays the same, and every y changes to its opposite.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reflecting in the x-axis changes y', md: 'Reflecting in the $x$-axis changes the $y$-coordinate, not the $x$-coordinate. The points move **up or down** across the $x$-axis.' },
        {
          kind: 'callout',
          id: 'tip',
          tone: 'tip',
          title: 'Relating the coordinates',
          md: 'Translation: add or subtract the same numbers for every vertex. Reflection in the $x$-axis: $(x,\\ y) \\to (x,\\ {-y})$. Reflection in the $y$-axis: $(x,\\ y) \\to (-x,\\ y)$.',
        },
      ],
      lines: [
        { say: 'Watch out. Reflecting in the x-axis changes the y-coordinates, not the x-coordinates. That can seem backwards!', show: 'oops' },
        { say: 'But think about the picture. The x-axis runs across, so the points flip up or down over it. Moving up or down changes y.' },
        { say: 'Here is everything together. In a translation, add or subtract the same numbers for every vertex. In a reflection in the x-axis, x stays the same and y changes to its opposite. In a reflection in the y-axis, y stays the same and x changes to its opposite.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "Point $Q(-3,\\ 5)$ is reflected in the $x$-axis. Where is $Q'$?",
          choices: ['$(3,\\ 5)$', '$(-5,\\ {-3})$', '$(3,\\ {-5})$', '$(-3,\\ {-5})$'],
          answer: 3,
          working: 'A reflection in the $x$-axis keeps $x$ the same and changes $y$ to its opposite: $Q\'(-3,\\ {-5})$.',
        },
      ],
      lines: [
        { say: 'Your turn. Point Q, at negative three, five, is reflected in the x-axis. Where is Q prime? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is D, negative three, negative five. A reflection in the x-axis keeps x the same, and changes y to its opposite. Q is five units above the x-axis, so Q prime is five units below it. Choice A reflects in the y-axis instead.',
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
          items: ['Each point and its image are the same distance from the line of reflection, on opposite sides.', 'Reflection in the $x$-axis: $x$ stays the same, $y$ changes to its opposite.', 'Reflection in the $y$-axis: $y$ stays the same, $x$ changes to its opposite.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Each point and its image are the same distance from the line of reflection, on opposite sides.', show: 'sum.0' },
        { say: 'In a reflection in the x-axis, x stays the same, and y changes to its opposite.', show: 'sum.1' },
        { say: 'In a reflection in the y-axis, y stays the same, and x changes to its opposite. In the next lesson, you will turn shapes in the Cartesian plane. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
