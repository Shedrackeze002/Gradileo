import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, edgeNumbers, note, num, plane, plot, tangent } from './lib/m31-6-graphs.ts';

// f(x) = x³ − 3x² − 9x + 2, with horizontal tangents at its critical numbers −1 and 3.
const f = (x: number) => x ** 3 - 3 * x * x - 9 * x + 2;
const g = plane({ x: [-3, 5], y: [-35, 15], xStep: 1, yStep: 5, every: 0, width: 5.4, height: 6.4 });

// g(x) = x^(2/3), with a sharp point (a cusp) at the origin.
const c = plane({ x: [-3.2, 3.2], y: [-0.6, 2.6], xStep: 1, yStep: 1, every: 0, width: 6.4, height: 3.2 });

const video: Explainer = {
  id: 'm31-6-2-b',
  lessonId: 'm31-6-2',
  title: 'Increasing, Decreasing and Extreme Values, Part 2: Critical Numbers',
  thumbnailTitle: 'Critical Numbers',
  thumbnail: 'cn',
  summary: 'A critical number of f is a number c in the domain of f where f′(c) = 0 or f′(c) does not exist. f(x) = x³ − 3x² − 9x + 2 has critical numbers −1 and 3; x^(2/3) has the critical number 0, at a sharp point; and 0 is not a critical number of 1/x, because it is not in the domain.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 2', title: 'Critical Numbers', subtitle: 'Where the derivative can change sign' }],
      lines: [
        { say: 'A derivative can only switch from positive to negative by passing through zero, or by jumping across a point where it does not exist.', show: 'title' },
        { say: 'Those points split the number line into the intervals where a function rises or falls. In this video, you will find them: the critical numbers.' },
      ],
    },
    {
      chapter: 'Critical numbers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Critical number', md: "A **critical number** of $f$ is a number $c$ **in the domain of $f$** where $f'(c) = 0$ or $f'(c)$ does not exist." },
        { kind: 'bullets', id: 'b', items: ["$f'(c) = 0$: a horizontal tangent.", "$f'(c)$ does not exist: a sharp point, or a vertical tangent.", 'Between critical numbers, $f\'$ keeps the same sign.'] },
      ],
      lines: [
        { say: 'A critical number of f is a number c, in the domain of f, where f prime of c is zero, or where f prime of c does not exist.', show: 'def' },
        { say: 'Where f prime is zero, the graph has a horizontal tangent line.', show: 'b.0' },
        { say: 'Where f prime does not exist, the graph might have a sharp point, or a vertical tangent.', show: 'b.1' },
        { say: 'Between the critical numbers, the derivative cannot change sign, so on each interval the function is either always rising or always falling.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A polynomial',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('cn', [
          g,
          edgeNumbers(g, { xs: [-2, 0, 2, 4], ys: [-30, -20, -10, 0, 10], xTex: num, yTex: num }),
          plot(g, { id: 'f', f, samples: 200 }),
          tangent(g, { id: 't0', a: -1, y: 7, m: 0, left: 1, right: 1, tone: 'theta', dot: '' }),
          tangent(g, { id: 't1', a: 3, y: -25, m: 0, left: 1, right: 1, tone: 'theta', dot: '' }),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['f(x) = x^{3} - 3x^{2} - 9x + 2', "f'(x) = 3x^{2} - 6x - 9", '= 3(x^{2} - 2x - 3)', '= 3(x + 1)(x - 3)', 'x = -1 \\text{ or } x = 3'],
        },
      ],
      lines: [
        { say: 'Find the critical numbers of f of x equals x cubed, minus three x squared, minus nine x, plus two.', show: ['cn.grid', 'cn.axes', 'cn.f', 'm.0'] },
        { say: 'The derivative is three x squared, minus six x, minus nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Factor out three, then factor the quadratic: three times x plus one, times x minus three.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'So f prime is zero at x equals negative one and x equals three. A polynomial’s derivative exists everywhere, so there are no other critical numbers. On the graph, both have horizontal tangents.', show: ['m.4', 'cn.t0-all', 'cn.t1-all'], focus: ['m.4', 'cn.t0', 'cn.t1'] },
      ],
    },
    {
      chapter: 'A sharp point',
      layout: 'center',
      main: [
        figure('cu', [
          c,
          edgeNumbers(c, { xs: [-3, -2, -1, 0, 1, 2, 3], ys: [0, 1, 2], xTex: num, yTex: num }),
          plot(c, { id: 'f', f: (x) => Math.cbrt(x * x), samples: 400 }),
          note(c, { id: 'f-t', x: 2.3, y: 0.5, tex: 'y = x^{2/3}', tone: 'brand' }),
          dots(c, [{ id: 'O', x: 0, y: 0, tex: '', tone: 'theta' }]),
        ]),
        { kind: 'math', id: 'm', size: 'md', lines: ["g'(x) = \\tfrac{2}{3}x^{-1/3} = \\frac{2}{3\\sqrt[3]{x}} \\qquad g'(0) \\text{ does not exist, but } g(0) = 0"] },
      ],
      lines: [
        { say: 'Now find the critical numbers of g of x equals x to the power two thirds.', show: ['cu.grid', 'cu.axes', 'cu.f', 'cu.f-t'] },
        { say: 'By the power rule, g prime of x is two thirds times x to the power negative one third, which is two over three times the cube root of x. The top is two, so it is never zero.', show: 'm.0', focus: 'm.0' },
        { say: 'But at x equals zero, the bottom is zero, so g prime of zero does not exist. And g of zero is zero, so zero is in the domain.', show: 'cu.O', focus: 'cu.O' },
        { say: 'So zero is the only critical number. On the graph, there is a sharp point there, called a cusp, where the curve has no single tangent line.', focus: 'cu.f' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Values outside the domain', md: "For $h(x) = \\dfrac{1}{x}$, $h'(x) = -\\dfrac{1}{x^{2}}$ does not exist at $x = 0$, but $0$ is **not** a critical number, because $h(0)$ is undefined." },
        { kind: 'math', id: 'm', size: 'md', lines: ["h'(0)\\ \\text{does not exist} \\quad\\text{and}\\quad h(0)\\ \\text{is undefined} \\ \\Rightarrow\\ \\text{not critical}"] },
      ],
      lines: [
        { say: 'Watch out for values outside the domain. For h of x equals one over x, the derivative is negative one over x squared, which does not exist at x equals zero.', show: 'oops' },
        { say: 'But h of zero is undefined too: zero is not in the domain of h. So zero is not a critical number. The graph has an asymptote there, not a point.', show: 'm.0', focus: 'm.0' },
        { say: 'Always check that each candidate is in the domain of the original function.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the critical numbers of $f(x) = x^{3} - 12x + 5$.',
          choices: ['$-2$ and $2$', '$2$ only', '$-2\\sqrt{3}$ and $2\\sqrt{3}$', '$0$ and $12$'],
          answer: 0,
          working: "$f'(x) = 3x^{2} - 12 = 3(x^{2} - 4) = 3(x + 2)(x - 2)$, which is $0$ at $x = \\pm 2$ and exists everywhere.",
        },
      ],
      lines: [
        { say: 'Your turn. Find the critical numbers of f of x equals x cubed, minus twelve x, plus five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. f prime of x is three x squared minus twelve, which is three times x squared minus four. That is zero when x is two or negative two, and the derivative exists everywhere. Choice B forgets the negative square root.', show: 'q.answer' },
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
          items: ["Critical numbers: values in the domain where $f'(c) = 0$ or $f'(c)$ does not exist.", "Solve $f'(x) = 0$, and look for where $f'$ is undefined.", 'Check that each candidate is in the domain of $f$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A critical number is a value in the domain of f where the derivative is zero, or does not exist.', show: 'sum.0' },
        { say: 'To find them, solve f prime of x equals zero, and look for where f prime is undefined.', show: 'sum.1' },
        { say: 'And check that each candidate is in the domain. In the next part, we use the critical numbers to find the hills and valleys of a graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
