import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { piTex } from '@/video/graph.ts';
import { edgeNumbers, guide, piece, plane, spot, tag } from './lib/m31-2-graphs.ts';

// y = sin x on [0, 2π], meeting y = −1/2 at 7π/6 and 11π/6.
const g = plane({ x: [0, 2 * Math.PI], y: [-1.5, 1.5], xStep: Math.PI / 6, yStep: 0.5, every: 0 });
const meet = figure('sg', [
  g,
  edgeNumbers(g, { xs: [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2, 2 * Math.PI], ys: [-1, -0.5, 0, 0.5, 1], xTex: piTex }),
  piece(g, { id: 'sin', f: Math.sin, from: 0, to: 2 * Math.PI }),
  tag(g, 'sin-name', 2.6, 1.15, 'y = \\sin x', 'right', 'brand'),
  guide(g, 'half', [0, -0.5], [2 * Math.PI, -0.5], 'opp', { dashed: false, weight: 3 }),
  tag(g, 'half-name', 0.15, -0.8, 'y = -\\tfrac{1}{2}', 'right', 'opp'),
  spot(g, 'A', (7 * Math.PI) / 6, -0.5, { tex: '\\tfrac{7\\pi}{6}', place: 'below left', tone: 'theta' }),
  spot(g, 'B', (11 * Math.PI) / 6, -0.5, { tex: '\\tfrac{11\\pi}{6}', place: 'below right', tone: 'theta' }),
], 380);

