import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { move, polygon, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { turnArrow } from './lib/m6-7-figures.ts';
import { cart, triangle } from './lib/m6-8-figures.ts';

type P = [number, number];
const g = cart({ x: [-1, 5], y: [-3, 4] });
const gw = cart({ x: [-1, 5], y: [-5, 4] });

// Triangle ABC, A(1, 1), B(4, 1), C(1, 3), turned 90° clockwise about A: B'(1, −2), C'(3, 1).
const ABC: P[] = [
  [1, 1],
  [4, 1],
  [1, 3],
];
const IMAGE: P[] = [
  [1, 1],
  [1, -2],
  [3, 1],
];
const original = (p = g) => triangle(p, { id: 't', corners: ABC, names: ['A', 'B', 'C'], places: ['above left', 'above right', 'above left'] });
const base = (id: string) => [`${id}.grid`, `${id}.axes`, `${id}.t`, `${id}.t-fill`, `${id}.t-0`, `${id}.t-1`, `${id}.t-2`];

// Turning B: 3 right of A becomes 3 down.
const turnB = (id: string) =>
  figure(id, [
    g,
    original(),
    move(g, 'b', [1, 1], [4, 1], { label: '3\\text{ right}', side: 'right', tone: 'adj', dashed: false }),
    move(g, 'b2', [1, 1], [1, -2], { label: '3\\text{ down}', side: 'left', tone: 'opp' }),
    pt(g, 'B2', 1, -2, "B'", 'below right', 'good'),
  ]);

// Turning C: 2 up from A becomes 2 right.
const turnC = (id: string) =>
  figure(id, [
    g,
    original(),
    move(g, 'c', [1, 1], [1, 3], { label: '2\\text{ up}', side: 'right', tone: 'opp', dashed: false }),
    move(g, 'c2', [1, 1], [3, 1], { label: '2\\text{ right}', side: 'right', tone: 'adj' }),
    pt(g, 'C2', 3, 1, "C'", 'below right', 'good'),
  ]);

// The whole image, and (dashed red) where the triangle would land if turned about the origin.
const whole = (id: string, wrong = false) => {
  const p = wrong ? gw : g;
  return figure(id, [
    p,
    original(p),
    triangle(p, { id: 'i', corners: IMAGE, names: ['', "B'", "C'"], places: ['below', 'below left', 'below right'], tone: 'good' }),
    turnArrow({ id: 'turn', c: [1, 1], r: 1.4, from: 165, to: 105, tone: 'theta' }),
    ...(wrong ? [polygon(p, { id: 'w', corners: [[1, -1], [1, -4], [3, -1]], tone: 'bad', dashed: [true, true, true], shade: 0.08 }), pt(p, 'O', 0, 0, '', 'below left', 'bad')] : []),
  ]);
};
const image = (id: string) => [`${id}.i`, `${id}.i-fill`, `${id}.i-1`, `${id}.i-2`];

const video: Explainer = {
  id: 'm6-8-3-b',
  lessonId: 'm6-8-3',
  title: 'Rotations, Part 2: Quarter Turns',
  thumbnailTitle: 'Quarter Turns',
  thumbnail: 'wh',
  summary:
    'Rotating triangle ABC, with A(1, 1), B(4, 1) and C(1, 3), 90° clockwise about vertex A: from A, B is 3 units right, and clockwise right becomes down, so B′ is (1, −2); C is 2 units up, and up becomes right, so C′ is (3, 1); A stays at (1, 1). Always count from the centre vertex, not from the origin.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane · Part 2', title: 'Quarter Turns', subtitle: 'Turning a triangle 90 degrees about a vertex' }],
      lines: [
        { say: 'In the last part, you learned to turn a direction. Now you will use that to turn a whole triangle.', show: 'title' },
        { say: 'In this video, you will rotate a triangle a quarter turn clockwise about one of its vertices, and find the coordinates of the image.' },
      ],
    },
    {
      chapter: 'The triangle',
      layout: 'split',
      leftWidth: 520,
      left: [figure('tr', [g, original()])],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Triangle $ABC$ has vertices $A(1,\\ 1)$, $B(4,\\ 1)$ and $C(1,\\ 3)$. Rotate it $90^\\circ$ clockwise about $A$. Find $B\'$ and $C\'$.' }],
      lines: [
        { say: 'Triangle A B C has vertices A at one, one, B at four, one, and C at one, three.', show: base('tr') },
        { say: 'Rotate it ninety degrees clockwise about vertex A. Where do B and C go?', show: 'q' },
        { say: 'Vertex A is the centre of rotation, so it does not move. A stays at one, one. We only need to find B prime and C prime.', focus: 'tr.t-0' },
      ],
    },
    {
      chapter: 'Turning B',
      layout: 'split',
      leftWidth: 520,
      left: [turnB('tb')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A \\to B: \\adj{3 \\text{ right}}', '\\text{clockwise: right} \\to \\text{down}', 'A \\to B\': \\opp{3 \\text{ down}}', "B'(1,\\ {-2})"] }],
      lines: [
        { say: 'Start with B. How do you get from A to B? Go three units right.', show: [...base('tb'), 'tb.b', 'm.0'], focus: ['tb.b', 'm.0'] },
        { say: 'Turn that direction clockwise a quarter turn. A clock hand pointing right, at the three, turns to point down, at the six. So right becomes down.', show: 'm.1', focus: 'm.1' },
        { say: 'So B prime is three units down from A. From one, one, go three down, to one, negative two.', show: ['tb.b2', 'tb.B2', 'm.2', 'm.3'], focus: ['tb.b2', 'm.3'] },
      ],
    },
    {
      chapter: 'Turning C',
      layout: 'split',
      leftWidth: 520,
      left: [turnC('tc')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A \\to C: \\opp{2 \\text{ up}}', '\\text{clockwise: up} \\to \\text{right}', 'A \\to C\': \\adj{2 \\text{ right}}', "C'(3,\\ 1)"] }],
      lines: [
        { say: 'Now C. From A, vertex C is two units up.', show: [...base('tc'), 'tc.c', 'm.0'], focus: ['tc.c', 'm.0'] },
        { say: 'Turn up clockwise a quarter turn. A clock hand pointing up, at the twelve, turns to point right, at the three. So up becomes right.', show: 'm.1', focus: 'm.1' },
        { say: 'So C prime is two units right of A. From one, one, go two units to the right, to three, one.', show: ['tc.c2', 'tc.C2', 'm.2', 'm.3'], focus: ['tc.c2', 'm.3'] },
      ],
    },
    {
      chapter: 'The image',
      layout: 'split',
      leftWidth: 520,
      left: [whole('wh')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A(1,\\ 1) \\text{ stays}', "B'(1,\\ {-2})", "C'(3,\\ 1)"] }],
      lines: [
        { say: 'Join A, B prime and C prime to draw the image.', show: [...base('wh'), ...image('wh'), 'm.0', 'm.1', 'm.2'] },
        { say: 'Check it. Side A B was three units long, pointing right. Side A B prime is three units long as well, pointing down. Side A C was two units up, and side A C prime is two units right.', focus: 'wh.i' },
        { say: 'The image is the same size and shape. It has turned a quarter turn clockwise around A, like a door swinging on its hinge.', show: 'wh.turn', focus: 'wh.turn' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 520,
      left: [whole('wr', true)],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Turn about the right point', md: 'The centre of rotation here is a **vertex** of the shape, not the origin. Always count from the centre vertex.' }],
      lines: [
        { say: 'Watch out. The centre of rotation here is vertex A, not the origin.', show: [...base('wr'), ...image('wr'), 'oops'], focus: 'wr.t-0' },
        { say: 'If you turned the triangle about the origin by mistake, it would land somewhere else, like this dashed red triangle.', show: ['wr.w', 'wr.w-fill', 'wr.O'], focus: 'wr.w' },
        { say: 'So always count from the centre vertex. Describe how to get from the centre to each vertex, then turn each direction.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "$A(2,\\ 1)$ and $B(2,\\ 4)$ are vertices of a shape. The shape turns $90^\\circ$ clockwise about $A$. Where is $B'$?",
          choices: ['$(5,\\ 1)$', '$(-1,\\ 1)$', '$(2,\\ {-2})$', '$(4,\\ 2)$'],
          answer: 0,
          working: 'From $A$, $B$ is $3$ units up. Clockwise, up becomes right, so $B\'$ is $3$ units right of $A$: $(5,\\ 1)$.',
        },
      ],
      lines: [
        { say: 'Your turn. A, at two, one, and B, at two, four, are vertices of a shape. The shape turns ninety degrees clockwise about A. Where is B prime? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, five, one. From A, point B is three units up. A quarter turn clockwise turns up into right, so B prime is three units to the right of A. Choice B turns counterclockwise instead.', show: 'q.answer' },
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
          items: ['The centre vertex does not move.', 'From the centre, describe how to get to each vertex, then turn each direction.', '$90^\\circ$ clockwise: right $\\to$ down, down $\\to$ left, left $\\to$ up, up $\\to$ right.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a rotation about a vertex, that vertex does not move.', show: 'sum.0' },
        { say: 'From the centre, describe how to get to each vertex, and then turn each direction. The distances stay the same.', show: 'sum.1' },
        { say: 'For ninety degrees clockwise, right becomes down, down becomes left, left becomes up, and up becomes right. In the next part, you will make half turns. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
