import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { move, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { turnArrow } from './lib/m6-7-figures.ts';
import { cart, dial, triangle } from './lib/m6-8-figures.ts';

type P = [number, number];

// Triangle ABC turned a quarter turn clockwise about its vertex A: a preview of the next part.
const g = cart({ x: [-1, 5], y: [-3, 4] });
const ABC: P[] = [
  [1, 1],
  [4, 1],
  [1, 3],
];
const TURNED: P[] = [
  [1, 1],
  [1, -2],
  [3, 1],
];
const preview = (id: string) =>
  figure(id, [
    g,
    triangle(g, { id: 't', corners: ABC, names: ['A', 'B', 'C'], places: ['above left', 'above right', 'above left'] }),
    triangle(g, { id: 'i', corners: TURNED, names: ['', "B'", "C'"], places: ['below', 'below right', 'right'], tone: 'good' }),
    turnArrow({ id: 'turn', c: g.map(1, 1), r: 1.2, from: 180, to: 100, tone: 'theta' }),
  ]);

// Clockwise and counterclockwise from a hand pointing up (at the 12).
const directions = (id: string) =>
  dial({
    name: id,
    hands: [{ id: 'up', deg: 90 }],
    turns: [
      { id: 'cw', from: 85, to: 5, tone: 'adj' },
      { id: 'ccw', from: 95, to: 175, tone: 'opp' },
    ],
  });

// A hand pointing left (at the 9) turned a quarter turn clockwise points up (at the 12).
const leftToUp = (id: string) =>
  dial({
    name: id,
    hands: [
      { id: 'from', deg: 180, tone: 'theta' },
      { id: 'to', deg: 90, tone: 'good' },
    ],
    turns: [{ id: 'cw', from: 175, to: 95, tone: 'adj' }],
  });

// From A(1, 1), B is 2 units left; after a quarter turn clockwise, B' is 2 units up.
const small = cart({ x: [-2, 4], y: [-1, 4] });
const oneDirection = (id: string) =>
  figure(id, [
    small,
    pt(small, 'A', 1, 1, 'A', 'below right', 'brand'),
    move(small, 'ab', [1, 1], [-1, 1], { label: '2\\text{ left}', side: 'left', tone: 'adj' }),
    pt(small, 'B', -1, 1, 'B', 'above left', 'brand'),
    move(small, 'ab2', [1, 1], [1, 3], { label: '2\\text{ up}', side: 'right', tone: 'opp' }),
    pt(small, 'B2', 1, 3, "B'", 'above right', 'good'),
    turnArrow({ id: 'turn', c: [1, 1], r: 1.2, from: 175, to: 95, tone: 'theta' }),
  ]);

const video: Explainer = {
  id: 'm6-8-3',
  lessonId: 'm6-8-3',
  title: 'Rotations, Part 1: Turning About a Vertex',
  thumbnailTitle: 'Turning About a Vertex',
  thumbnail: 'pv',
  summary:
    'A rotation turns a shape around a centre of rotation; here the centre is one of the shape’s vertices, which does not move. Clockwise is the way a clock’s hands move, counterclockwise the other way, and a quarter turn is 90°, a half turn 180° and three quarter turns 270°. To rotate a vertex, describe how to get to it from the centre and turn each direction: left, turned 90° clockwise, becomes up.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane · Part 1', title: 'Turning About a Vertex', subtitle: 'Rotations in the Cartesian plane' }],
      lines: [
        { say: 'A door swings open around its hinge. A windmill blade turns around its centre.', show: 'title' },
        { say: 'In this video, you will learn how to turn a direction, which is the key to rotating shapes in the Cartesian plane.' },
      ],
    },
    {
      chapter: 'Turning about a vertex',
      layout: 'split',
      leftWidth: 560,
      left: [preview('pv')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Rotation',
          md: 'A **rotation** turns a shape around a point called the **centre of rotation**. In this lesson, the centre is always one of the shape’s vertices, so that vertex does not move.',
        },
      ],
      lines: [
        { say: 'A rotation turns a shape around a point called the centre of rotation.', show: 'def' },
        { say: 'In this lesson, the centre is always one of the shape’s own vertices. Here, triangle A B C turns around its vertex A.', show: ['pv.grid', 'pv.axes', 'pv.t', 'pv.t-fill', 'pv.t-0', 'pv.t-1', 'pv.t-2'], focus: 'pv.t-0' },
        { say: 'Vertex A is like the hinge of a door. It does not move. Everything else swings around it.', show: ['pv.turn', 'pv.i', 'pv.i-fill', 'pv.i-1', 'pv.i-2'], focus: 'pv.turn' },
      ],
    },
    {
      chapter: 'Clockwise and counterclockwise',
      layout: 'split',
      leftWidth: 460,
      left: [figure('cw', [directions('d')], 400)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Clockwise and counterclockwise', md: '[[adj:Clockwise]] is the direction the hands of a clock move. [[opp:Counterclockwise]] is the opposite direction.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{quarter turn} = 90^\\circ', '\\text{half turn} = 180^\\circ', '\\text{three quarter turns} = 270^\\circ'] },
      ],
      lines: [
        { say: 'Clockwise is the direction the hands of a clock move. From the twelve, a clock hand moves toward the three.', show: ['cw.d-face', 'cw.d-up', 'cw.d-cw', 'def'], focus: 'cw.d-cw' },
        { say: 'Counterclockwise is the opposite direction. From the twelve, it moves toward the nine. Counterclockwise is also called anticlockwise.', show: 'cw.d-ccw', focus: 'cw.d-ccw' },
        { say: 'A quarter turn is ninety degrees, like a hand moving from the twelve to the three.', show: 'm.0', focus: 'm.0' },
        { say: 'A half turn is one hundred eighty degrees, from the twelve to the six. And three quarter turns are two hundred seventy degrees, from the twelve all the way round to the nine.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Turning a direction',
      layout: 'center',
      main: [
        { kind: 'text', id: 'k', size: 'md', md: 'Right is the 3, down is the 6, left is the 9, and up is the 12.' },
        {
          kind: 'table',
          id: 't',
          head: ['From the centre', 'After $90^\\circ$ clockwise', 'After $90^\\circ$ counterclockwise', 'After $180^\\circ$'],
          rows: [
            ['right', 'down', 'up', 'left'],
            ['down', 'left', 'right', 'up'],
            ['left', 'up', 'down', 'right'],
            ['up', 'right', 'left', 'down'],
          ],
        },
      ],
      lines: [
        { say: 'To rotate a vertex, describe how to get to it from the centre: right, left, up or down. Then turn each direction.', show: 'k' },
        { say: 'Think of a clock hand. Pointing right is the three. Pointing down is the six. Pointing left is the nine. And pointing up is the twelve.' },
        { say: 'A hand pointing right, at the three, turns clockwise a quarter turn to point down, at the six. Counterclockwise, it points up. And after a half turn, it points left.', show: 't.0', focus: 't.0' },
        { say: 'Down turns clockwise to left, counterclockwise to right, and a half turn makes it up.', show: 't.1', focus: 't.1' },
        { say: 'Left turns clockwise to up, counterclockwise to down, and a half turn makes it right. And up turns clockwise to right, counterclockwise to left, and a half turn makes it down.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Turning one direction',
      layout: 'split',
      leftWidth: 420,
      left: [figure('lu', [leftToUp('d')], 380)],
      right: [oneDirection('one')],
      lines: [
        { say: 'Here is an example. From vertex A, vertex B is two units to the left. After a ninety degree turn clockwise about A, where is B prime?', show: ['one.grid', 'one.axes', 'one.A', 'one.B', 'one.ab'] },
        { say: 'Picture a clock hand pointing left, at the nine.', show: ['lu.d-face', 'lu.d-from'], focus: 'lu.d-from' },
        { say: 'Turn it clockwise a quarter turn. It now points up, at the twelve.', show: ['lu.d-cw', 'lu.d-to'], focus: 'lu.d-to' },
        { say: 'So left becomes up. B prime is two units up from A. The distance stays the same: two units.', show: ['one.turn', 'one.ab2', 'one.B2'], focus: ['one.ab2', 'one.B2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "From vertex $A$, vertex $B$ is $3$ units **down**. After a $90^\\circ$ counterclockwise turn about $A$, where is $B'$?",
          choices: ['$3$ units left of $A$', '$3$ units up from $A$', '$3$ units right of $A$', '$3$ units down from $A$'],
          answer: 2,
          working: 'A clock hand pointing down (at 6) turns counterclockwise a quarter turn to point right (at 3). So $B\'$ is $3$ units right of $A$.',
        },
      ],
      lines: [
        { say: 'Your turn. From vertex A, vertex B is three units down. After a ninety degree counterclockwise turn about A, where is B prime? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: three units to the right of A. A clock hand pointing down, at the six, turns counterclockwise a quarter turn to point right, at the three. Choice A turns clockwise instead.', show: 'q.answer' },
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
          items: ['A rotation turns a shape about a centre of rotation. Here the centre is a vertex, which does not move.', 'Clockwise is the way a clock’s hands move. A quarter turn is $90^\\circ$.', 'To rotate a vertex, describe how to get to it from the centre, then turn each direction.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rotation turns a shape about a centre of rotation. Here, the centre is a vertex, and it does not move.', show: 'sum.0' },
        { say: 'Clockwise is the way a clock’s hands move, and counterclockwise is the other way. A quarter turn is ninety degrees.', show: 'sum.1' },
        { say: 'To rotate a vertex, describe how to get to it from the centre, and then turn each direction. In the next part, you will turn a whole triangle a quarter turn. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
