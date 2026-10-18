import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hole, numbers, piece, plane, spot } from './lib/m31-2-graphs.ts';

// x² + 1 for x < 1 and 3x − 1 for x ≥ 1: the pieces meet at (1, 2).
const g1 = plane({ x: [-2, 3], y: [0, 9], yStep: 1, every: 0, width: 5, height: 7 });
const meet = figure('pw', [
  g1,
  numbers(g1, 1, 1),
  piece(g1, { id: 'a', f: (x) => x * x + 1, from: -2, to: 1 }),
  piece(g1, { id: 'b', f: (x) => 3 * x - 1, from: 1, to: 3, tone: 'opp' }),
  hole(g1, 'h', 1, 2),
  spot(g1, 'd', 1, 2, { tex: '(1, 2)', place: 'right', tone: 'opp' }),
]);

// kx − 1 for x < 2 and x² + 3 for x ≥ 2: with k = 2 the pieces miss; with k = 4 they meet at (2, 7).
const g2 = plane({ x: [0, 3.5], y: [-1, 15], yStep: 1, every: 0, width: 5, height: 7 });
const findK = figure('kk', [
  g2,
  numbers(g2, 1, 2),
  piece(g2, { id: 'right', f: (x) => x * x + 3, from: 2, to: 3.5, tone: 'opp' }),
  spot(g2, 'd', 2, 7, { tex: '(2, 7)', place: 'below right', tone: 'opp' }),
  piece(g2, { id: 'k2', f: (x) => 2 * x - 1, from: 0, to: 2, tone: 'muted', dashed: true }),
  hole(g2, 'h2', 2, 3, { tex: 'k = 2', place: 'right', tone: 'muted' }),
  piece(g2, { id: 'k4', f: (x) => 4 * x - 1, from: 0, to: 2 }),
]);

