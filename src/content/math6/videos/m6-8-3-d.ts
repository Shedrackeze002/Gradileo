import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { move, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';
import { turnArrow } from './lib/m6-7-figures.ts';
import { cart, dial, triangle } from './lib/m6-8-figures.ts';

type P = [number, number];
const g = cart({ x: [-4, 3], y: [-1, 4] });

// Triangle ABC, A(−1, 0), B(2, 0), C(2, 2), turned 270° clockwise about A: B'(−1, 3), C'(−3, 3).
const ABC: P[] = [
  [-1, 0],
  [2, 0],
  [2, 2],
];
const IMAGE: P[] = [
  [-1, 0],
  [-1, 3],
  [-3, 3],
];
const original = () => triangle(g, { id: 't', corners: ABC, names: ['A', 'B', 'C'], places: ['above left', 'above right', 'above right'] });
const base = (id: string) => [`${id}.grid`, `${id}.axes`, `${id}.t`, `${id}.t-fill`, `${id}.t-0`, `${id}.t-1`, `${id}.t-2`];

// A hand pointing right (at the 3) ends pointing up (at the 12) after 270° clockwise or 90°
// counterclockwise.
const same = (id: string) =>
  dial({
    name: id,
    hands: [
      { id: 'from', deg: 0, tone: 'theta' },
      { id: 'to', deg: 90, tone: 'good' },
    ],
    turns: [
      { id: 'cw', from: -5, to: -265, r: 1.9, tone: 'adj' },
      { id: 'ccw', from: 8, to: 82, r: 1.2, tone: 'opp' },
    ],
  });

// B: 3 right of A becomes 3 up. C: 3 right and 2 up becomes 3 up and 2 left.
const turnB = (id: string) =>
  figure(id, [
    g,
    original(),
    move(g, 'b', [-1, 0], [2, 0], { label: '3', side: 'left', tone: 'adj', dashed: false }),
    move(g, 'b2', [-1, 0], [-1, 3], { label: '3\\text{ up}', side: 'left', tone: 'opp' }),
    pt(g, 'B2', -1, 3, "B'", 'above right', 'good'),
  ]);
const turnC = (id: string) =>
  figure(id, [
    g,
    original(),
    move(g, 'cx', [-1, 0], [2, 0], { label: '3', side: 'left', tone: 'adj', dashed: false }),
    move(g, 'cy', [2, 0], [2, 2], { label: '2', side: 'right', tone: 'opp', dashed: false }),
    move(g, 'cx2', [-1, 0], [-1, 3], { label: '3\\text{ up}', side: 'left', tone: 'opp' }),
    move(g, 'cy2', [-1, 3], [-3, 3], { label: '2\\text{ left}', side: 'right', tone: 'adj' }),
    pt(g, 'C2', -3, 3, "C'", 'above left', 'good'),
  ]);
const whole = (id: string) =>
  figure(id, [
    g,
    original(),
    triangle(g, { id: 'i', corners: IMAGE, names: ['', "B'", "C'"], places: ['below', 'above right', 'above left'], tone: 'good' }),
    turnArrow({ id: 'turn', c: [-1, 0], r: 1.3, from: 10, to: 80, tone: 'theta' }),
  ]);

const video: Explainer = {
  id: 'm6-8-3-d',
  lessonId: 'm6-8-3',
  title: 'Rotations, Part 4: Three Quarter Turns',
  thumbnailTitle: 'Three Quarter Turns',
  thumbnail: 'wh',
  summary:
    'Three quarter turns one way end in the same place as one quarter turn the other way, so 270° clockwise is the same as 90° counterclockwise. Rotating triangle ABC with A(−1, 0), B(2, 0) and C(2, 2) by 270° clockwise about A: right becomes up and up becomes left, so B′ is (−1, 3) and C′ is (−3, 3). To describe a rotation, compare a side from the centre with its image: right to up is a quarter turn counterclockwise, or 270° clockwise.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane · Part 4', title: 'Three Quarter Turns', subtitle: 'And describing a rotation' }],
      lines: [
        { say: 'You can now make quarter turns and half turns. What about three quarters of a turn?', show: 'title' },
        { say: 'In this video, you will find a shortcut for two hundred seventy degree turns, and learn how to describe a rotation you see.' },
      ],
    },
    {
      chapter: 'A shortcut',
      layout: 'split',
      leftWidth: 460,
      left: [figure('sc', [same('d')], 400)],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Three quarter turns', md: '$270^\\circ$ one way ends in the same place as $90^\\circ$ the other way. So $270^\\circ$ clockwise is the same as $90^\\circ$ counterclockwise.' }],
      lines: [
        { say: 'Start with a clock hand pointing right, at the three.', show: ['sc.d-face', 'sc.d-from'] },
        { say: 'Turn it clockwise three quarter turns, two hundred seventy degrees. It goes to the six, then the nine, and then the twelve. It ends up pointing up.', show: ['sc.d-cw', 'sc.d-to'], focus: 'sc.d-cw' },
        { say: 'Now go back to the three, and turn it just one quarter turn counterclockwise. It goes straight to the twelve. It points up again!', show: 'sc.d-ccw', focus: 'sc.d-ccw' },
        { say: 'So three quarter turns one way end in the same place as one quarter turn the other way. Two hundred seventy degrees clockwise is the same as ninety degrees counterclockwise.', show: 'key' },
      ],
    },
    {
      chapter: 'Turning B',
      layout: 'split',
      leftWidth: 540,
      left: [turnB('tb')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Rotate triangle $ABC$ with $A(-1,\\ 0)$, $B(2,\\ 0)$ and $C(2,\\ 2)$ by $270^\\circ$ clockwise about $A$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['270^\\circ \\text{ clockwise}', '= 90^\\circ \\text{ counterclockwise}', '\\text{right} \\to \\text{up}', '\\text{up} \\to \\text{left}', "B'(-1,\\ 3)"] },
      ],
      lines: [
        { say: 'Here is triangle A B C, with C at two, two, A at negative one, zero, and B at two, zero. Rotate it two hundred seventy degrees clockwise about A.', show: [...base('tb'), 'q'] },
        { say: 'Use the shortcut. Two hundred seventy degrees clockwise is the same as ninety degrees counterclockwise. Counterclockwise, right becomes up, and up becomes left.', show: ['m.0', 'm.1', 'm.2', 'm.3'], focus: ['m.0', 'm.1', 'm.2', 'm.3'] },
        { say: 'From A, vertex B is three units right. Right becomes up, so B prime is three units up from A.', show: ['tb.b', 'tb.b2'], focus: ['tb.b', 'tb.b2'] },
        { say: 'From negative one, zero, three units up is negative one, three. So B prime is at negative one, three.', show: ['tb.B2', 'm.4'], focus: ['tb.B2', 'm.4'] },
      ],
    },
    {
      chapter: 'Turning C',
      layout: 'split',
      leftWidth: 540,
      left: [turnC('tc')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A \\to C: \\adj{3 \\text{ right}}, \\opp{2 \\text{ up}}', "A \\to C': \\opp{3 \\text{ up}}, \\adj{2 \\text{ left}}", "C'(-3,\\ 3)"] }],
      lines: [
        { say: 'Now C. From A, vertex C is three units right, and two units up.', show: [...base('tc'), 'tc.cx', 'tc.cy', 'm.0'], focus: ['tc.cx', 'tc.cy', 'm.0'] },
        { say: 'Turn each direction. Right becomes up, so three units right becomes three units up. Up becomes left, so two units up becomes two units left.', show: ['tc.cx2', 'tc.cy2', 'm.1'], focus: ['tc.cx2', 'tc.cy2', 'm.1'] },
        { say: 'From negative one, zero, go three up and two left. That is negative three, three. So C prime is at negative three, three.', show: ['tc.C2', 'm.2'], focus: ['tc.C2', 'm.2'] },
      ],
    },
    {
      chapter: 'Describing a rotation',
      layout: 'split',
      leftWidth: 540,
      left: [whole('wh')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AB: \\text{ right}', "AB': \\text{ up}", '90^\\circ \\text{ counterclockwise}', '\\text{or } 270^\\circ \\text{ clockwise}'] }],
      lines: [
        { say: 'Here are the triangle and its image. Now imagine you only saw the picture. How could you describe the rotation?', show: [...base('wh'), 'wh.i', 'wh.i-fill', 'wh.i-1', 'wh.i-2'] },
        { say: 'Look at one side that starts at the centre, and its image. Side A B points right.', show: 'm.0', focus: ['wh.t-s0', 'm.0'] },
        { say: 'Its image, side A B prime, points up.', show: 'm.1', focus: ['wh.i-s0', 'm.1'] },
        { say: 'Right to up is a quarter turn counterclockwise, like a clock hand going back from the three to the twelve. So the rotation is ninety degrees counterclockwise about A, or two hundred seventy degrees clockwise. Both describe the same rotation.', show: ['wh.turn', 'm.2', 'm.3'], focus: ['wh.turn', 'm.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "Side $AB$ points **down** from the centre $A$. After a rotation about $A$, side $AB'$ points **left**. Which describes the rotation?",
          choices: ['$90^\\circ$ counterclockwise', '$90^\\circ$ clockwise', '$180^\\circ$', '$270^\\circ$ clockwise'],
          answer: 1,
          working: 'A clock hand pointing down (at 6) turns clockwise a quarter turn to point left (at 9). So the rotation is $90^\\circ$ clockwise.',
        },
      ],
      lines: [
        { say: 'Your turn. Side A B points down from the centre A. After a rotation about A, side A B prime points left. Which describes the rotation? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is B, ninety degrees clockwise. A clock hand pointing down, at the six, turns clockwise a quarter turn to point left, at the nine. Choice D, two hundred seventy degrees clockwise, is the same as a quarter turn counterclockwise, which would point right.',
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
          items: ['$270^\\circ$ one way is the same as $90^\\circ$ the other way.', 'To rotate a vertex, describe how to get to it from the centre, then turn each direction.', 'To describe a rotation, compare a side from the centre with its image.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two hundred seventy degrees one way is the same as ninety degrees the other way.', show: 'sum.0' },
        { say: 'To rotate a vertex, describe how to get to it from the centre, and then turn each direction.', show: 'sum.1' },
        { say: 'And to describe a rotation, compare a side that starts at the centre with its image. Well done: you can now rotate shapes in the Cartesian plane!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
