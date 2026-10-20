import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fold, join, mark, shape } from '@/content/math5/videos/lib/m5-8-figures.ts';
import { paper, span, tag, turnArrow, type P } from './lib/m6-7-figures.ts';

// Two pairs related by symmetry: a flag and its reflection in line m (x = 6), and a triangle and
// its quarter turn clockwise about P(18, 1).
const FLAG: P[] = [
  [1, 1],
  [2, 1],
  [2, 3],
  [4, 4],
  [2, 5],
  [1, 5],
];
const TRI: P[] = [
  [15, 1],
  [18, 1],
  [15, 3],
];
const TURNED: P[] = [
  [18, 4],
  [18, 1],
  [20, 4],
];
const symmetric = (id: string) =>
  figure(
    id,
    [
      join(
        paper({ name: 'l', x: [0, 12], y: [0, 6] }),
        paper({ name: 'r', x: [14, 21], y: [0, 6] }),
        fold({ id: 'm', a: [6, -0.3], b: [6, 6.3] }),
        shape({ id: 'f1', pieces: [FLAG], tone: 'adj', shade: 0.3 }),
        shape({ id: 'f2', pieces: [FLAG.map(([x, y]) => [12 - x, y] as P)], tone: 'opp', shade: 0.3 }),
        tag({ id: 'cap1', at: [6, -1], tex: '\\text{reflection}', tone: 'good', place: 'below' }),
        shape({ id: 'r1', pieces: [TRI], tone: 'adj', shade: 0.3 }),
        shape({ id: 'r2', pieces: [TURNED], tone: 'opp', shade: 0.3 }),
        turnArrow({ id: 'turn', c: [18, 1], r: 2.2, from: 180, to: 90, tone: 'good' }),
        mark({ id: 'P', at: [18, 1], tex: 'P', place: 'below right' }),
        tag({ id: 'cap2', at: [17.5, -1], tex: '\\text{rotation}', tone: 'good', place: 'below' }),
      ),
    ],
    360,
  );

// The lesson's pair: shape 2 is shape 1 slid 5 right and 1 up, facing the same way.
const S1: P[] = [
  [1, 1],
  [4, 1],
  [3, 3],
  [1, 2],
];
const S2: P[] = S1.map(([x, y]) => [x + 5, y + 1]);
const slid = (id: string) =>
  figure(
    id,
    [
      join(
        paper({ x: [0, 10], y: [0, 5] }),
        shape({ id: 's1', pieces: [S1], tone: 'adj', shade: 0.3 }),
        tag({ id: 'n1', at: [2, 1.7], tex: '1' }),
        shape({ id: 's2', pieces: [S2], tone: 'opp', shade: 0.3 }),
        tag({ id: 'n2', at: [7, 2.7], tex: '2' }),
        span({ id: 'slide', a: [3, 3], b: [8, 4], tone: 'theta' }),
      ),
    ],
    380,
  );

