import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fold, join, mark, shape } from '@/content/math5/videos/lib/m5-8-figures.ts';
import { paper, tag, turnArrow, type P } from './lib/m6-7-figures.ts';

// The lesson's L shape (shape 1), its mirror image in line m (x = 5), drawn as a dashed outline,
// and that outline after a half turn about P(10, 1), which is shape 2.
const L: P[] = [
  [1, 1],
  [4, 1],
  [4, 2],
  [2, 2],
  [2, 4],
  [1, 4],
];
const OUTLINE: P[] = L.map(([x, y]) => [10 - x, y]);
const SHAPE2: P[] = OUTLINE.map(([x, y]) => [20 - x, 2 - y]);

const moves = (id: string) =>
  figure(
    id,
    [
      join(
        paper({ x: [0, 15], y: [-3, 5] }),
        shape({ id: 's1', pieces: [L], tone: 'adj', shade: 0.3 }),
        tag({ id: 'n1', at: [1.5, 2.5], tex: '1' }),
        fold({ id: 'm', a: [5, -3.3], b: [5, 5.3] }),
        tag({ id: 'm-name', at: [5, 5.3], tex: 'm', place: 'above', tone: 'good' }),
        shape({ id: 'out', pieces: [OUTLINE], tone: 'muted', dashed: true }),
        shape({ id: 's2', pieces: [SHAPE2], tone: 'opp', shade: 0.3 }),
        tag({ id: 'n2', at: [11.5, -0.5], tex: '2' }),
        turnArrow({ id: 'turn', c: [10, 1], r: 0.9, from: 170, to: 10, tone: 'good' }),
        mark({ id: 'P', at: [10, 1], tex: 'P', place: 'below' }),
      ),
    ],
    430,
  );
const base = (id: string) => [`${id}.paper`, `${id}.s1`, `${id}.n1`, `${id}.s2`, `${id}.n2`];

const video: Explainer = {
  id: 'm6-7-1-c',
  lessonId: 'm6-7-1',
  title: 'Symmetry Between Shapes, Part 3: Two Moves in a Row',
  thumbnailTitle: 'Two Moves in a Row',
  thumbnail: 'mv',
  summary:
    'Some pairs of shapes need two moves: here no single reflection or rotation takes shape 1 onto shape 2, but a reflection in line m followed by a half turn (180°) about point P does. Do one move at a time, in order: the dashed outline shows the mirror image after the first move.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry and Congruence · Part 3', title: 'Two Moves in a Row', subtitle: 'A flip, and then a turn' }],
      lines: [
        { say: 'Sometimes one move is not enough to get from one shape to another.', show: 'title' },
        { say: 'In this video, you will relate two shapes with two moves in a row: a reflection, and then a rotation.' },
      ],
    },
    {
      chapter: 'One move is not enough',
      layout: 'split',
      leftWidth: 700,
      left: [moves('a')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Shape 2 is flipped: its tall part points **down**. But no single flip or turn moves shape 1 exactly onto shape 2.' }],
      lines: [
        { say: 'Here are two L shapes, shape one and shape two. They are the same size and the same shape.', show: base('a') },
        { say: 'Look at the tall part of each one. In shape one, it points up. In shape two, it points down, while the long part still points to the right. Shape two is a mirror image of shape one.', show: 't' },
        { say: 'But no single mirror line flips shape one exactly onto shape two, and a turn alone can never undo a flip. Think of your hands: you can turn your left hand any way you like, and it never becomes a right hand.' },
        { say: 'So we need two moves. Do one move at a time.' },
      ],
    },
    {
      chapter: 'First move: a flip',
      layout: 'split',
      leftWidth: 700,
      left: [moves('b')],
      right: [{ kind: 'text', id: 't', size: 'md', md: '**First move:** a reflection in line $m$. The dashed outline is the mirror image of shape 1.' }],
      lines: [
        { say: 'The first move is a reflection in the green dashed line, line m.', show: [...base('b'), 'b.m', 'b.m-name'], focus: 'b.m' },
        { say: 'Flip shape one over line m. Its mirror image is the dashed outline.', show: ['b.out', 't'], focus: 'b.out' },
        { say: 'Check one corner. The right end of shape one is one square to the left of line m. The matching corner of the outline is one square to the right of it. Every corner matches this way.' },
        { say: 'The outline faces the other way now: its long part points to the left.' },
      ],
    },
    {
      chapter: 'Second move: a turn',
      layout: 'split',
      leftWidth: 700,
      left: [moves('c')],
      right: [{ kind: 'text', id: 't', size: 'md', md: '**Second move:** a half turn ($180^\\circ$) about point $P$. The outline turns upside down onto shape 2.' }],
      lines: [
        { say: 'The second move is a rotation. Turn the outline a half turn, one hundred eighty degrees, about point P.', show: [...base('c'), 'c.m', 'c.m-name', 'c.out', 'c.P', 'c.turn', 't'], focus: 'c.turn' },
        { say: 'A half turn points every direction the opposite way. The outline’s long part pointed left, so now it points right. Its tall part pointed up, so now it points down.' },
        { say: 'Check a corner. The outline’s corner next to P is one square to the left of P. After the half turn, it is one square to the right of P. That is a corner of shape two.' },
        { say: 'The outline lands exactly on shape two. So two moves did it.', focus: 'c.s2' },
      ],
    },
    {
      chapter: 'Describe both moves',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ans', tone: 'key', title: 'The two moves', md: 'Shape 1 is **reflected** in line $m$, and then **rotated** a half turn ($180^\\circ$) about point $P$, to make shape 2.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'One move at a time', md: 'Draw the shape after the first move, then do the second move to that drawing. Do the moves in the order they are given.' },
      ],
      lines: [
        { say: 'To describe the two moves, name each one in order. Shape one is reflected in line m, and then rotated a half turn about point P, to make shape two.', show: 'ans' },
        { say: 'Here is a tip. Do one move at a time. Draw the shape after the first move, like the dashed outline. Then do the second move to that drawing.', show: 'tip' },
        { say: 'Keep the moves in the order they are given. If you turned shape one about P first, it would land far away, and the flip would not bring it back to shape two.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Shape 1 is reflected in a line, and then the image is rotated a half turn. Compared with shape 1, the final shape is…',
          choices: ['bigger', 'smaller', 'only slid over, facing the same way', 'the same size and shape, but a mirror image'],
          answer: 3,
          working: 'Reflections and rotations do not change size or shape. The reflection makes a mirror image, and a turn cannot undo a flip.',
        },
      ],
      lines: [
        { say: 'Your turn. Shape one is reflected in a line, and then the image is rotated a half turn. Compared with shape one, what is the final shape like? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is D: the same size and shape, but a mirror image. Flips and turns never change the size or shape, and the flip makes a mirror image. Choice C cannot be right, because a turn can never undo a flip.',
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
          items: ['Some shapes are related by two moves in a row.', 'Do one move at a time, in order, and draw the shape after each move.', 'Describe each move: a reflection in line $m$, then a half turn about $P$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Some shapes are related by two moves in a row.', show: 'sum.0' },
        { say: 'Do one move at a time, in order, and draw the shape after each move.', show: 'sum.1' },
        { say: 'Then describe each move. Here it was a reflection in line m, and then a half turn about P. In the next part, you will find symmetry in tessellations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
