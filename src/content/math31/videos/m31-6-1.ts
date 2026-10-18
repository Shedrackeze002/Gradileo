import type { Explainer } from '@/video/script.ts';
import type { DiagramItem } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { edgeNumbers, join, num, plane, plot, tangent } from './lib/m31-6-graphs.ts';

// f(x) = x³ − 3x + 1 and its tangent line y = 9x − 15 at (2, 3).
const f = (x: number) => x ** 3 - 3 * x + 1;

/**
 * A window on the curve and its tangent at (2, 3), `half` wide on each side and nine times that
 * tall (the tangent's slope), drawn as a square panel at `x0` with a frame, a faint grid and a
 * caption: zooming in, the curve and its tangent line become indistinguishable.
 */
function zoom(name: string, x0: number, half: number, caption: string): Part {
  const S = 3.6;
  const xs: [number, number] = [2 - half, 2 + half];
  const ys: [number, number] = [3 - 9 * half, 3 + 9 * half];
  const g = plane({ name, x: xs, y: ys, xStep: half / 2, yStep: (9 * half) / 2, every: 0, width: S, height: S, at: [x0 - xs[0] * (S / (2 * half)), -ys[0] * (S / (18 * half))] });
  const grid: Part = { points: g.points, items: g.items.filter((it) => it.group === g.n('grid')) };
  const corners: [string, [number, number]][] = [
    ['c0', [xs[0], ys[0]]],
    ['c1', [xs[1], ys[0]]],
    ['c2', [xs[1], ys[1]]],
    ['c3', [xs[0], ys[1]]],
  ];
  const points: Record<string, [number, number]> = Object.fromEntries(corners.map(([k, [x, y]]) => [`${name}-${k}`, g.map(x, y)]));
  points[`${name}-cap`] = [x0 + S / 2, -0.45];
  const items: DiagramItem[] = [0, 1, 2, 3].map((i) => ({ kind: 'line', id: `${name}-f${i}`, from: `${name}-c${i}`, to: `${name}-c${(i + 1) % 4}`, tone: 'muted', weight: 2, group: `${name}-frame` }));
  items.push({ kind: 'label', id: `${name}-cap`, at: `${name}-cap`, tex: caption, tone: 'ink', place: 'center', group: `${name}-frame` });
  return join([
    grid,
    { points, items },
    plot(g, { id: 'curve', f, samples: 160 }),
    tangent(g, { id: 't', a: 2, y: 3, m: 9, tone: 'opp', dashed: true, dot: '' }),
  ]);
}

const g = plane({ x: [-2.5, 3.2], y: [-4, 8], xStep: 1, yStep: 2, every: 0, width: 5.7, height: 6 });

