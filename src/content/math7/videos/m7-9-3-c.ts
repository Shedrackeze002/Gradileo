import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dial } from '@/content/math6/videos/lib/m6-8-figures.ts';
import { arrow, base, cart, coord, pt, shapeIds, swing, triangle } from './lib/m7-9-figures.ts';

type P = [number, number];

// P(4, 2) turned 90° counterclockwise: the path 4 right (blue) and 2 up (orange) turns into
// 4 up (blue) and 2 left (orange), so P'(−2, 4).
const gp = cart({ x: [-4, 5], y: [-1, 5] });
const quarter = (id: string) =>
  figure(id, [
    gp,
    arrow(gp, 'r4', [0, 0], [4, 0], { tone: 'adj', dashed: false, label: '4\\text{ right}', side: 'left', at: 0.62 }),
    arrow(gp, 'u2', [4, 0], [4, 2], { tone: 'opp', dashed: false, label: '2\\text{ up}', side: 'right' }),
    pt(gp, 'P', 4, 2, coord(4, 2, 'P'), 'above', 'theta'),
    swing(gp, 'turn', 1.3, 27, 117, 'good'),
    arrow(gp, 'u4', [0, 0], [0, 4], { tone: 'adj', dashed: false, label: '4\\text{ up}', side: 'right', at: 0.6 }),
    arrow(gp, 'l2', [0, 4], [-2, 4], { tone: 'opp', dashed: false, label: '2\\text{ left}', side: 'left' }),
    pt(gp, 'Q', -2, 4, coord(-2, 4, "P'"), 'above left', 'good'),
  ]);

// Triangle ABC, A(2, 1), B(5, 1), C(2, 3), turned 90° clockwise to A'(1, −2), B'(1, −5), C'(3, −2).
const gc = cart({ x: [-1, 6], y: [-6, 4] });
const ABC: P[] = [
  [2, 1],
  [5, 1],
  [2, 3],
];
const IMG: P[] = ABC.map(([x, y]) => [y, -x]);
const clockwise = (id: string) =>
  figure(id, [
    gc,
    triangle(gc, { id: 't', corners: ABC, names: ['A', 'B', 'C'], places: ['above left', 'above right', 'above left'] }),
    triangle(gc, { id: 'i', corners: IMG, names: ["A'", "B'", "C'"], places: ['left', 'below left', 'right'], tone: 'good' }),
    swing(gc, 'turn', 1.6, 27, -63, 'theta'),
  ]);

// 270° counterclockwise and 90° clockwise end in the same place: a hand pointing right turns to
// point down either way.
const same = (id: string) =>
  figure(
    id,
    [
      dial({
        name: 'd',
        hands: [
          { id: 'from', deg: 0, tone: 'theta' },
          { id: 'to', deg: -90, tone: 'good' },
        ],
        turns: [
          { id: 'ccw', from: 8, to: 262, r: 2.2, tone: 'opp' },
          { id: 'cw', from: -8, to: -82, r: 1.3, tone: 'adj' },
        ],
      }),
    ],
    400,
  );

