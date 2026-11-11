import type { Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { poly } from './lib/mx-figures.ts';

const f = (x: number) => Math.sqrt(1 + x * x);
const W = 6;
const H = 5;
const g = plane({ x: [0, 2.2], y: [0, 2.5], xStep: 0.5, yStep: 0.5, width: W, height: H, titles: { x: 'x', y: 'y' } });
const sx = W / 2.2;
const sy = H / 2.5;
const strips = [0, 1, 2, 3].map((i) => poly(`s${i}`, [[i * 0.5 * sx, 0], [i * 0.5 * sx, f(i * 0.5) * sy], [(i + 1) * 0.5 * sx, f((i + 1) * 0.5) * sy], [(i + 1) * 0.5 * sx, 0]], 'adj'));

const video: Explainer = {
  id: 'mx-19-3',
  lessonId: 'mx-19-3',
  title: 'The Trapezium Rule',
  thumbnail: 'gr',
  summary: 'The trapezium rule estimates an integral with n strips of width h = (b − a)/n: ½h[y₀ + 2(y₁ + … + yₙ₋₁) + yₙ]. With 4 strips, ∫₀² √(1 + x²) dx ≈ 0.25 × 11.9061 ≈ 2.98. A convex curve gives an overestimate and a concave curve an underestimate; here the true value is 2.958. More strips give a better estimate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Further Calculus and Numerical Methods', title: 'The Trapezium Rule', subtitle: 'Estimating an area' }],
      lines: [
        { say: 'Some integrals, such as the integral from zero to two of the square root of one plus x squared, are hard or impossible to find exactly.', show: 'title' },
        { say: 'Splitting the area into thin trapezia gives a good estimate. In this video, you will use the trapezium rule, and decide whether it gives too much or too little.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'split',
      leftWidth: 540,
      left: [figure('gr', [g, ...strips, plot(g, { id: 'c', f, from: 0, to: 2.1, label: 'y = \\sqrt{1 + x^2}', labelAt: 0.8 })], 440)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Trapezium rule', md: '$n$ strips of width $h = \\dfrac{b - a}{n}$, with $y$-values $y_0$ to $y_n$:' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\int_a^b y\\,dx \\approx \\tfrac{1}{2}h\\big[y_0 + y_n', '+ 2(y_1 + \\cdots + y_{n-1})\\big]'] },
      ],
      lines: [
        { say: 'Here is the curve y equals the square root of one plus x squared, from zero to two. The area under it is the integral we want.', show: ['gr.grid', 'gr.axes', 'gr.c'] },
        { say: 'Split the interval into n strips of equal width h. The top of each strip is replaced by a straight line, making a trapezium.', show: ['gr.s0', 'gr.s1', 'gr.s2', 'gr.s3', 'def'] },
        { say: 'Each trapezium has area a half h times the sum of its two sides. Adding them up, every inner y-value is used twice, and the two end values once.', show: 'f', focus: 'f' },
        { say: 'So the integral is approximately a half h, times the two end values y nought and y n, plus two lots of the middle values.' },
      ],
    },
    {
      chapter: 'Four strips',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$x$', '$0$', '$0.5$', '$1$', '$1.5$', '$2$'], rows: [['$y$', '$1$', '$1.1180$', '$1.4142$', '$1.8028$', '$2.2361$']] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['h = \\tfrac{2 - 0}{4} = 0.5', '\\tfrac{1}{2}(0.5)\\big[1 + 2(1.1180 + 1.4142 + 1.8028) + 2.2361\\big]', '= 0.25 \\times 11.9061 \\approx 2.98'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Count the ordinates', md: '$n$ strips have $n + 1$ $y$-values. Only the first and last are counted once.' },
      ],
      lines: [
        { say: 'Use four strips. The width is two over four, which is zero point five.', show: 'm.0', focus: 'm.0' },
        { say: 'Work out y at zero, zero point five, one, one point five and two. Four strips need five y-values.', show: 't' },
        { say: 'Put them into the rule: a half times zero point five, times one, plus twice the three middle values, plus two point two three six one.', show: 'm.1', focus: 'm.1' },
        { say: 'That is zero point two five times eleven point nine zero six one, so the estimate is two point nine eight to three significant figures.', show: 'm.2', focus: 'm.2' },
        { say: 'n strips always have n plus one y-values. Only the first and last are counted once; every value in between is doubled.', show: 'mis' },
      ],
    },
    {
      chapter: 'Over or under?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['The curve bends', 'Its shape is', 'The rule gives'], rows: [['upwards', 'convex', 'an overestimate'], ['downwards', 'concave', 'an underestimate']] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{True value: } 2.958 < 2.98', '\\text{Percentage error} = \\dfrac{|\\text{estimate} - \\text{exact}|}{\\text{exact}} \\times 100'] },
      ],
      lines: [
        { say: 'When the curve bends upwards, it is convex, and the straight top of each trapezium lies above the curve. So the rule gives an overestimate.', show: 't.0', focus: 't.0' },
        { say: 'When the curve bends downwards, it is concave, and the rule gives an underestimate.', show: 't.1', focus: 't.1' },
        { say: 'Our curve is convex, and indeed the true value is two point nine five eight, a little less than our estimate.', show: 'm.0', focus: 'm.0' },
        { say: 'More strips make the trapezia hug the curve more closely, so the estimate improves. The percentage error is the difference over the exact value, times one hundred.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two strips of width $h = 1$ have $y$-values $2$, $3$ and $6$. Use the trapezium rule to estimate the area.',
          choices: ['$11$', '$5.5$', '$14$', '$7$'],
          answer: 3,
          working: '$\\tfrac{1}{2}(1)\\big[2 + 2(3) + 6\\big] = \\tfrac{1}{2} \\times 14 = 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two strips of width one have y-values two, three and six. Use the trapezium rule to estimate the area. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. A half times one, times two plus twice three plus six, is a half of fourteen, which is seven. Choice A forgets to double the middle value, and choice C forgets the half.', show: 'q.answer' },
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
          items: ['$\\int_a^b y\\,dx \\approx \\tfrac{1}{2}h\\big[y_0 + 2(y_1 + \\cdots + y_{n-1}) + y_n\\big]$.', 'A convex curve gives an overestimate; a concave one an underestimate.', 'More strips give a better estimate.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The trapezium rule is a half h, times the end values plus twice the middle values.', show: 'sum.0' },
        { say: 'A convex curve gives an overestimate, and a concave curve gives an underestimate.', show: 'sum.1' },
        { say: 'And more strips give a better estimate. In the next lesson, we integrate products with integration by parts. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
