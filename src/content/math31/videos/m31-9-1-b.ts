import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { area, dots, guide, numbers, plane, plot, strip, tag } from './lib/m31-8-graphs.ts';

// The region enclosed by y = x² and y = 2x + 3: they meet at x = −1 and x = 3, and the area is 32/3.
const para = (x: number) => x * x;
const line = (x: number) => 2 * x + 3;
const g = plane({ x: [-2, 4], y: [-1, 11], xStep: 1, yStep: 1, every: 0, width: 6, height: 5.5 });
const enclosed = figure('enc', [
  g,
  numbers(g, 1, 2),
  area(g, { id: 'A', f: line, lower: para, from: -1, to: 3, tone: 'brand', shade: 0.3 }),
  strip(g, { id: 's', x: 0.94, w: 0.12, top: line, bottom: para, tone: 'theta' }),
  guide(g, 'gP', [-1, 1], [-1, 0], 'theta', { group: 'drop' }),
  guide(g, 'gQ', [3, 9], [3, 0], 'theta', { group: 'drop' }),
  plot(g, { id: 'p', f: para, tone: 'opp', samples: 160 }),
  plot(g, { id: 'l', f: line, samples: 40 }),
  tag(g, 'pn', 2.15, 1.6, 'y = x^2', 'center', 'opp'),
  tag(g, 'ln', 2.55, 8.6, 'y = 2x + 3', 'left', 'brand'),
  dots(g, [
    { id: 'P', x: -1, y: 1, tex: '', tone: 'theta', group: 'meet' },
    { id: 'Q', x: 3, y: 9, tex: '', tone: 'theta', group: 'meet' },
  ]),
]);