const video: Explainer = {
  id: 'm7-9-3-c',
  lessonId: 'm7-9-3',
  title: 'Reflections and Rotations, Part 3: Quarter Turns',
  thumbnailTitle: 'Quarter Turns',
  thumbnail: 'qt',
  summary:
    'For a 90° rotation about the origin, picture the path from the origin to the point and turn each move a quarter turn. Counterclockwise, right becomes up and up becomes left, so P(4, 2) goes to P′(−2, 4). Clockwise, right becomes down and up becomes right, so A(2, 1), B(5, 1) and C(2, 3) go to A′(1, −2), B′(1, −5) and C′(3, −2). A 270° turn one way ends where a 90° turn the other way does.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane and Transformations · Part 3', title: 'Quarter Turns', subtitle: 'Rotating 90° about the origin' }],
      lines: [
        { say: 'A door swings open a quarter turn around its hinge. A quarter turn is ninety degrees.', show: 'title' },
        { say: 'In this video, you will turn points and shapes ninety degrees about the origin, clockwise and counterclockwise.' },
      ],
    },
    {
      chapter: 'Turning each move',
      layout: 'center',
      main: [
        { kind: 'text', id: 'k', size: 'md', md: 'Picture the path from the origin to the point. Turn **each move** a quarter turn.' },
        {
          kind: 'table',
          id: 't',
          head: ['From the origin', 'After $90^\\circ$ counterclockwise', 'After $90^\\circ$ clockwise'],
          rows: [
            ['right', 'up', 'down'],
            ['up', 'left', 'right'],
            ['left', 'down', 'up'],
            ['down', 'right', 'left'],
          ],
        },
      ],
      lines: [
        { say: 'For a quarter turn, picture the path from the origin to the point: so many units right or left, then so many units up or down. Then turn each move a quarter turn.', show: 'k' },
        { say: 'Think of a clock hand pointing right, at the three. Turn it a quarter turn counterclockwise, and it points up, at the twelve. Turn it clockwise, and it points down, at the six.', show: 't.0', focus: 't.0' },
        { say: 'A hand pointing up turns counterclockwise to point left, and clockwise to point right.', show: 't.1', focus: 't.1' },
        { say: 'In the same way, left turns counterclockwise to down, and clockwise to up. And down turns counterclockwise to right, and clockwise to left.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'A quarter turn counterclockwise',
      layout: 'split',
      leftWidth: 640,
      left: [quarter('cc')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Rotate $P(4,\\ 2)$ $90^\\circ$ counterclockwise about the origin.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P\\!: \\adj{4 \\text{ right}}, \\ \\opp{2 \\text{ up}}', "P'\\!: \\adj{4 \\text{ up}}, \\ \\opp{2 \\text{ left}}", "P'(-2,\\ 4)"] },
      ],
      lines: [
        { say: 'Rotate the point P, at four, two, ninety degrees counterclockwise about the origin.', show: [...base('cc'), 'cc.P', 'q'] },
        { say: 'To get to P from the origin, go four units right, then two units up.', show: ['cc.r4', 'cc.u2', 'm.0'], focus: ['cc.r4', 'cc.u2', 'm.0'] },
        { say: 'Turn each move a quarter turn counterclockwise. Four right becomes four up. And two up becomes two left.', show: ['cc.turn', 'cc.u4', 'cc.l2', 'm.1'], focus: ['cc.u4', 'cc.l2', 'm.1'] },
        { say: 'So P prime is two units left and four units up. P prime is at negative two, four, in Quadrant two.', show: ['cc.Q', 'm.2'], focus: ['cc.Q', 'm.2'] },
      ],
    },
    {
      chapter: 'A quarter turn clockwise',
      layout: 'split',
      leftWidth: 440,
      left: [clockwise('cl')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Rotate triangle $ABC$ $90^\\circ$ clockwise about the origin.' },
        {
          kind: 'table',
          id: 'm',
          head: ['Vertex', 'Path', 'Turned', 'Image'],
          rows: [
            ['$A(2,\\ 1)$', '[[adj:2 right]], [[opp:1 up]]', '[[adj:2 down]], [[opp:1 right]]', "$A'(1,\\ {-2})$"],
            ['$B(5,\\ 1)$', '[[adj:5 right]], [[opp:1 up]]', '[[adj:5 down]], [[opp:1 right]]', "$B'(1,\\ {-5})$"],
            ['$C(2,\\ 3)$', '[[adj:2 right]], [[opp:3 up]]', '[[adj:2 down]], [[opp:3 right]]', "$C'(3,\\ {-2})$"],
          ],
        },
      ],
      lines: [
        { say: 'Now turn triangle A B C ninety degrees clockwise about the origin. Clockwise, right becomes down, and up becomes right.', show: [...base('cl'), ...shapeIds('cl', 't'), 'cl.turn', 'q'] },
        { say: 'Vertex A is two right and one up. These become two down and one right. So A prime is at one, negative two.', show: ['cl.i-0', 'm.0'], focus: ['cl.i-0', 'm.0'] },
        { say: 'Vertex B is five right and one up. These become five down and one right. So B prime is at one, negative five.', show: ['cl.i-1', 'm.1'], focus: ['cl.i-1', 'm.1'] },
        { say: 'Vertex C is two right and three up. These become two down and three right. So C prime is at three, negative two.', show: ['cl.i-2', 'm.2'], focus: ['cl.i-2', 'm.2'] },
        { say: 'Join the image vertices. The triangle has turned a quarter turn, from Quadrant one down into Quadrant four. It is the same size and shape.', show: ['cl.i', 'cl.i-fill'], focus: 'cl.i' },
      ],
    },
    {
      chapter: 'Two hundred seventy degrees',
      layout: 'split',
      leftWidth: 460,
      left: [same('sm')],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: '270° one way, 90° the other', md: 'A turn of $270^\\circ$ one way ends in the same place as a turn of $90^\\circ$ the other way. So $270^\\circ$ [[opp:counterclockwise]] is the same as $90^\\circ$ [[adj:clockwise]].' }],
      lines: [
        { say: 'What about a turn of two hundred seventy degrees? That is three quarter turns.', show: ['sm.d-face', 'sm.d-from'] },
        { say: 'Start with a hand pointing right. Turn it two hundred seventy degrees counterclockwise: up, then left, then down. It ends pointing down.', show: ['sm.d-ccw', 'sm.d-to'], focus: 'sm.d-ccw' },
        { say: 'Now turn it just ninety degrees clockwise. It also ends pointing down!', show: 'sm.d-cw', focus: 'sm.d-cw' },
        { say: 'So two hundred seventy degrees one way ends in the same place as ninety degrees the other way. Two hundred seventy degrees counterclockwise is the same as ninety degrees clockwise.', show: 'key' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Clockwise or counterclockwise?', md: 'Check the direction before you turn. A quarter turn the wrong way puts the image in the **opposite quadrant** from where it belongs.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(4,\\ 2)\\!: \\ 90^\\circ \\text{ counterclockwise} \\to (-2,\\ 4)', '90^\\circ \\text{ clockwise} \\to (2,\\ {-4})'] },
      ],
      lines: [
        { say: 'Watch out. Always check the direction before you turn.', show: 'oops' },
        { say: 'Turned ninety degrees counterclockwise, P at four, two lands at negative two, four, in Quadrant two.', show: 'm.0', focus: 'm.0' },
        { say: 'Turned ninety degrees clockwise, it lands at two, negative four, in Quadrant four. That is the opposite quadrant. So a turn the wrong way gives a very different answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "Point $Q(3,\\ 1)$ is rotated $90^\\circ$ **clockwise** about the origin. Where is $Q'$?",
          choices: ['$(-1,\\ 3)$', '$(-3,\\ {-1})$', '$(3,\\ {-1})$', '$(1,\\ {-3})$'],
          answer: 3,
          working: '$Q$ is $3$ right and $1$ up. Clockwise, $3$ right becomes $3$ down and $1$ up becomes $1$ right. So $Q\'(1,\\ {-3})$.',
        },
      ],
      lines: [
        { say: 'Your turn. Point Q, at three, one, is rotated ninety degrees clockwise about the origin. Where is Q prime? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is D: one, negative three. Point Q is three right and one up. Clockwise, three right becomes three down, and one up becomes one right. Choice A turns counterclockwise instead.', show: 'q.answer' },
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
            'For a $90^\\circ$ turn, turn each move from the origin a quarter turn.',
            'Counterclockwise: right becomes up, up becomes left. Clockwise: right becomes down, up becomes right.',
            '$270^\\circ$ one way is the same as $90^\\circ$ the other way.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a ninety degree turn, picture the path from the origin, and turn each move a quarter turn.', show: 'sum.0' },
        { say: 'Counterclockwise, right becomes up and up becomes left. Clockwise, right becomes down and up becomes right.', show: 'sum.1' },
        { say: 'And two hundred seventy degrees one way is the same as ninety degrees the other way. In the next part, you will look at a shape and its image, and decide which transformation moved it. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
