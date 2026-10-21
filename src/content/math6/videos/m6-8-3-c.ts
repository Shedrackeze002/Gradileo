import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { move, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { cart, dial, triangle } from './lib/m6-8-figures.ts';

type P = [number, number];
const g = cart({ x: [-4, 4], y: [-3, 5] });

// Triangle ABC, A(0, 1), B(3, 2), C(1, 4), given a half turn about A: B'(−3, 0), C'(−1, −2).
const ABC: P[] = [
  [0, 1],
  [3, 2],
  [1, 4],
];
const IMAGE: P[] = [
  [0, 1],
  [-3, 0],
  [-1, -2],
];
const original = () => triangle(g, { id: 't', corners: ABC, names: ['A', 'B', 'C'], places: ['below right', 'right', 'above right'] });
const base = (id: string) => [`${id}.grid`, `${id}.axes`, `${id}.t`, `${id}.t-fill`, `${id}.t-0`, `${id}.t-1`, `${id}.t-2`];

// A half turn reverses a direction, whichever way it turns.
const reverse = (id: string) =>
  dial({
    name: id,
    hands: [
      { id: 'from', deg: 0, tone: 'theta' },
      { id: 'to', deg: 180, tone: 'good' },
    ],
    turns: [
      { id: 'cw', from: -5, to: -175, tone: 'adj' },
      { id: 'ccw', from: 5, to: 175, tone: 'opp' },
    ],
  });

// B: 3 right and 1 up from A; B': 3 left and 1 down.
const turnB = (id: string) =>
  figure(id, [
    g,
    original(),
    move(g, 'bx', [0, 1], [3, 1], { label: '3', side: 'right', tone: 'adj' }),
    move(g, 'by', [3, 1], [3, 2], { label: '1', side: 'right', tone: 'opp' }),
    move(g, 'bx2', [0, 1], [-3, 1], { label: '3', side: 'right', tone: 'adj' }),
    move(g, 'by2', [-3, 1], [-3, 0], { label: '1', side: 'left', tone: 'opp' }),
    pt(g, 'B2', -3, 0, "B'", 'above left', 'good'),
  ]);

// C: 1 right and 3 up from A; C': 1 left and 3 down.
const turnC = (id: string) =>
  figure(id, [
    g,
    original(),
    move(g, 'cx', [0, 1], [1, 1], { tone: 'adj' }),
    move(g, 'cy', [1, 1], [1, 4], { label: '3', side: 'right', tone: 'opp' }),
    move(g, 'cx2', [0, 1], [-1, 1], { tone: 'adj' }),
    move(g, 'cy2', [-1, 1], [-1, -2], { tone: 'opp' }),
    pt(g, 'C2', -1, -2, "C'", 'below left', 'good'),
  ]);

const whole = (id: string) =>
  figure(id, [g, original(), triangle(g, { id: 'i', corners: IMAGE, names: ['', "B'", "C'"], places: ['below', 'above left', 'below left'], tone: 'good' })]);

const video: Explainer = {
  id: 'm6-8-3-c',
  lessonId: 'm6-8-3',
  title: 'Rotations, Part 3: Half Turns',
  thumbnailTitle: 'Half Turns',
  thumbnail: 'wh',
  summary:
    'A half turn (180°) points every direction the opposite way, and clockwise and counterclockwise give the same result. Rotating triangle ABC with A(0, 1), B(3, 2) and C(1, 4) by 180° about A: B is 3 right and 1 up from A, so B′ is 3 left and 1 down, at (−3, 0); C is 1 right and 3 up, so C′ is 1 left and 3 down, at (−1, −2).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane · Part 3', title: 'Half Turns', subtitle: 'Every direction reverses' }],
      lines: [
        { say: 'Turn around to face the other way, and you have made a half turn. Everything in front of you is now behind you.', show: 'title' },
        { say: 'In this video, you will give a triangle a half turn about one of its vertices, and find the coordinates of the image.' },
      ],
    },
    {
      chapter: 'A half turn',
      layout: 'split',
      leftWidth: 460,
      left: [figure('ht', [reverse('d')], 400)],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Half turn', md: 'A half turn ($180^\\circ$) points every direction the **opposite** way. Clockwise and counterclockwise give the same result.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{right} \\leftrightarrow \\text{left}', '\\text{up} \\leftrightarrow \\text{down}'] },
      ],
      lines: [
        { say: 'A half turn is one hundred eighty degrees. It points every direction the opposite way.', show: ['ht.d-face', 'ht.d-from', 'key'] },
        { say: 'A clock hand pointing right, at the three, turns halfway round to point left, at the nine.', show: 'ht.d-to', focus: 'ht.d-to' },
        { say: 'It does not matter which way you turn. Clockwise, the hand goes down through the six. Counterclockwise, it goes up through the twelve. Either way, it ends up pointing left.', show: ['ht.d-cw', 'ht.d-ccw'] },
        { say: 'So after a half turn, right becomes left, and left becomes right. Up becomes down, and down becomes up.', show: 'm', focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Turning B',
      layout: 'split',
      leftWidth: 540,
      left: [turnB('tb')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Rotate triangle $ABC$ with $A(0,\\ 1)$, $B(3,\\ 2)$ and $C(1,\\ 4)$ by $180^\\circ$ about $A$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A \\to B: \\adj{3 \\text{ right}}, \\opp{1 \\text{ up}}', "A \\to B': \\adj{3 \\text{ left}}, \\opp{1 \\text{ down}}", "B'(-3,\\ 0)"] },
      ],
      lines: [
        { say: 'Here is triangle A B C, with A at zero, one, B at three, two, and C at one, four. Rotate it one hundred eighty degrees about A.', show: [...base('tb'), 'q'] },
        { say: 'From A, how do you get to B? Go three units right, and then one unit up.', show: ['tb.bx', 'tb.by', 'm.0'], focus: ['tb.bx', 'tb.by', 'm.0'] },
        { say: 'A half turn reverses both directions. Right becomes left, and up becomes down. So from A, go three units left, and one unit down.', show: ['tb.bx2', 'tb.by2', 'm.1'], focus: ['tb.bx2', 'tb.by2', 'm.1'] },
        { say: 'From zero, one, three left and one down is negative three, zero. So B prime is at negative three, zero.', show: ['tb.B2', 'm.2'], focus: ['tb.B2', 'm.2'] },
      ],
    },
    {
      chapter: 'Turning C',
      layout: 'split',
      leftWidth: 540,
      left: [turnC('tc')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A \\to C: \\adj{1 \\text{ right}}, \\opp{3 \\text{ up}}', "A \\to C': \\adj{1 \\text{ left}}, \\opp{3 \\text{ down}}", "C'(-1,\\ {-2})"] }],
      lines: [
        { say: 'Now C. From A, vertex C is one unit right, and three units up.', show: [...base('tc'), 'tc.cx', 'tc.cy', 'm.0'], focus: ['tc.cx', 'tc.cy', 'm.0'] },
        { say: 'Reverse both directions: one unit left, and three units down.', show: ['tc.cx2', 'tc.cy2', 'm.1'], focus: ['tc.cx2', 'tc.cy2', 'm.1'] },
        { say: 'From zero, one, one left and three down is negative one, negative two. So C prime is at negative one, negative two.', show: ['tc.C2', 'm.2'], focus: ['tc.C2', 'm.2'] },
      ],
    },
    {
      chapter: 'The image',
      layout: 'split',
      leftWidth: 540,
      left: [whole('wh')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A(0,\\ 1) \\text{ stays}', "B'(-3,\\ 0)", "C'(-1,\\ {-2})"] }],
      lines: [
        { say: 'Join A, B prime and C prime. Vertex A stays where it was, at zero, one.', show: [...base('wh'), 'wh.i', 'wh.i-fill', 'wh.i-1', 'wh.i-2', 'm.0', 'm.1', 'm.2'] },
        { say: 'The image is upside down, and it points the opposite way. Every vertex is the same distance from A as before, but on the opposite side.', focus: 'wh.i' },
        { say: 'Notice that you did not need to choose clockwise or counterclockwise. A half turn lands in the same place either way.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "A shape has a vertex at $A(1,\\ 1)$ and another at $B(4,\\ 3)$. It is rotated $180^\\circ$ about $A$. Where is $B'$?",
          choices: ['$(-4,\\ {-3})$', '$(-2,\\ 3)$', '$(4,\\ {-1})$', '$(-2,\\ {-1})$'],
          answer: 3,
          working: 'From $A$, $B$ is $3$ units right and $2$ units up. A half turn reverses both: $3$ units left and $2$ units down from $A$, so $B\'(-2,\\ {-1})$.',
        },
      ],
      lines: [
        { say: 'Your turn. A shape has a vertex at A, one, one, and another at B, four, three. It is rotated one hundred eighty degrees about A. Where is B prime? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, negative two, negative one. From A, point B is three units right and two units up. A half turn reverses both: three units left and two units down from A. Choice A turns about the origin, not about A.', show: 'q.answer' },
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
          items: ['A half turn ($180^\\circ$) points every direction the opposite way.', 'Clockwise and counterclockwise give the same result.', 'From the centre, reverse each direction: right $\\leftrightarrow$ left, up $\\leftrightarrow$ down.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A half turn, one hundred eighty degrees, points every direction the opposite way.', show: 'sum.0' },
        { say: 'Clockwise and counterclockwise give the same result.', show: 'sum.1' },
        { say: 'From the centre, reverse each direction: right and left swap, and up and down swap. In the next part, you will make three quarter turns, and describe a rotation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