const video: Explainer = {
  id: 'm31-2-4-d',
  lessonId: 'm31-2-4',
  title: 'Continuity, Part 4: Piecewise Functions',
  thumbnailTitle: 'Continuity of Piecewise Functions',
  thumbnail: 'kk',
  summary: 'A piecewise function made of continuous pieces can only be discontinuous where the formula changes: compare the left-hand limit, the right-hand limit and the value there. x² + 1 and 3x − 1 meet at (1, 2); k = 4 makes kx − 1 meet x² + 3 at x = 2; and c = 5 fills the hole of (x² − x − 6)/(x − 3) at x = 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 4', title: 'Piecewise Functions', subtitle: 'Checking the breaks, and finding a constant' }],
      lines: [
        { say: 'A piecewise function uses different formulas on different intervals, like a taxi fare with one rate in town and another on the highway.', show: 'title' },
        { say: 'In this video, you will check whether the pieces join up, and choose a constant that makes them join.' },
      ],
    },
    {
      chapter: 'Only the breaks matter',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Where to look', md: 'If each piece is continuous, a piecewise function can only be discontinuous where the formula **changes**. There, compare the left-hand limit, the right-hand limit and the value.' },
      ],
      lines: [
        { say: 'Usually each piece is a polynomial or another continuous function. Then, inside each interval, there is nothing to worry about.', show: 'key' },
        { say: 'The only places a break can happen are the points where the formula changes. At each of those, find the left-hand limit from the left piece, the right-hand limit from the right piece, and the value of the function. If all three agree, the function is continuous there.' },
      ],
    },
    {
      chapter: 'Checking a break',
      layout: 'split',
      leftWidth: 480,
      left: [meet],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = \\begin{cases} x^2 + 1, & x < 1 \\\\ 3x - 1, & x \\ge 1 \\end{cases}', 'f(1) = 3(1) - 1 = 2', '\\lim_{x \\to 1^-} f(x) = 1^2 + 1 = 2', '\\lim_{x \\to 1^+} f(x) = 3(1) - 1 = 2'] },
      ],
      lines: [
        { say: 'Is this function continuous at x equals one? For x less than one, it is x squared plus one. For x greater than or equal to one, it is three x minus one.', show: 'm.0', focus: 'm.0' },
        { say: 'First, the value. One belongs to the second piece, because of the "greater than or equal to". So f of one is three times one, minus one, which is two.', show: 'm.1', focus: 'm.1' },
        { say: 'From the left, use the first piece: one squared plus one, which is two. From the right, use the second piece: three times one, minus one, which is also two.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Both one-sided limits equal f of one, so the function is continuous at one. On the graph, the two pieces meet at the point at one, two, with no gap.', show: ['pw.grid', 'pw.axes', 'pw.a', 'pw.b', 'pw.h', 'pw.d'], focus: 'pw.d' },
      ],
    },
    {
      chapter: 'Finding k',
      layout: 'split',
      leftWidth: 480,
      left: [findK],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = \\begin{cases} kx - 1, & x < 2 \\\\ x^2 + 3, & x \\ge 2 \\end{cases}', '\\lim_{x \\to 2^-} f(x) = 2k - 1', 'f(2) = 2^2 + 3 = 7', '2k - 1 = 7 \\ \\Rightarrow \\ k = 4'] },
      ],
      lines: [
        { say: 'Now choose the constant. Find k so that f of x equals k x minus one, for x less than two, and x squared plus three, for x greater than or equal to two, is continuous.', show: 'm.0', focus: 'm.0' },
        { say: 'The right piece gives f of two: two squared plus three, which is seven. That is also the right-hand limit.', show: ['m.2', 'kk.grid', 'kk.axes', 'kk.right', 'kk.d'], focus: ['m.2', 'kk.d'] },
        { say: 'Try k equals two. Then the left piece heads to two times two, minus one, which is three. It misses the point at two, seven, so the graph jumps.', show: ['kk.k2', 'kk.h2'], focus: ['kk.k2', 'kk.h2'] },
        { say: 'In general, the left piece heads to two k minus one as x approaches two from the left.', show: 'm.1', focus: 'm.1' },
        { say: 'For the pieces to meet, set them equal: two k minus one equals seven. So two k is eight, and k is four. With k equals four, the left piece rises right up to the point at two, seven.', show: ['m.3', 'kk.k4'], focus: ['m.3', 'kk.k4'] },
      ],
    },
    {
      chapter: 'Filling a hole',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = \\begin{cases} \\dfrac{x^2 - x - 6}{x - 3}, & x \\ne 3 \\\\ c, & x = 3 \\end{cases}', 'x \\ne 3\\colon \\ \\dfrac{(x - 3)(x + 2)}{x - 3} = x + 2, \\quad \\lim_{x \\to 3} f(x) = 5', 'f(3) = c = 5'] },
      ],
      lines: [
        { say: 'One more. Find c so that this function is continuous at three. For x not equal to three, it is x squared minus x minus six, over x minus three. At x equals three, it is c.', show: 'm.0', focus: 'm.0' },
        { say: 'For x not equal to three, factor and cancel: x minus three, times x plus two, over x minus three, is x plus two. So the limit as x approaches three is five.', show: 'm.1', focus: 'm.1' },
        { say: 'For continuity, f of three must equal the limit. So c equals five. Choosing c fills the hole in the graph with exactly the right point.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $k$ so that $f(x) = \\begin{cases} x + k, & x < 3 \\\\ 2x - 1, & x \\ge 3 \\end{cases}$ is continuous.',
          choices: ['$k = 2$', '$k = 5$', '$k = 8$', '$k = -2$'],
          answer: 0,
          working: 'The left piece approaches $3 + k$; the right piece gives $f(3) = 2(3) - 1 = 5$. So $3 + k = 5$, and $k = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find k so that f of x equals x plus k, for x less than three, and two x minus one, for x greater than or equal to three, is continuous. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The left piece approaches three plus k, and the right piece gives f of three, which is five. Set them equal: three plus k equals five, so k is two. Choice B sets k itself equal to five, but the left piece is three plus k.', show: 'q.answer' },
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
          items: ['With continuous pieces, check only where the formula changes.', 'Compare the left-hand limit, the right-hand limit and the value.', 'To make the function continuous, set the pieces equal at the break and solve for the constant.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When each piece is continuous, check only the points where the formula changes.', show: 'sum.0' },
        { say: 'At each one, compare the left-hand limit, the right-hand limit and the value of the function.', show: 'sum.1' },
        { say: 'And to find a constant that makes the function continuous, set the pieces equal at the break, and solve. In the next part, we see one powerful thing that continuous functions can do. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
