import type { Explainer } from '@/video/script.ts';
import type { DiagramTone } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import type { Plane } from '@/video/graph.ts';
import { grid, move, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';

type P = [number, number];

/** A segment on the grid from `a` to `b`: the part `id`. */
const segOn = (g: Plane, id: string, a: P, b: P, tone: DiagramTone = 'adj'): Part => ({
  points: { [`${id}-a`]: g.map(...a), [`${id}-b`]: g.map(...b) },
  items: [{ kind: 'line', id, from: `${id}-a`, to: `${id}-b`, tone, weight: 5 }],
});

// A (2, 3) to B (8, 7): the whole move is 6 right and 4 up; half of it, 3 right and 2 up, lands on
// the midpoint M (5, 5).
const g1 = grid({ x: 10, y: 8 });
const mid = (id: string) =>
  figure(
    id,
    [
      g1,
      segOn(g1, 'ab', [2, 3], [8, 7]),
      move(g1, 'w1', [2, 3], [8, 3], { label: '6\\text{ right}', side: 'right', group: 'whole' }),
      move(g1, 'w2', [8, 3], [8, 7], { label: '4\\text{ up}', side: 'right', group: 'whole' }),
      move(g1, 'h1', [2, 3], [5, 3], { label: '3', side: 'left', group: 'half', tone: 'good' }),
      move(g1, 'h2', [5, 3], [5, 5], { label: '2', side: 'left', group: 'half', tone: 'good' }),
      move(g1, 'c1', [5, 5], [8, 5], { label: '3', side: 'left', group: 'again', tone: 'good' }),
      move(g1, 'c2', [8, 5], [8, 7], { label: '2', side: 'right', group: 'again', tone: 'good' }),
      pt(g1, 'A', 2, 3, 'A(2, 3)', 'below', 'adj'),
      pt(g1, 'B', 8, 7, 'B(8, 7)', 'above left', 'adj'),
      pt(g1, 'M', 5, 5, 'M(5, 5)', 'above left', 'good'),
    ],
    500,
  );

// Working backward: A (1, 2) and the midpoint M (4, 4); the same move again from M lands on B (7, 6).
const g2 = grid({ x: 10, y: 8 });
const back = (id: string) =>
  figure(
    id,
    [
      g2,
      move(g2, 'm1', [1, 2], [4, 2], { label: '3', side: 'right', group: 'first' }),
      move(g2, 'm2', [4, 2], [4, 4], { label: '2', side: 'right', group: 'first' }),
      move(g2, 'n1', [4, 4], [7, 4], { label: '3', side: 'right', group: 'second', tone: 'good' }),
      move(g2, 'n2', [7, 4], [7, 6], { label: '2', side: 'right', group: 'second', tone: 'good' }),
      segOn(g2, 'ab', [1, 2], [7, 6]),
      pt(g2, 'A', 1, 2, 'A', 'left', 'adj'),
      pt(g2, 'M', 4, 4, 'M(4, 4)', 'above left', 'good'),
      pt(g2, 'B', 7, 6, 'B(7, 6)', 'above left', 'adj'),
    ],
    500,
  );

const video: Explainer = {
  id: 'm7-8-2-b',
  lessonId: 'm7-8-2',
  title: 'Perpendicular Bisectors and Angle Bisectors, Part 2: Midpoints on a Grid',
  thumbnailTitle: 'Midpoints on a Grid',
  thumbnail: 'md',
  summary:
    'On a grid, find the midpoint by going halfway across and halfway up or down. From A(2, 3) to B(8, 7) is 6 right and 4 up; half of that is 3 right and 2 up, so the midpoint is M(5, 5). Working backward, if you know A and the midpoint M, make the move from A to M once more, starting at M, and you land on B: A(1, 2) and M(4, 4) give B(7, 6).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Constructions · Part 2', title: 'Midpoints on a Grid', subtitle: 'Halfway across, and halfway up' }],
      lines: [
        { say: 'The midpoint of a segment is the point exactly halfway between its endpoints. When the segment is drawn on a grid, you can find its midpoint by counting.', show: 'title' },
        { say: 'In this video, you will find the midpoint of a segment on a grid, and use a midpoint to find a missing endpoint.' },
      ],
    },
    {
      chapter: 'The whole move',
      layout: 'split',
      leftWidth: 620,
      left: [mid('md')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A(2, 3) \\to B(8, 7)', '\\text{Move: } 6 \\text{ right}, 4 \\text{ up}'] }],
      lines: [
        { say: 'Here is segment A B on a grid. Point A is at two, three: two across and three up. Point B is at eight, seven.', show: ['md.grid', 'md.axes', 'md.ab', 'md.A', 'md.B', 'm.0'] },
        { say: 'First, find the whole move from A to B. Going across, from two to eight is six squares right.', show: 'md.w1', focus: 'md.w1' },
        { say: 'Going up, from three to seven is four squares up. So the whole move is six right and four up.', show: ['md.w2', 'm.1'], focus: ['md.w2', 'm.1'] },
      ],
    },
    {
      chapter: 'Half of the move',
      layout: 'split',
      leftWidth: 620,
      left: [mid('hf')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Half: } 3 \\text{ right}, 2 \\text{ up}', 'x = 2 + 3 = 5', 'y = 3 + 2 = 5', 'M(5, 5)'] }],
      lines: [
        { say: 'The midpoint is halfway along, so take half of the move. Half of six right is three right, and half of four up is two up.', show: ['hf.grid', 'hf.axes', 'hf.ab', 'hf.A', 'hf.B', 'hf.whole', 'm.0'], focus: 'm.0' },
        { say: 'Start at A, and make the half move: three right, and two up.', show: 'hf.half', focus: 'hf.half' },
        { say: 'Across, two plus three is five. Up, three plus two is five. So the midpoint is M, at five, five.', show: ['m.1', 'm.2', 'm.3', 'hf.M'], focus: ['m.3', 'hf.M'] },
        { say: 'Check: from M, make the half move again: three right and two up. You land exactly on B. So M is halfway.', show: 'hf.again', focus: 'hf.again' },
      ],
    },
    {
      chapter: 'Working backward',
      layout: 'split',
      leftWidth: 620,
      left: [back('bk')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A(1, 2), \\; M(4, 4)', 'B(7, 6)'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Working backward', md: 'If you know $A$ and the midpoint $M$, make the move from $A$ to $M$ **once more**, starting at $M$. You land on $B$.' },
      ],
      lines: [
        { say: 'Sometimes you know one endpoint and the midpoint, and you need the other endpoint. Here, A is at one, two, and the midpoint M is at four, four. Where is B?', show: ['bk.grid', 'bk.axes', 'bk.A', 'bk.M', 'm.0'] },
        { say: 'Find the move from A to M: three right, and two up.', show: 'bk.first', focus: 'bk.first' },
        { say: 'M is halfway, so B is the same move further on. Start at M, and make the move once more: three right and two up.', show: ['tip', 'bk.second'], focus: 'bk.second' },
        { say: 'You land on B, at seven, six. Check: from one, two to seven, six is six right and four up, and half of that is three right and two up. It works!', show: ['bk.B', 'bk.ab', 'm.1'], focus: ['bk.B', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the midpoint of the segment from $P(1, 2)$ to $Q(9, 6)$.',
          choices: ['$(4, 2)$', '$(10, 8)$', '$(5, 4)$', '$(8, 4)$'],
          answer: 2,
          working: 'The move from $P$ to $Q$ is $8$ right and $4$ up. Half of it is $4$ right and $2$ up. From $P$: $(1 + 4, 2 + 2) = (5, 4)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the midpoint of the segment from P, at one, two, to Q, at nine, six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, the point at five, four. The move is eight right and four up. Half of it is four right and two up, and from P that lands on five, four. Choice A is only the half move itself: you still need to start from P.', show: 'q.answer' },
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
          items: ['Find the whole move from one endpoint to the other.', 'Take half of the move, starting from the first endpoint: you land on the midpoint.', 'To find a missing endpoint, make the move from $A$ to $M$ once more.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a midpoint on a grid, first find the whole move from one endpoint to the other.', show: 'sum.0' },
        { say: 'Then take half of the move, starting from the first endpoint. You land on the midpoint.', show: 'sum.1' },
        { say: 'And to find a missing endpoint, make the move from A to the midpoint once more. In the next part, you will construct a perpendicular bisector with a compass. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
