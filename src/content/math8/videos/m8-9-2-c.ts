import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { note, onIds, shapeOn, sheet, step } from './lib/m8-9-figures.ts';

type P = [number, number];

// Shape P: (1, 1), (4, 1), (4, 2), (2, 4). Its sides: 3 along the bottom, 1 up the right side,
// a slanted side 2 across and 2 up, and a slanted side 1 across and 3 up.
const SP: P[] = [
  [1, 1],
  [4, 1],
  [4, 2],
  [2, 4],
];
// Shape Q is P turned a half turn: (x, y) → (12 − x, 6 − y). Every side keeps its length.
const SQ: P[] = SP.map(([x, y]) => [12 - x, 6 - y]);
// Shape R is P flipped, (x, y) → (12 − x, y), but with its top vertex one square too high:
// (10, 5) instead of (10, 4). Its slanted sides become 2 across and 3 up, and 1 across and 4 down.
const SR: P[] = [
  [11, 1],
  [8, 1],
  [8, 2],
  [10, 5],
];

const g = sheet({ x: [0, 12], y: [0, 6] });
const name = (id: string, at: P, tex: string) => note(g, { id, at, tex: `\\large\\text{${tex}}`, tone: 'ink' });
// Shape P beside shape Q (a half turn of it) or shape R (a flipped copy with a vertex out of place),
// with their straight sides and one slanted side counted in squares.
const grid = (id: string, other: 'q' | 'r') =>
  figure(id, [
    g,
    shapeOn(g, { id: 'p', pts: SP }),
    name('pn', [2.6, 2], 'P'),
    note(g, { id: 'p3', at: [2.5, 0.5], tex: '3', tone: 'adj', group: 'pl' }),
    note(g, { id: 'p1', at: [4.45, 1.5], tex: '1', tone: 'opp', group: 'pl' }),
    step(g, 'pu', [4, 2], [4, 4], { label: '2', side: 'right', group: 'ps' }),
    step(g, 'pa', [4, 4], [2, 4], { label: '2', side: 'right', group: 'ps' }),
    ...(other === 'q'
      ? [
          shapeOn(g, { id: 'q', pts: SQ, tone: 'good' }),
          name('qn', [9.3, 4.2], 'Q'),
          note(g, { id: 'q3', at: [9.5, 5.5], tex: '3', tone: 'adj', group: 'ql' }),
          note(g, { id: 'q1', at: [7.55, 4.5], tex: '1', tone: 'opp', group: 'ql' }),
          step(g, 'qd', [8, 4], [8, 2], { label: '2', side: 'right', group: 'qs' }),
          step(g, 'qa', [8, 2], [10, 2], { label: '2', side: 'right', group: 'qs' }),
        ]
      : [
          shapeOn(g, { id: 'r', pts: SR, tone: 'hyp' }),
          name('rn', [9.3, 2.2], 'R'),
          note(g, { id: 'r3', at: [9.5, 0.5], tex: '3', tone: 'adj', group: 'rl' }),
          note(g, { id: 'r1', at: [7.55, 1.5], tex: '1', tone: 'opp', group: 'rl' }),
          step(g, 'ru', [8, 2], [8, 5], { label: '3', side: 'left', group: 'rs' }),
          step(g, 'ra', [8, 5], [10, 5], { label: '2', side: 'left', group: 'rs' }),
        ]),
  ]);

