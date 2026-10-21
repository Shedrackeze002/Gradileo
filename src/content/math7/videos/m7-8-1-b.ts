import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { paper } from '@/content/math6/videos/lib/m6-7-figures.ts';
import { join, mark, piece, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { pt } from './lib/m7-8-figures.ts';

type P = [number, number];

/** A move along the grid: a dashed arrow with a label (across in blue, up or down in orange). */
const move = (id: string, a: P, b: P, label: string, side: 'left' | 'right', group: string) =>
  seg(id, a, b, { tone: a[1] === b[1] ? 'adj' : 'opp', dashed: true, arrow: true, weight: 3, label, side, group });

// The trapezoid ABCD on squared paper: AB and DC flat, AD straight up, BC 2 left and 4 up.
const trap = (id: string) =>
  figure(
    id,
    [
      paper({ x: [0, 8], y: [0, 6] }),
      join(
        piece('shape', [
          [1, 1],
          [7, 1],
          [5, 5],
          [1, 5],
        ], { tone: 'brand', shade: 0.12, weight: 2 }),
        seg('AB', [1, 1], [7, 1], { tone: 'adj', weight: 5 }),
        seg('DC', [1, 5], [5, 5], { tone: 'adj', weight: 5 }),
        seg('AD', [1, 1], [1, 5], { tone: 'opp', weight: 5 }),
        seg('BC', [7, 1], [5, 5], { tone: 'hyp', weight: 5 }),
        mark('mA', [1, 1], [7, 1], [1, 5], 'marks'),
        mark('mD', [1, 5], [5, 5], [1, 1], 'marks'),
        move('m1', [7, 1], [5, 1], '2', 'left', 'bcmove'),
        move('m2', [5, 1], [5, 5], '4', 'left', 'bcmove'),
        pt('A', [1, 1], 'A', 'below left'),
        pt('B', [7, 1], 'B', 'below right'),
        pt('C', [5, 5], 'C', 'above right'),
        pt('D', [1, 5], 'D', 'above left'),
      ),
    ],
    440,
  );

// The parallelogram PQRS: PQ and SR both 4 right and 1 down; PS and QR both 2 right and 3 up.
const slant = (id: string) =>
  figure(
    id,
    [
      paper({ x: [0, 8], y: [0, 6] }),
      join(
        piece('shape', [
          [1, 2],
          [5, 1],
          [7, 4],
          [3, 5],
        ], { tone: 'brand', shade: 0.12, weight: 2 }),
        seg('PQ', [1, 2], [5, 1], { tone: 'adj', weight: 5 }),
        seg('SR', [3, 5], [7, 4], { tone: 'adj', weight: 5 }),
        seg('PS', [1, 2], [3, 5], { tone: 'hyp', weight: 5 }),
        seg('QR', [5, 1], [7, 4], { tone: 'hyp', weight: 5 }),
        move('pq1', [1, 2], [5, 2], '4', 'left', 'pqmove'),
        move('pq2', [5, 2], [5, 1], '1', 'left', 'pqmove'),
        move('sr1', [3, 5], [7, 5], '4', 'left', 'srmove'),
        move('sr2', [7, 5], [7, 4], '1', 'left', 'srmove'),
        pt('P', [1, 2], 'P', 'left'),
        pt('Q', [5, 1], 'Q', 'below'),
        pt('R', [7, 4], 'R', 'right'),
        pt('S', [3, 5], 'S', 'above'),
      ),
    ],
    440,
  );
const corners = (id: string, names: string[]) => names.map((c) => `${id}.${c}`);

const video: Explainer = {
  id: 'm7-8-1-b',
  lessonId: 'm7-8-1',
  title: 'Parallel and Perpendicular Line Segments, Part 2: Checking Sides on a Grid',
  thumbnailTitle: 'Checking Sides on a Grid',
  thumbnail: 'sl',
  summary:
    'On grid paper, count squares to check. Two sides are parallel when they make the same move: the same number of squares across and up or down. A flat (horizontal) side and a straight up-and-down (vertical) side are perpendicular. In trapezoid ABCD, AB ∥ DC, AD ⊥ AB and AD ⊥ DC; in PQRS, PQ and SR both go 4 right and 1 down, and PS and QR both go 2 right and 3 up, so it is a parallelogram.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Constructions · Part 2', title: 'Checking Sides on a Grid', subtitle: 'Count the squares' }],
      lines: [
        { say: 'Sometimes a shape is drawn on grid paper. Then you do not need a ruler or a protractor to find parallel or perpendicular sides. You can count squares.', show: 'title' },
        { say: 'In this video, you will learn how to check the sides of a shape on a grid.' },
      ],
    },
    {
      chapter: 'Two rules',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Two sides are **parallel** when they make the **same move**: the same number of squares across, and the same number up or down.', 'Two flat (**horizontal**) sides are parallel.', 'A flat side and a straight up-and-down (**vertical**) side are **perpendicular**.'],
        },
      ],
      lines: [
        { say: 'Here are the rules. To go from one end of a side to the other, count how many squares you move across, and how many you move up or down. That is the side’s move.', show: 'b.0' },
        { say: 'Two sides are parallel when they make the same move. They point in exactly the same direction.' },
        { say: 'Flat sides, which we call horizontal, are all parallel to each other.', show: 'b.1' },
        { say: 'And a horizontal side and a straight up-and-down side, which we call vertical, are perpendicular: they meet in a square corner, like the lines of the grid.', show: 'b.2' },
      ],
    },
    {
      chapter: 'The sides of a trapezoid',
      layout: 'split',
      leftWidth: 600,
      left: [trap('tz')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AB \\parallel DC', 'AD \\perp AB', 'AD \\perp DC', 'BC: \\text{ neither}'] }],
      lines: [
        { say: 'Here is a four-sided shape, A B C D, on grid paper. Which sides are parallel, and which are perpendicular?', show: ['tz.paper', 'tz.shape', ...corners('tz', ['A', 'B', 'C', 'D'])] },
        { say: 'Side A B is flat. Side D C is flat as well. Two flat sides are parallel, so A B is parallel to D C.', show: ['tz.AB', 'tz.DC', 'm.0'], focus: ['tz.AB', 'tz.DC'] },
        { say: 'Side A D goes straight up. It meets A B and D C in square corners. So A D is perpendicular to A B, and A D is perpendicular to D C.', show: ['tz.AD', 'tz.marks', 'm.1', 'm.2'], focus: ['tz.AD', 'tz.marks'] },
        { say: 'Side B C goes two squares left and four squares up. No other side makes that move, and it makes no square corner. So B C is neither parallel nor perpendicular to another side.', show: ['tz.BC', 'tz.bcmove', 'm.3'], focus: ['tz.BC', 'tz.bcmove'] },
        { say: 'This shape has one pair of parallel sides. A shape like this is called a trapezoid.' },
      ],
    },
    {
      chapter: 'Slanted sides',
      layout: 'split',
      leftWidth: 600,
      left: [slant('sl')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['PQ: 4 \\text{ right}, 1 \\text{ down}', 'SR: 4 \\text{ right}, 1 \\text{ down}', 'PQ \\parallel SR', 'PS \\parallel QR'] }],
      lines: [
        { say: 'This shape, P Q R S, has no flat sides at all. Which sides are parallel?', show: ['sl.paper', 'sl.shape', ...corners('sl', ['P', 'Q', 'R', 'S'])] },
        { say: 'From P to Q, the move is four squares right and one square down.', show: ['sl.PQ', 'sl.pqmove', 'm.0'], focus: ['sl.PQ', 'sl.pqmove'] },
        { say: 'From S to R, the move is also four squares right and one square down. Same move, so P Q is parallel to S R.', show: ['sl.SR', 'sl.srmove', 'm.1', 'm.2'], focus: ['sl.SR', 'sl.srmove'] },
        { say: 'Now the other two sides. From P to S is two right and three up, and from Q to R is two right and three up as well. So P S is parallel to Q R.', show: ['sl.PS', 'sl.QR', 'm.3'], hide: ['sl.pqmove', 'sl.srmove'], focus: ['sl.PS', 'sl.QR'] },
        { say: 'A four-sided shape with two pairs of parallel sides is a parallelogram.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a grid, side $KL$ goes $3$ squares right and $2$ squares up. Which move makes a side **parallel** to $KL$?',
          choices: ['$2$ right and $3$ up', '$3$ right and $2$ up', '$3$ right and $2$ down', '$2$ left and $3$ up'],
          answer: 1,
          working: 'Parallel sides make the same move: $3$ right and $2$ up.',
        },
      ],
      lines: [
        { say: 'Your turn. On a grid, side K L goes three squares right and two squares up. Which move makes a side parallel to K L? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, three right and two up: the same move as K L. Choice A swaps the numbers, so its side is steeper, and points in a different direction.', show: 'q.answer' },
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
          items: ['On a grid, parallel sides make the **same move**.', 'Horizontal sides are parallel to each other.', 'A horizontal side and a vertical side are perpendicular.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a grid, count squares. Parallel sides make the same move, across and up or down.', show: 'sum.0' },
        { say: 'Horizontal sides are all parallel to each other.', show: 'sum.1' },
        { say: 'And a horizontal side and a vertical side are perpendicular. In the next part, you will use what you know about parallel and perpendicular segments to find angles and check drawings. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