const video: Explainer = {
  id: 'm31-6-1',
  lessonId: 'm31-6-1',
  title: 'Tangent Lines and Linear Approximation, Part 1: The Tangent Line',
  thumbnailTitle: 'Equation of a Tangent Line',
  thumbnail: 'tl',
  summary: 'Zoom in on a smooth curve and it looks like its tangent line. The tangent line at x = a passes through (a, f(a)) with slope f′(a): y − f(a) = f′(a)(x − a). For f(x) = x³ − 3x + 1 at x = 2 it is y = 9x − 15, and the slope must be the number f′(2), not the formula f′(x).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 1', title: 'The Tangent Line', subtitle: 'A point and a slope' }],
      lines: [
        { say: 'Zoom in far enough on any smooth curve, and it starts to look like a straight line: its tangent line.', show: 'title' },
        { say: 'In this video, you will write the equation of a tangent line, using a point on the curve and a slope from the derivative.' },
      ],
    },
    {
      chapter: 'Zooming in',
      layout: 'center',
      main: [
        figure('z', [zoom('z1', 0, 2, '\\text{zoom} \\times 1'), zoom('z2', 4.6, 0.5, '\\text{zoom} \\times 4'), zoom('z3', 9.2, 0.1, '\\text{zoom} \\times 20')]),
        { kind: 'text', id: 'k', md: 'Close to the point, the curve and its **tangent line** are almost the same.' },
      ],
      lines: [
        { say: 'Here is the curve y equals x cubed, minus three x, plus one, near the point at two, three, with its tangent line dashed in orange.', show: ['z.z1-frame', 'z.z1-grid', 'z.z1-curve', 'z.z1-t-all'] },
        { say: 'Zoom in four times. The curve bends less and less inside the window.', show: ['z.z2-frame', 'z.z2-grid', 'z.z2-curve', 'z.z2-t-all'] },
        { say: 'Zoom in twenty times, and the curve and its tangent line are almost the same line.', show: ['z.z3-frame', 'z.z3-grid', 'z.z3-curve', 'z.z3-t-all'] },
        { say: 'So near the point, the tangent line is the best straight-line picture of the curve. To use it, we need its equation.', show: 'k' },
      ],
    },
    {
      chapter: 'The equation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Tangent line', md: "The tangent line to the graph of $f$ at $x = a$ is the line through the point $\\big(a, f(a)\\big)$ with slope $f'(a)$:" },
        { kind: 'math', id: 'm', size: 'lg', lines: ["y - \\adj{f(a)} = \\opp{f'(a)}(x - \\adj{a})"] },
      ],
      lines: [
        { say: 'A line is fixed by one point and its slope. For the tangent line at x equals "a", the point is "a", f of "a", on the curve.', show: 'def' },
        { say: 'And the derivative, f prime of "a", is the slope of the tangent line there.' },
        { say: 'Put them into point-slope form: y minus f of "a" equals f prime of "a", times x minus "a".', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A cubic',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('tl', [
          g,
          edgeNumbers(g, { xs: [-2, -1, 0, 1, 2, 3], ys: [-4, -2, 0, 2, 4, 6, 8], xTex: num, yTex: num }),
          plot(g, { id: 'f', f, samples: 200 }),
          tangent(g, { id: 't', a: 2, y: 3, m: 9, tone: 'opp', dot: '(2, 3)', place: 'left' }),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['f(x) = x^{3} - 3x + 1', 'f(2) = 8 - 6 + 1 = 3', "f'(x) = 3x^{2} - 3", "m = f'(2) = 12 - 3 = 9", 'y - 3 = 9(x - 2)', 'y = 9x - 15'],
        },
      ],
      lines: [
        { say: 'Find an equation of the tangent line to f of x equals x cubed, minus three x, plus one, at x equals two.', show: ['tl.grid', 'tl.axes', 'tl.f', 'm.0'] },
        { say: 'First, the point. f of two is eight, minus six, plus one, which is three. So the line passes through the point at two, three.', show: 'm.1', focus: 'm.1' },
        { say: 'Next, the slope. f prime of x is three x squared minus three, so f prime of two is twelve minus three: nine.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'In point-slope form: y minus three equals nine times x minus two.', show: ['m.4', 'tl.t-all'], focus: ['m.4', 'tl.t'] },
        { say: 'Expand and solve for y: y equals nine x minus fifteen. On the graph, the line touches the curve at the point at two, three, and climbs steeply, with slope nine.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: "Using f′(x) instead of f′(a)", md: "The slope of a tangent line is a **number**, $f'(a)$. Evaluate the derivative at the point first." },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{y - 3 = (3x^{2} - 3)(x - 2)} \\quad \\text{a curve, not a line}', '\\good{y - 3 = 9(x - 2)} \\quad \\text{the tangent line}'] },
      ],
      lines: [
        { say: 'Watch out for a common mistake: putting the formula f prime of x into the equation, instead of the number f prime of "a".', show: 'oops' },
        { say: 'Writing y minus three equals three x squared minus three, times x minus two, gives a cubic: a curve, not a line.', show: 'm.0', focus: 'm.0' },
        { say: 'The slope of a tangent line is one number. Evaluate the derivative at the point first, here nine, and then write the line.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find an equation of the tangent line to $f(x) = x^{2} + 3x$ at $x = 1$.',
          choices: ['$y = 5x + 4$', '$y = 4x$', '$y = 5x - 1$', '$y = (2x + 3)(x - 1) + 4$'],
          answer: 2,
          working: "$f(1) = 4$ and $f'(x) = 2x + 3$, so $f'(1) = 5$. Then $y - 4 = 5(x - 1)$, so $y = 5x - 1$.",
        },
      ],
      lines: [
        { say: 'Your turn. Find an equation of the tangent line to f of x equals x squared plus three x, at x equals one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. f of one is four, so the point is one, four. f prime of x is two x plus three, so the slope is five.', show: 'q.answer' },
        { say: 'Then y minus four equals five times x minus one, which is y equals five x minus one. Choice D uses the formula f prime of x instead of the number f prime of one, so it is a curve, not a line.' },
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
          items: ['Near a point, a smooth curve looks like its tangent line.', "The tangent line at $x = a$: $y - f(a) = f'(a)(x - a)$.", "The slope is the number $f'(a)$: evaluate before you write the line."],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Near a point, a smooth curve looks like its tangent line.', show: 'sum.0' },
        { say: 'The tangent line at x equals "a" goes through the point "a", f of "a", with slope f prime of "a": y minus f of "a" equals f prime of "a", times x minus "a".', show: 'sum.1' },
        { say: 'And the slope is a number: evaluate the derivative before you write the line. In the next part, we find the line perpendicular to the tangent: the normal line. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
