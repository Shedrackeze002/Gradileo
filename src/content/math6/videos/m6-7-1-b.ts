import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrowSign, join, mark, shape, turns } from '@/content/math5/videos/lib/m5-8-figures.ts';
import { paper, span, tag, turnArrow, type P } from './lib/m6-7-figures.ts';

// The two directions of turning about a dot.
const directions = (id: string) =>
  figure(
    id,
    [
      join(
        mark({ id: 'c', at: [0, 0] }),
        turnArrow({ id: 'cw', c: [0, 0], r: 1.6, from: 150, to: 30, tone: 'adj' }),
        tag({ id: 'cw-name', at: [0, 1.75], tex: '\\text{clockwise}', place: 'above', tone: 'adj' }),
        turnArrow({ id: 'ccw', c: [0, 0], r: 1.6, from: 210, to: 330, tone: 'opp' }),
        tag({ id: 'ccw-name', at: [0, -1.75], tex: '\\text{counterclockwise}', place: 'below', tone: 'opp' }),
      ),
    ],
    360,
  );

// The arrow sign turned a quarter turn and a half turn clockwise (negative angles turn clockwise).
const quarterHalf = (id: string) =>
  figure(
    id,
    [
      turns({
        pieces: [arrowSign()],
        marker: [1, 0],
        angles: [0, -90, -180],
        gap: 3.4,
        labels: ['\\text{start}', '90^\\circ\\ \\text{clockwise}', '180^\\circ'],
        tones: ['ink', 'adj', 'adj'],
      }),
    ],
    300,
  );

// The lesson's pair: shape 2 is shape 1 turned a quarter turn clockwise about P(4, 1).
const S1: P[] = [
  [1, 1],
  [4, 1],
  [1, 3],
];
const S2: P[] = [
  [4, 4],
  [4, 1],
  [6, 4],
];
const pair = (id: string) =>
  figure(
    id,
    [
      join(
        paper({ x: [0, 7], y: [0, 5] }),
        shape({ id: 's1', pieces: [S1], tone: 'adj', shade: 0.3 }),
        tag({ id: 'n1', at: [1.7, 1.6], tex: '1' }),
        shape({ id: 's2', pieces: [S2], tone: 'opp', shade: 0.3 }),
        tag({ id: 'n2', at: [4.7, 3.3], tex: '2' }),
        span({ id: 'left', a: [4, 1], b: [1, 1], tone: 'theta', label: '3', side: 'left' }),
        span({ id: 'up', a: [4, 1], b: [4, 4], tone: 'theta', label: '3', side: 'left' }),
        turnArrow({ id: 'turn', c: [4, 1], r: 2.2, from: 180, to: 90, tone: 'good' }),
        mark({ id: 'P', at: [4, 1], tex: 'P', place: 'below right' }),
      ),
    ],
    420,
  );

