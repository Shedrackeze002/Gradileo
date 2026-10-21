import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dial } from '@/content/math6/videos/lib/m6-8-figures.ts';
import { arrow, base, cart, coord, pt, shapeIds, swing, tag, triangle } from './lib/m7-9-figures.ts';

type P = [number, number];

// Clockwise and counterclockwise from a hand pointing up (at the 12).
const directions = (id: string) =>
  figure(
    id,
    [
      dial({
        name: 'd',
        hands: [{ id: 'up', deg: 90 }],
        turns: [
          { id: 'cw', from: 85, to: 5, tone: 'adj' },
          { id: 'ccw', from: 95, to: 175, tone: 'opp' },
        ],
      }),
    ],
    400,
  );

// One point turned a half turn: A(1, 2) is 1 right and 2 up; A'(−1, −2) is 1 left and 2 down. The
// dashed line from A through the origin to A' shows the half turn.
const g = cart({ x: [-5, 5], y: [-5, 5] });
const onePoint = (id: string) =>
  figure(id, [
    g,
    pt(g, 'O', 0, 0, '', 'above right', 'ink'),
    arrow(g, 'ax', [0, 0], [1, 0], { tone: 'adj', dashed: false }),
    arrow(g, 'ay', [1, 0], [1, 2], { tone: 'opp', dashed: false }),
    pt(g, 'A', 1, 2, coord(1, 2, 'A'), 'above right', 'theta'),
    swing(g, 'turn', 1.4, 63, 243, 'good'),
    arrow(g, 'bx', [0, 0], [-1, 0], { tone: 'adj', dashed: false }),
    arrow(g, 'by', [-1, 0], [-1, -2], { tone: 'opp', dashed: false }),
    pt(g, 'A2', -1, -2, coord(-1, -2, "A'"), 'below left', 'good'),
  ]);

// Triangle ABC, A(1, 2), B(4, 1), C(3, 4), turned 180° about the origin to A'(−1, −2),
// B'(−4, −1), C'(−3, −4).
const ABC: P[] = [
  [1, 2],
  [4, 1],
  [3, 4],
];
const IMG: P[] = ABC.map(([x, y]) => [-x, -y]);
const half = (id: string) =>
  figure(id, [
    g,
    triangle(g, { id: 't', corners: ABC, names: ['A', 'B', 'C'], places: ['above left', 'below right', 'above right'] }),
    triangle(g, { id: 'i', corners: IMG, names: ['', "B'", "C'"], places: ['above', 'left', 'below left'], tone: 'good' }),
    // A' sits next to the y-axis numbers, so its name goes just inside the triangle.
    pt(g, 'i-0', -1, -2, '', 'above', 'good'),
    tag(g, 'i-0name', -1.75, -2.15, "A'", 'center', 'good'),
    swing(g, 'turn', 1, 63, 243, 'theta'),
  ]);