const video: Explainer = {
  id: 'm31-9-1-b',
  lessonId: 'm31-9-1',
  title: 'Area Between Curves, Part 2: Finding the Limits',
  thumbnailTitle: 'Finding Where Curves Meet',
  thumbnail: 'enc',
  summary: 'When two curves enclose a region by themselves, the limits of integration are the x-coordinates of the points where they meet. y = x² and y = 2x + 3 meet where x² − 2x − 3 = 0, at x = −1 and x = 3; testing x = 0 shows the line is on top, and A = ∫₋₁³ (2x + 3 − x²) dx = 32/3 ≈ 10.67. The limits are x-values, not points, and a negative area means upper and lower were swapped.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Integrals · Part 2', title: 'Finding Where Curves Meet', subtitle: 'The limits of an enclosed region' }],
      lines: [
        { say: 'Often a region is enclosed by two curves alone, with no vertical lines to mark where it starts and ends. Then the curves themselves tell you.', show: 'title' },
        { say: 'In this video, you will find the limits of integration from the points where two curves meet, decide which curve is on top, and find the area.' },
      ],
    },
    {
      chapter: 'Where the curves meet',
      layout: 'split',
      leftWidth: 560,
      left: [enclosed],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x^2 = 2x + 3', 'x^2 - 2x - 3 = 0', '(x + 1)(x - 3) = 0', 'x = -1 \\quad \\text{or} \\quad x = 3'] },
      ],
      lines: [
        { say: 'Find the area of the region enclosed by the parabola y equals x squared, and the line y equals two x plus three.', show: ['enc.grid', 'enc.axes', 'enc.p', 'enc.l', 'enc.pn', 'enc.ln'] },
        { say: 'The region is the piece trapped between them. It starts where the curves meet on the left, and ends where they meet on the right.', show: 'enc.A', focus: 'enc.A' },
        { say: 'To find those points, set the curves equal: x squared equals two x plus three. Move everything to one side: x squared minus two x minus three equals zero.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Factor: x plus one, times x minus three, equals zero. So the curves meet at x equals negative one, and at x equals three. These are the limits of integration.', show: ['m.2', 'm.3', 'enc.meet', 'enc.drop'], focus: ['m.3', 'enc.drop'] },
      ],
    },
    {
      chapter: 'Which is on top?',
      layout: 'split',
      leftWidth: 560,
      left: [enclosed],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 0\\colon \\quad \\text{line } 3, \\;\\; \\text{parabola } 0', '\\text{the line is on top}', '\\text{height} = (2x + 3) - x^2'] },
      ],
      lines: [
        { say: 'Between the two meeting points, one curve stays on top. To find out which, test any point between them. Zero is easy.', show: ['enc', 'm.0'], focus: 'm.0' },
        { say: 'At x equals zero, the line gives two times zero plus three, which is three. The parabola gives zero. So the line is on top.', show: 'm.1', focus: 'm.1' },
        { say: 'A strip at x has height, two x plus three, minus x squared.', show: 'm.2', focus: ['enc.s', 'm.2'] },
      ],
    },
    {
      chapter: 'The area',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['A = \\int_{-1}^{3} (2x + 3 - x^2)\\,dx = \\Big[x^2 + 3x - \\dfrac{x^3}{3}\\Big]_{-1}^{3}', 'x = 3\\colon \\quad 9 + 9 - 9 = 9', 'x = -1\\colon \\quad 1 - 3 + \\dfrac{1}{3} = -\\dfrac{5}{3}', 'A = 9 - \\left(-\\dfrac{5}{3}\\right) = \\dfrac{32}{3} \\approx 10.67'],
        },
      ],
      lines: [
        { say: 'So the area is the integral from negative one to three of, two x plus three, minus x squared. An antiderivative is x squared, plus three x, minus x cubed over three.', show: 'm.0', focus: 'm.0' },
        { say: 'At three: nine, plus nine, minus 27 over three, which is nine. Altogether, nine.', show: 'm.1', focus: 'm.1' },
        { say: 'At negative one: one, minus three, minus negative one third, which is plus one third. That is negative five thirds.', show: 'm.2', focus: 'm.2' },
        { say: 'Subtract, with brackets: nine minus, negative five thirds, is nine plus five thirds: thirty-two thirds, about 10.67 square units.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'x-values, not points', md: 'The curves meet at $(-1, 1)$ and $(3, 9)$, and the limits are the $x$-coordinates $-1$ and $3$, **not** $1$ and $9$. And if an area comes out negative, upper and lower were subtracted the wrong way round.' }],
      lines: [
        { say: 'Two mistakes to watch for. The curves meet at negative one, one, and at three, nine. The limits are the x-coordinates, negative one and three. The y-values, one and nine, are not limits at all.', show: 'oops' },
        { say: 'And an area can never be negative. If yours comes out negative, you subtracted the upper curve from the lower one. Swap them, and the sign comes right.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the area of the region enclosed by $y = x^2$ and $y = x + 2$.',
          choices: ['$-\\dfrac{15}{2}$', '$\\dfrac{9}{2}$', '$-\\dfrac{9}{2}$', '$\\dfrac{10}{3}$'],
          answer: 1,
          working: '$x^2 = x + 2$ gives $x = -1$ or $x = 2$, and the line is on top: $\\int_{-1}^{2} (x + 2 - x^2)\\,dx = \\dfrac{10}{3} - \\left(-\\dfrac{7}{6}\\right) = \\dfrac{9}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the area of the region enclosed by y equals x squared and y equals x plus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, nine halves. Setting x squared equal to x plus two gives x squared minus x minus two equals zero, so x is negative one or two. At zero, the line is on top. The integral from negative one to two of, x plus two minus x squared, is ten thirds plus seven sixths: nine halves.', show: 'q.answer' },
        { say: 'Choice C is the same size but negative: it subtracts the line from the parabola, lower minus upper.' },
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
          items: ['For an enclosed region, solve $f(x) = g(x)$ to find the limits.', 'The limits are $x$-values, not points.', 'Test a point between the limits to see which curve is on top.', 'A negative area means upper and lower were swapped.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a region enclosed by two curves, set them equal to find where they meet.', show: 'sum.0' },
        { say: 'The limits are the x-values of those points, not the points themselves.', show: 'sum.1' },
        { say: 'Test a point between the limits to see which curve is on top.', show: 'sum.2' },
        { say: 'And a negative area means upper and lower were swapped. In the next part, the curves cross, and the upper curve changes. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