const video: Explainer = {
  id: 'm31-1-2-e',
  lessonId: 'm31-1-2',
  title: 'Trigonometry and Logarithms for Calculus, Part 5: Solving Trigonometric Equations',
  thumbnailTitle: 'Solving Trig Equations',
  thumbnail: 'sg',
  summary: 'Solving trigonometric equations for 0 ≤ x < 2π: isolate or factor, find the reference angle, and use the quadrant signs. 2 sin x + 1 = 0 gives 7π/6 and 11π/6; 2cos²x − cos x − 1 = 0 gives 0, 2π/3 and 4π/3; sin 2x = sin x gives 0, π/3, π and 5π/3; and why dividing by sin x loses solutions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Precalculus Review · Part 5', title: 'Solving Trigonometric Equations', subtitle: 'Every solution from 0 to 2π' }],
      lines: [
        { say: 'A sine or cosine equation usually has more than one solution, because the graphs repeat. In calculus, you will often need all of them in one turn of the circle.', show: 'title' },
        { say: 'In this video, you will solve trigonometric equations, and list every solution from zero up to two pi.' },
      ],
    },
    {
      chapter: 'The method',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Isolate** the trigonometric function, or **factor** the equation.', 'Find the **reference angle** from the size of the value.', 'Use the **quadrant signs** to find every angle with that value.', 'List every solution with $0 \\le x < 2\\pi$.'],
        },
      ],
      lines: [
        { say: 'Here is the method. First, get the sine or cosine by itself. If the equation is a quadratic, factor it.', show: 'b.0' },
        { say: 'Next, find the reference angle from the size of the value, ignoring its sign.', show: 'b.1' },
        { say: 'Then use the signs in each quadrant to find every angle with that value.', show: 'b.2' },
        { say: 'Finally, list every solution from zero up to, but not including, two pi.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A linear equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2\\sin x + 1 = 0', '\\sin x = -\\dfrac{1}{2}', '\\text{reference angle } \\dfrac{\\pi}{6}', 'x = \\pi + \\dfrac{\\pi}{6} = \\dfrac{7\\pi}{6}', 'x = 2\\pi - \\dfrac{\\pi}{6} = \\dfrac{11\\pi}{6}'] }],
      lines: [
        { say: 'Solve two sine x plus one equals zero, for x from zero up to two pi.', show: 'm.0', focus: 'm.0' },
        { say: 'Isolate sine x. Subtract one and divide by two: sine x equals negative one half.', show: 'm.1', focus: 'm.1' },
        { say: 'Ignore the sign for a moment. Sine of pi over six is one half, so the reference angle is pi over six.', show: 'm.2', focus: 'm.2' },
        { say: 'Sine is negative below the x-axis, in quadrants three and four. In quadrant three, the angle is pi plus pi over six, which is seven pi over six.', show: 'm.3', focus: 'm.3' },
        { say: 'In quadrant four, it is two pi minus pi over six, which is eleven pi over six.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'center',
      main: [meet, { kind: 'text', id: 't', size: 'md', md: 'Between $0$ and $2\\pi$, $y = \\sin x$ meets $y = -\\tfrac{1}{2}$ exactly twice.' }],
      lines: [
        { say: 'The graph confirms it. Here is y equals sine x, for one full turn, from zero to two pi.', show: ['sg.grid', 'sg.axes', 'sg.sin', 'sg.sin-name'] },
        { say: 'The solutions of sine x equals negative one half are where the curve meets the horizontal line y equals negative one half.', show: ['sg.half', 'sg.half-name'], focus: 'sg.half' },
        { say: 'They meet exactly twice in one turn: at seven pi over six, and at eleven pi over six. A graph is a good way to check that you have found every solution.', show: ['sg.A', 'sg.B', 't'], focus: ['sg.A', 'sg.B'] },
      ],
    },
    {
      chapter: 'A quadratic equation',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['2\\cos^2 x - \\cos x - 1 = 0', '(2\\cos x + 1)(\\cos x - 1) = 0', '\\cos x = -\\dfrac{1}{2}\\colon \\quad x = \\dfrac{2\\pi}{3},\\ \\dfrac{4\\pi}{3}', '\\cos x = 1\\colon \\quad x = 0', 'x = 0,\\ \\dfrac{2\\pi}{3},\\ \\dfrac{4\\pi}{3}'],
        },
      ],
      lines: [
        { say: 'Solve two cosine squared x, minus cosine x, minus one, equals zero, for x from zero up to two pi.', show: 'm.0', focus: 'm.0' },
        { say: 'This is a quadratic in cosine x. Think of it as two c squared, minus c, minus one, which factors as two c plus one, times c minus one. So it factors as two cosine x plus one, times cosine x minus one.', show: 'm.1', focus: 'm.1' },
        { say: 'Set each factor to zero. The first gives cosine x equals negative one half. The reference angle is pi over three, and cosine is negative in quadrants two and three. So x is two pi over three, or four pi over three.', show: 'm.2', focus: 'm.2' },
        { say: 'The second factor gives cosine x equals one, which happens at x equals zero.', show: 'm.3', focus: 'm.3' },
        { say: 'So there are three solutions: zero, two pi over three, and four pi over three.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Using a double-angle identity',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\sin 2x = \\sin x', '2\\sin x \\cos x - \\sin x = 0', '\\sin x\\,(2\\cos x - 1) = 0', '\\sin x = 0\\colon \\ x = 0,\\ \\pi \\qquad \\cos x = \\dfrac{1}{2}\\colon \\ x = \\dfrac{\\pi}{3},\\ \\dfrac{5\\pi}{3}'],
        },
      ],
      lines: [
        { say: 'Now solve sine of two x equals sine x.', show: 'm.0', focus: 'm.0' },
        { say: 'Replace sine of two x with two sine x cosine x, and move everything to one side: two sine x cosine x, minus sine x, equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Both terms have a factor of sine x. Take it out: sine x, times two cosine x minus one, equals zero.', show: 'm.2', focus: 'm.2' },
        { say: 'Sine x equals zero at zero and pi. And two cosine x minus one equals zero means cosine x is one half, at pi over three and five pi over three.', show: 'm.3', focus: 'm.3' },
        { say: 'So there are four solutions: zero, pi over three, pi, and five pi over three.', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by a variable factor', md: 'Dividing both sides of $2\\sin x \\cos x = \\sin x$ by $\\sin x$ throws away the solutions where $\\sin x = 0$. Move everything to one side and **factor** instead.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{2\\cos x = 1 \\ \\Rightarrow \\ x = \\dfrac{\\pi}{3},\\ \\dfrac{5\\pi}{3} \\quad \\text{(lost } 0 \\text{ and } \\pi)}'] },
      ],
      lines: [
        { say: 'It is tempting to divide both sides of two sine x cosine x equals sine x by sine x. That leaves two cosine x equals one.', show: 'oops' },
        { say: 'But that only gives pi over three and five pi over three. The solutions zero and pi have disappeared.', show: 'm.0', focus: 'm.0' },
        { say: 'They were lost because dividing by sine x quietly assumes sine x is not zero. Never divide by a factor that could be zero. Move everything to one side and factor instead.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $2\\cos x - \\sqrt{3} = 0$ for $0 \\le x < 2\\pi$.',
          choices: ['$x = \\dfrac{\\pi}{6},\\ \\dfrac{5\\pi}{6}$', '$x = \\dfrac{\\pi}{6},\\ \\dfrac{11\\pi}{6}$', '$x = \\dfrac{\\pi}{3},\\ \\dfrac{5\\pi}{3}$', '$x = \\dfrac{5\\pi}{6},\\ \\dfrac{7\\pi}{6}$'],
          answer: 1,
          working: '$\\cos x = \\dfrac{\\sqrt{3}}{2}$, so the reference angle is $\\dfrac{\\pi}{6}$. Cosine is positive in quadrants I and IV: $x = \\dfrac{\\pi}{6}$ and $x = 2\\pi - \\dfrac{\\pi}{6} = \\dfrac{11\\pi}{6}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve two cosine x minus root three equals zero, for x from zero up to two pi. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Cosine x equals root three over two, so the reference angle is pi over six. Cosine is positive in quadrants one and four, so x is pi over six, or eleven pi over six. Choice A uses quadrants one and two, where sine is positive, not cosine.', show: 'q.answer' },
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
          items: ['Isolate or factor, then find the reference angle.', 'Use the quadrant signs to list every solution in $0 \\le x < 2\\pi$.', 'Use an identity to write the equation in one function and one angle.', 'Never divide by a factor that could be zero: factor instead.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To solve a trigonometric equation, isolate the function or factor the equation, then find the reference angle.', show: 'sum.0' },
        { say: 'Use the quadrant signs to list every solution from zero up to two pi.', show: 'sum.1' },
        { say: 'Use an identity when the equation mixes angles, such as two x and x.', show: 'sum.2' },
        { say: 'And never divide by a factor that could be zero. In the next unit, we begin calculus itself, with limits. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