const video: Explainer = {
  id: 'm6-7-1-b',
  lessonId: 'm6-7-1',
  title: 'Symmetry Between Shapes, Part 2: Rotations',
  thumbnailTitle: 'Rotations',
  thumbnail: 'pr',
  summary:
    'A rotation turns a shape about a point, the centre of rotation, clockwise or counterclockwise: a quarter turn is 90° and a half turn is 180°. Two shapes related by one rotation have rotation symmetry; the image is turned but not flipped. Describing a rotation by following a line from the centre to a corner: left becomes up, so it is a quarter turn clockwise. Checking with tracing paper.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry and Congruence · Part 2', title: 'Rotations', subtitle: 'Turning a shape about a point' }],
      lines: [
        { say: 'Think of the hands of a clock, or a spinning wheel. They do not flip, and they do not slide. They turn.', show: 'title' },
        { say: 'In this video, you will learn how two shapes can be related by a turn, called a rotation.' },
      ],
    },
    {
      chapter: 'Rotation',
      layout: 'split',
      leftWidth: 480,
      left: [directions('dn')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Rotation',
          md: 'A **rotation** turns a shape about a point, called the **centre of rotation**. A turn can be **clockwise**, the way the hands of a clock move, or **counterclockwise**, the other way.',
        },
      ],
      lines: [
        { say: 'A rotation turns a shape about a point. The point stays still, and everything else turns around it. The point is called the centre of rotation.', show: ['def', 'dn.c'] },
        { say: 'A turn can go two ways. Clockwise is the way the hands of a clock move: over the top, from left to right.', show: ['dn.cw', 'dn.cw-name'], focus: 'dn.cw' },
        { say: 'Counterclockwise is the other way. Counterclockwise is also called anticlockwise.', show: ['dn.ccw', 'dn.ccw-name'], focus: 'dn.ccw' },
      ],
    },
    {
      chapter: 'Quarter and half turns',
      layout: 'center',
      main: [quarterHalf('qh'), { kind: 'math', id: 'm', size: 'md', lines: ['\\text{quarter turn} = 90^\\circ \\qquad \\text{half turn} = 180^\\circ'] }],
      lines: [
        { say: 'Here is an arrow that turns about the dot in its middle. The dashed outline shows where it started. The yellow dot shows how far it has turned.', show: 'qh.c0' },
        { say: 'A quarter turn is ninety degrees. After a quarter turn clockwise, the arrow that pointed right now points down.', show: ['qh.c1', 'm.0'], focus: 'qh.c1' },
        { say: 'A half turn is one hundred eighty degrees. After a half turn, the arrow points the opposite way, to the left. A half turn ends in the same place, clockwise or counterclockwise.', show: 'qh.c2', focus: 'qh.c2' },
      ],
    },
    {
      chapter: 'Rotation symmetry',
      layout: 'split',
      leftWidth: 520,
      left: [pair('pr')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rotation symmetry', md: 'Two shapes have **rotation symmetry** when one rotation maps one shape exactly onto the other. The image is turned, but **not** flipped.' },
      ],
      lines: [
        { say: 'Here are two triangles. Shape two is a rotation of shape one about point P.', show: ['pr.paper', 'pr.s1', 'pr.n1', 'pr.s2', 'pr.n2', 'pr.P'] },
        { say: 'Two shapes have rotation symmetry when one rotation maps one shape exactly onto the other.', show: 'def' },
        { say: 'The image is turned, but it is not flipped. Think of a card on a table. You can spin it around, but the same side stays facing up.' },
      ],
    },
    {
      chapter: 'Describing a rotation',
      layout: 'split',
      leftWidth: 520,
      left: [pair('dr')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P \\to \\text{corner of } 1: \\text{ left}', 'P \\to \\text{corner of } 2: \\text{ up}', '\\text{left} \\to \\text{up: } 90^\\circ \\text{ clockwise}'] }],
      lines: [
        { say: 'How can you describe this rotation? Start at the centre, point P.', show: ['dr.paper', 'dr.s1', 'dr.n1', 'dr.s2', 'dr.n2', 'dr.P'], focus: 'dr.P' },
        { say: 'Draw a line from P to a corner of shape one. This line points to the left, three squares long.', show: ['dr.left', 'm.0'], focus: 'dr.left' },
        { say: 'Now draw a line from P to the matching corner of shape two. It points straight up, and it is three squares long as well.', show: ['dr.up', 'm.1'], focus: 'dr.up' },
        { say: 'Turning from left to up is a quarter turn, the same way a clock’s hands move. Picture a clock hand pointing at the nine. Turn it clockwise, and it points at the twelve.', show: 'dr.turn', focus: 'dr.turn' },
        { say: 'So shape two is shape one after a quarter turn, ninety degrees, clockwise about P.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Use tracing paper',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Use tracing paper', md: 'Trace shape 1 and point $P$. Hold your pencil on $P$ and turn the paper. If the tracing lands on shape 2 without being flipped over, the shapes have rotation symmetry.' },
      ],
      lines: [
        { say: 'Here is a way to check a rotation yourself. Trace shape one and point P on thin paper.', show: 'tip' },
        { say: 'Hold your pencil point on P, so the paper can only turn about P. Then turn the paper.' },
        { say: 'If the tracing lands exactly on shape two, without flipping the paper over, the shapes have rotation symmetry. Count how far you turned to describe the rotation.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A line from the centre of rotation to a corner points **up**. After the rotation, the line to the matching corner points **right**. Which rotation is it?',
          choices: ['A quarter turn clockwise', 'A quarter turn counterclockwise', 'A half turn', 'A reflection'],
          answer: 0,
          working: 'A clock hand pointing up (at 12) turns clockwise to point right (at 3) in a quarter turn.',
        },
      ],
      lines: [
        { say: 'Your turn. A line from the centre of rotation to a corner points up. After the rotation, the line to the matching corner points right. Which rotation is it? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is A, a quarter turn clockwise. A clock hand pointing up, at the twelve, turns clockwise to point right, at the three. That is a quarter turn. Choice B turns the other way, so up would become left.',
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
          items: ['A rotation turns a shape about a centre of rotation, clockwise or counterclockwise.', 'A quarter turn is $90^\\circ$. A half turn is $180^\\circ$.', 'Shapes related by one rotation have rotation symmetry. The image is turned, not flipped.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rotation turns a shape about a centre of rotation, clockwise or counterclockwise.', show: 'sum.0' },
        { say: 'A quarter turn is ninety degrees, and a half turn is one hundred eighty degrees.', show: 'sum.1' },
        { say: 'Shapes related by one rotation have rotation symmetry. The image is turned, but not flipped. In the next part, you will relate shapes with two moves in a row. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