const video: Explainer = {
  id: 'm8-9-2-c',
  lessonId: 'm8-9-2',
  title: 'Congruence and Transformations, Part 3: Congruent Shapes on a Grid',
  thumbnailTitle: 'Congruent Shapes on a Grid',
  thumbnail: 'pq',
  summary:
    'To check whether two shapes on a grid are congruent, imagine turning or flipping one so it lines up with the other, then compare each side and each corner. Count the squares along straight sides, and for a slanted side count how far it goes across and how far up. Shape Q, a half turn of shape P, matches side for side. Shape R has one vertex a square out of place, so a slanted side goes 2 across and 3 up instead of 2 and 2: R is not congruent to P. Tracing paper helps: slide, turn or flip the tracing to test the fit.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Congruent Polygons · Part 3', title: 'Congruent Shapes on a Grid', subtitle: 'Count the squares' }],
      lines: [
        { say: 'On a grid, you can check whether two shapes are congruent without a ruler or a protractor. You just count squares.', show: 'title' },
        { say: 'In this video, you will compare shapes on a grid, side by side and corner by corner.' },
      ],
    },
    {
      chapter: 'What to compare',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Imagine **turning** or **flipping** one shape so it lines up with the other.',
            'Compare **each side**. Count the squares along a straight side. For a slanted side, count how far it goes **across** and how far it goes **up**.',
            'Compare **each corner**.',
          ],
        },
      ],
      lines: [
        { say: 'Here is the plan. First, imagine turning or flipping one shape, so that it lines up with the other one.', show: 'b.0' },
        { say: 'Then compare each side. For a straight side, count the squares along it. A slanted side cuts across the squares, so count how far it goes across, and how far it goes up. Two slanted sides match only when both numbers match.', show: 'b.1' },
        { say: 'Last, compare each corner. If every side and every corner match, the shapes are congruent.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A half turn',
      layout: 'split',
      leftWidth: 740,
      left: [grid('pq', 'q')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Is shape **Q** congruent to shape **P**?' },
        { kind: 'bullets', id: 'b', items: ['Straight sides: $3$ and $1$ in both.', 'Slanted side: $2$ across and $2$ up or down in both.', 'Last side: $1$ across and $3$ up or down in both.'] },
      ],
      lines: [
        { say: 'Here is shape P. Is shape Q congruent to it? Q looks upside down, so imagine giving it a half turn.', show: ['pq.paper', ...onIds('pq', 'p', false), ...onIds('pq', 'q', false), 'pq.pn', 'pq.qn', 't'] },
        { say: 'Compare the straight sides first. The bottom of P is three squares long, and so is the top of Q. P has a short side of one square, and so does Q.', show: ['pq.pl', 'pq.ql', 'b.0'], focus: ['pq.pl', 'pq.ql'] },
        { say: 'Now a slanted side. This side of P goes two squares across and two squares up.', show: 'pq.ps', focus: 'pq.ps' },
        { say: 'The matching side of Q goes two squares across and two squares down. It points the other way, because Q is upside down, but it is just as long and just as steep.', show: ['pq.qs', 'b.1'], focus: 'pq.qs' },
        { say: 'The last sides match in the same way: one across and three up in P, and one across and three down in Q. Every side and every corner matches, so Q is congruent to P. It is P turned half way round.', show: 'b.2', focus: ['pq.p', 'pq.q'] },
      ],
    },
    {
      chapter: 'One vertex out of place',
      layout: 'split',
      leftWidth: 740,
      left: [grid('pr', 'r')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Is shape **R** congruent to shape **P**?' },
        { kind: 'bullets', id: 'b', items: ['Straight sides: $3$ and $1$ in both.', 'Slanted side: $2$ across and $2$ up in **P**, but $2$ across and $3$ up in **R**.'] },
      ],
      lines: [
        { say: 'Now shape R. It looks like a flipped copy of P. Check it carefully.', show: ['pr.paper', ...onIds('pr', 'p', false), ...onIds('pr', 'r', false), 'pr.pn', 'pr.rn', 't'] },
        { say: 'The straight sides match: three squares along the bottom, and one square up the side.', show: ['pr.pl', 'pr.rl', 'b.0'], focus: ['pr.pl', 'pr.rl'] },
        { say: 'But look at the slanted sides. In P, this side goes two across and two up. In R, the matching side goes two across and three up. It is longer and steeper!', show: ['pr.ps', 'pr.rs', 'b.1'], focus: ['pr.ps', 'pr.rs'] },
        { say: 'The top vertex of R is one square out of place. That changes two sides and the corners, so R is not congruent to P.', focus: 'pr.r' },
      ],
    },
    {
      chapter: 'Trace and test',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Trace and test', md: 'Trace one shape on tracing paper. **Slide**, **turn** or **flip** the paper to see whether the tracing fits **exactly** over the other shape.' }],
      lines: [
        { say: 'Here is a hands-on way to check. Trace one shape on a piece of tracing paper.', show: 'tip' },
        { say: 'Then slide, turn or flip the paper, and see whether the tracing fits exactly over the other shape.' },
        { say: 'If it fits exactly, with every side and corner on top of its partner, the shapes are congruent. If even one vertex sticks out, they are not.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a grid, a slanted side of shape $M$ goes $2$ squares across and $3$ squares up. Shape $N$ is shape $M$ flipped over a **vertical** mirror line. How does the matching side of $N$ go?',
          choices: ['$3$ across and $2$ up', '$2$ across and $4$ up', '$2$ across and $3$ up', '$1$ across and $3$ up'],
          answer: 2,
          working: 'A flip does not change the size of a side. Over a vertical mirror line, the side goes the other way across, but still $2$ squares across and $3$ squares up.',
        },
      ],
      lines: [
        { say: 'Your turn. On a grid, a slanted side of shape M goes two squares across and three squares up. Shape N is shape M flipped over a vertical mirror line. How does the matching side of N go? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is C: two across and three up. A flip changes which way the side points, but not its size. Choice B, two across and four up, is a longer side, so the shapes would not be congruent.', show: 'q.answer' },
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
          items: ['Imagine turning or flipping one shape so it lines up with the other.', 'Compare every side: count squares, and for a slanted side, count across and up.', 'If even one vertex is a square out of place, the shapes are not congruent.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To compare shapes on a grid, imagine turning or flipping one of them, so it lines up with the other.', show: 'sum.0' },
        { say: 'Compare every side. Count the squares, and for a slanted side, count how far it goes across and how far up.', show: 'sum.1' },
        { say: 'If even one vertex is a square out of place, the shapes are not congruent. In the next part, you will write a statement of congruence for a shape and its image. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