const video: Explainer = {
  id: 'm7-9-3-b',
  lessonId: 'm7-9-3',
  title: 'Reflections and Rotations, Part 2: Half Turns',
  thumbnailTitle: 'Half Turns',
  thumbnail: 'ht',
  summary:
    'A rotation turns a shape around a fixed point, the centre of rotation; here it is the origin. Clockwise is the way clock hands move, and counterclockwise the other way. A 180° rotation is a half turn, the same either way: right becomes left and up becomes down, so both coordinates change sign. Triangle ABC with A(1, 2), B(4, 1) and C(3, 4) goes to A′(−1, −2), B′(−4, −1) and C′(−3, −4).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane and Transformations · Part 2', title: 'Half Turns', subtitle: 'Rotating 180° about the origin' }],
      lines: [
        { say: 'Spin a pinwheel, and its blades turn around the centre. A turn is the third kind of transformation in this lesson.', show: 'title' },
        { say: 'In this video, you will turn shapes half way around the origin, and see what happens to their coordinates.' },
      ],
    },
    {
      chapter: 'Rotation',
      layout: 'split',
      leftWidth: 460,
      left: [directions('cw')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Rotation',
          md: 'A **rotation** turns a shape around a fixed point, the **centre of rotation**. In this lesson the centre is the origin. A turn can be [[adj:clockwise]] (the way clock hands move) or [[opp:counterclockwise]].',
        },
      ],
      lines: [
        { say: 'A rotation turns a shape around a fixed point, called the centre of rotation. In this lesson, the centre is always the origin.', show: 'def' },
        { say: 'A turn can go two ways. Clockwise is the way the hands of a clock move: from the twelve, toward the three.', show: ['cw.d-face', 'cw.d-up', 'cw.d-cw'], focus: 'cw.d-cw' },
        { say: 'Counterclockwise is the other way: from the twelve, toward the nine.', show: 'cw.d-ccw', focus: 'cw.d-ccw' },
        { say: 'We measure turns in degrees. A full turn is three hundred sixty degrees, a half turn is one hundred eighty degrees, and a quarter turn is ninety degrees.' },
      ],
    },
    {
      chapter: 'Turning one point',
      layout: 'split',
      leftWidth: 640,
      left: [onePoint('op')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Rotate $A(1,\\ 2)$ $180^\\circ$ about the origin.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A\\!: \\adj{1 \\text{ right}}, \\ \\opp{2 \\text{ up}}', "A'\\!: \\adj{1 \\text{ left}}, \\ \\opp{2 \\text{ down}}", "A'(-1,\\ {-2})"] },
      ],
      lines: [
        { say: 'Let’s turn one point, A, at one, two, a half turn about the origin.', show: [...base('op'), 'op.O', 'op.A', 'q'] },
        { say: 'To get to A from the origin, you go one unit right and two units up.', show: ['op.ax', 'op.ay', 'm.0'], focus: ['op.ax', 'op.ay', 'm.0'] },
        { say: 'Now turn that whole path half way around. Right turns into left, and up turns into down. It does not matter which way you turn: half way round is the same either way.', show: 'op.turn', focus: 'op.turn' },
        { say: 'So the image is one unit left and two units down, and A prime is at negative one, negative two. Both coordinates changed sign.', show: ['op.bx', 'op.by', 'op.A2', 'm.1', 'm.2'], focus: ['op.A2', 'm.1', 'm.2'] },
      ],
    },
    {
      chapter: 'A half turn',
      layout: 'split',
      leftWidth: 640,
      left: [half('ht')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Rotate triangle $ABC$ $180^\\circ$ about the origin.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["A(1,\\ 2) \\to A'(-1,\\ {-2})", "B(4,\\ 1) \\to B'(-4,\\ {-1})", "C(3,\\ 4) \\to C'(-3,\\ {-4})"] },
      ],
      lines: [
        { say: 'Now rotate triangle A B C one hundred eighty degrees about the origin.', show: [...base('ht'), ...shapeIds('ht', 't'), 'q'] },
        { say: 'For a half turn, change the sign of both coordinates. Point A, at one, two, goes to A prime, at negative one, negative two.', show: ['ht.turn', 'ht.i-0', 'ht.i-0name', 'm.0'], focus: ['ht.turn', 'm.0'] },
        { say: 'B at four, one goes to B prime at negative four, negative one. And C at three, four goes to C prime at negative three, negative four.', show: ['ht.i-1', 'ht.i-2', 'm.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Join the image vertices. The image is in Quadrant three, and it is upside down. It is the same size and shape as the original, just turned.', show: ['ht.i', 'ht.i-fill'], focus: 'ht.i' },
      ],
    },
    {
      chapter: 'Use tracing paper',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Use tracing paper', md: 'Trace the shape and the axes. Hold the origin with your pencil point and turn the paper. When the axes line up again, the shape is in its new position.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Half turn', md: 'A $180^\\circ$ rotation about the origin changes the sign of **both** coordinates: $(x,\\ y) \\to (-x,\\ -y)$.' },
      ],
      lines: [
        { say: 'You can check a rotation with tracing paper. Trace the shape and the axes.', show: 'tip' },
        { say: 'Hold the origin with your pencil point, and turn the paper. When the axes line up again, the traced shape is in its new position.' },
        { say: 'For a half turn, the traced axes line up again after you turn the paper upside down. And the coordinates follow one rule: both of them change sign.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "Point $M(-2,\\ 5)$ is rotated $180^\\circ$ about the origin. Where is $M'$?",
          choices: ['$(2,\\ {-5})$', '$(-2,\\ {-5})$', '$(2,\\ 5)$', '$(5,\\ {-2})$'],
          answer: 0,
          working: 'A half turn changes the sign of both coordinates: $(-2,\\ 5) \\to (2,\\ {-5})$.',
        },
      ],
      lines: [
        { say: 'Your turn. Point M, at negative two, five, is rotated one hundred eighty degrees about the origin. Where is M prime? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: two, negative five. A half turn changes the sign of both coordinates. Choice B changes only the sign of y, which is a reflection in the x-axis.', show: 'q.answer' },
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
          items: ['A rotation turns a shape around a centre of rotation, clockwise or counterclockwise.', 'A $180^\\circ$ rotation is a half turn. Clockwise or counterclockwise does not matter.', 'For a half turn about the origin, both coordinates change sign.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rotation turns a shape around a centre of rotation, clockwise or counterclockwise.', show: 'sum.0' },
        { say: 'A rotation of one hundred eighty degrees is a half turn, and the direction does not matter.', show: 'sum.1' },
        { say: 'For a half turn about the origin, both coordinates change sign. In the next part, you will turn shapes a quarter turn. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