const video: Explainer = {
  id: 'm6-7-2-c',
  lessonId: 'm6-7-2',
  title: 'Congruent Shapes, Part 3: Symmetry and Congruence',
  thumbnailTitle: 'Symmetry and Congruence',
  thumbnail: 'sl',
  summary:
    'A reflection or a rotation moves a shape without changing its size or shape, so shapes related by reflection or rotation symmetry are always congruent. But congruent shapes are not always related by symmetry: a shape that is only slid over is congruent to the original, yet faces the same way and is not turned, so no single reflection or rotation maps one onto the other.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry and Congruence · Part 3', title: 'Symmetry and Congruence', subtitle: 'How the two ideas are connected' }],
      lines: [
        { say: 'You have learned about reflections and rotations, and about shapes that are congruent. How are these ideas connected?', show: 'title' },
        { say: 'In this video, you will see that shapes related by symmetry are always congruent, but shapes that are congruent are not always related by symmetry.' },
      ],
    },
    {
      chapter: 'Symmetry keeps size and shape',
      layout: 'center',
      main: [
        symmetric('sy'),
        { kind: 'callout', id: 'key', tone: 'key', title: 'Always congruent', md: 'A reflection or a rotation moves a shape without changing its size or shape. So **shapes related by symmetry are always congruent**.' },
      ],
      lines: [
        { say: 'Here is a flag and its reflection in a mirror line. A reflection flips the shape, but every side keeps its length.', show: ['sy.l-paper', 'sy.m', 'sy.f1', 'sy.f2', 'sy.cap1'] },
        { say: 'Here is a triangle and its rotation, a quarter turn about point P. A rotation turns the shape, but every side keeps its length here as well.', show: ['sy.r-paper', 'sy.r1', 'sy.r2', 'sy.turn', 'sy.P', 'sy.cap2'] },
        { say: 'So a reflection or a rotation never changes the size or the shape. That means shapes related by symmetry are always congruent.', show: 'key' },
      ],
    },
    {
      chapter: 'Congruent, but not symmetric',
      layout: 'split',
      leftWidth: 560,
      left: [slid('sl')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Shape 2 is only **slid** over. It is congruent to shape 1, but it faces the **same way** and is **not turned**.' }],
      lines: [
        { say: 'But it does not work the other way round. Look at these two shapes.', show: ['sl.paper', 'sl.s1', 'sl.n1', 'sl.s2', 'sl.n2'] },
        { say: 'Shape two is shape one slid over: every point moved five squares to the right and one square up.', show: 'sl.slide', focus: 'sl.slide' },
        { say: 'Sliding does not change the size or shape, so the two shapes are congruent. Their side lengths and corners all match.', show: 't' },
        { say: 'But they face exactly the same way. A reflection would make a mirror image facing the opposite way, and a rotation would turn the shape. Shape two is neither flipped nor turned.' },
      ],
    },
    {
      chapter: 'Describe the pair',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Question', 'Shapes 1 and 2'],
          rows: [
            ['Same size and shape?', '[[good:Yes]]: congruent'],
            ['A mirror image?', '[[bad:No]]: they face the same way'],
            ['Turned?', '[[bad:No]]: not turned at all'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Not always related by symmetry', md: 'Congruent shapes are **not always** related by symmetry. A shape that is only slid over is congruent, but not related by one reflection or one rotation.' },
      ],
      lines: [
        { say: 'Let’s describe the pair. Are shapes one and two congruent? Yes. The side lengths and corners match.', show: 't.0', focus: 't.0' },
        { say: 'Are they related by reflection symmetry? No. Shape two is not a mirror image, because it faces the same way.', show: 't.1', focus: 't.1' },
        { say: 'Are they related by rotation symmetry? No. Shape two is not turned at all.', show: 't.2', focus: 't.2' },
        { say: 'So these shapes are congruent, but they are not related by one reflection or one rotation. Shapes that are congruent are not always related by symmetry.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Shape $P$ is an L-shape. Shape $Q$ is shape $P$ slid $4$ squares to the right. Which statement is true?',
          choices: ['$P$ and $Q$ are not congruent.', '$P$ and $Q$ are congruent, but not related by one reflection or one rotation.', '$P$ and $Q$ have reflection symmetry.', '$Q$ is bigger than $P$.'],
          answer: 1,
          working: 'Sliding does not change size or shape, so $P$ and $Q$ are congruent. $Q$ faces the same way and is not turned, so no single reflection or rotation maps $P$ onto $Q$.',
        },
      ],
      lines: [
        { say: 'Your turn. Shape P is an L-shape, and shape Q is shape P slid four squares to the right. Which statement is true? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is B. Sliding does not change the size or shape, so the shapes are congruent. But shape Q faces the same way and is not turned, so no single reflection or rotation maps P onto Q. Choice C is wrong, because a mirror image faces the opposite way.',
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
          items: ['Reflections and rotations do not change size or shape.', 'So shapes related by symmetry are always congruent.', 'Congruent shapes are not always related by symmetry: a shape that is only slid over is congruent, but not a reflection or a rotation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Reflections and rotations do not change the size or shape.', show: 'sum.0' },
        { say: 'So shapes related by symmetry are always congruent.', show: 'sum.1' },
        { say: 'But shapes that are congruent are not always related by symmetry. A shape that is only slid over is congruent, but it is not a reflection or a rotation. In the next lesson, you will move shapes on a grid with numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
