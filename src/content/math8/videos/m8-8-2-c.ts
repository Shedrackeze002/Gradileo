import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';
import { squares } from './lib/m8-8-figures.ts';

type Cell = [number, number];
const each = (i: number) => `q${i}`;

// A net that folds into a cube: a row of four, with one square above and one below the second.
const cross: Cell[] = [[0, 1], [1, 1], [2, 1], [3, 1], [1, 2], [1, 0]];
// A pattern that does not: a 2 by 2 block (the first four squares) with two more in a row.
const block: Cell[] = [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [3, 1]];
// Liam's net, lettered A to F: a row of four, E above B and F below C.
const liam: Cell[] = [[0, 1], [1, 1], [2, 1], [3, 1], [1, 2], [2, 0]];
const letters = { 0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F' };

const video: Explainer = {
  id: 'm8-8-2-c',
  lessonId: 'm8-8-2',
  title: 'Nets of Three-Dimensional Objects, Part 3: Nets of a Cube',
  thumbnailTitle: 'Nets of a Cube',
  thumbnail: 'lm',
  summary:
    'A cube has 6 equal square faces, so every net of a cube has 6 squares, but not every pattern of 6 squares folds into a cube: there are exactly 11 nets of a cube. A 2 by 2 block of squares never appears in one. In a straight row of three squares, the first and the third fold up to be opposite faces.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 3', title: 'Nets of a Cube', subtitle: 'Six squares, but not just any six' }],
      lines: [
        { say: 'A game die is a cube. Imagine making one from a flat piece of card. What pattern of squares would you cut out?', show: 'title' },
        { say: 'In this video, you will find out which patterns of squares fold into a cube, and which faces end up opposite each other.' },
      ],
    },
    {
      chapter: 'Six squares',
      layout: 'split',
      leftWidth: 400,
      left: [figure('cb', [box({ l: 2, w: 2, h: 2 })], 360)],
      right: [figure('nt', [squares({ cells: cross, group: each, label: '\\text{This net folds into a cube}' })], 420)],
      lines: [
        { say: 'A cube has six faces, and every face is the same square. So every net of a cube is made of six squares.', show: ['cb.shape', 'cb.front-face', 'cb.top-face', 'cb.side-face'] },
        { say: 'Here is one net of a cube. It has a row of four squares, with one more square above the row, and one below it.', show: ['nt.q0', 'nt.q1', 'nt.q2', 'nt.q3', 'nt.q4', 'nt.q5', 'nt.label'] },
        { say: 'Fold the row of four up along its lines, and it wraps around the four sides of the cube.', focus: ['nt.q0', 'nt.q1', 'nt.q2', 'nt.q3'] },
        { say: 'The square above folds over to make the top, and the square below folds under to make the bottom. Every face is covered exactly once.', focus: ['nt.q4', 'nt.q5'] },
      ],
    },
    {
      chapter: 'A block of four',
      layout: 'split',
      leftWidth: 520,
      left: [figure('bk', [squares({ cells: block, group: each, tones: { 0: 'bad', 1: 'bad', 2: 'bad', 3: 'bad' }, label: '\\text{This pattern does not fold into a cube}' })], 380)],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A block of four', md: 'Four squares in a $2$ by $2$ block fold on top of each other: two squares land on the same face, and one face is left open. A $2$ by $2$ block **never** appears in a net of a cube.' },
      ],
      lines: [
        { say: 'But not every pattern of six squares folds into a cube. In fact, there are exactly eleven different nets of a cube.', show: ['bk.q0', 'bk.q1', 'bk.q2', 'bk.q3', 'bk.q4', 'bk.q5', 'bk.label'] },
        { say: 'Look at this pattern. Four of its squares make a block, two squares wide and two squares tall.', focus: ['bk.q0', 'bk.q1', 'bk.q2', 'bk.q3'] },
        { say: 'Try folding it. Two of the squares in the block land on the same face, and one face of the cube is left open, with no square to cover it.', show: 'oops' },
        { say: 'So here is a quick check. A block of four squares, two by two, never appears in a net of a cube.', focus: 'oops' },
      ],
    },
    {
      chapter: 'Opposite faces',
      layout: 'split',
      leftWidth: 520,
      left: [figure('lm', [squares({ cells: liam, group: each, marks: letters })], 420)],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A \\text{ is opposite } C', 'B \\text{ is opposite } D', 'E \\text{ is opposite } F'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'A row of three', md: 'In a straight row of three squares, the first and the third end up **opposite** each other.' },
      ],
      lines: [
        { say: 'Liam folds this lettered net into a game die. Which face is opposite face A?', show: ['lm.q0', 'lm.q1', 'lm.q2', 'lm.q3', 'lm.q4', 'lm.q5'] },
        { say: 'Face B touches face A in the net. Squares that touch in the net are next to each other on the cube. So B is not opposite A.', focus: ['lm.q0', 'lm.q1'] },
        { say: 'Now look at the row A, B, C. Picture face B as the bottom of the cube. Face A folds up on one side, and face C folds up on the other side. They end up facing each other.', focus: ['lm.q0', 'lm.q1', 'lm.q2'] },
        { say: 'So face C is opposite face A. In a straight row of three squares, the first and the third are always opposite.', show: ['m.0', 'key'], focus: 'm.0' },
        { say: 'The same idea works for the row B, C, D: B is opposite D. That leaves E and F, so they must be opposite each other as well.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt:
            'A net of a cube has four squares in a row, numbered $1$, $2$, $3$ and $4$ from left to right. Square $5$ is joined above square $2$, and square $6$ is joined below square $3$. Which square is **opposite** square $2$ on the cube?',
          choices: ['$1$', '$3$', '$4$', '$5$'],
          answer: 2,
          working: 'Squares $2$, $3$ and $4$ are in a straight row, so the first and the third, $2$ and $4$, are opposite.',
        },
      ],
      lines: [
        { say: 'Your turn. A net of a cube has four squares in a row, numbered one, two, three and four from left to right. Square five is joined above square two, and square six is joined below square three. Which square is opposite square two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, square four. Squares two, three and four are in a straight row, so the first and the third, two and four, are opposite. Choice B, square three, touches square two in the net, so it is next to square two on the cube.', show: 'q.answer' },
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
          items: ['Every net of a cube has $6$ squares, and there are exactly $11$ different nets.', 'A $2$ by $2$ block of squares never folds into a cube.', 'In a straight row of three squares, the first and third are opposite faces.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Every net of a cube has six squares, and there are exactly eleven different nets of a cube.', show: 'sum.0' },
        { say: 'A block of four squares, two by two, never folds into a cube.', show: 'sum.1' },
        { say: 'And in a straight row of three squares, the first and the third are opposite faces. In the next part, you will meet the nets of pyramids and cylinders. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
