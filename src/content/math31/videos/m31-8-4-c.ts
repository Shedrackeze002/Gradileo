import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { area, named, numbers, plane, plot, tag } from './lib/m31-8-graphs.ts';

// A test car with v(t) = 6t√(t² + 16) m/s travels 2(125 − 64) = 122 m in the first 3 s.
const v = (t: number) => 6 * t * Math.sqrt(t * t + 16);
const g = named(plane({ x: [0, 3.5], y: [0, 120], xStep: 0.5, yStep: 20, every: 0, width: 5.5, height: 4.5 }), 't', 'v');
const car = figure('car', [
  g,
  numbers(g, 1, 20),
  area(g, { id: 'A', f: v, from: 0, to: 3, tone: 'good', shade: 0.35 }),
  plot(g, { id: 'v', f: v, from: 0, to: 3.5, samples: 160 }),
  tag(g, 'text', 2.15, 25, '122\\text{ m}', 'center', 'ink'),
  tag(g, 'name', 1.4, 60, 'v(t)', 'left', 'brand'),
]);

const video: Explainer = {
  id: 'm31-8-4-c',
  lessonId: 'm31-8-4',
  title: 'Integration by Substitution, Part 3: Definite Integrals and New Limits',
  thumbnailTitle: 'Substitution in Definite Integrals',
  thumbnail: 'car',
  summary: 'In a definite integral, change the limits to u-values along with the integrand, and there is no need to substitute back: ∫₀⁴ x√(x² + 9) dx becomes ½∫₉²⁵ u^(1/2) du = 98/3 ≈ 32.67. Using the x-limits with a function of u gives the wrong answer, 8/3. A test car with v(t) = 6t√(t² + 16) m/s travels 3∫₁₆²⁵ u^(1/2) du = 122 m in the first 3 s.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 3', title: 'Substitution in Definite Integrals', subtitle: 'Change the limits too' }],
      lines: [
        { say: 'Substitution changes the variable from x to u. In a definite integral, the limits belong to x, so they have to change as well.', show: 'title' },
        { say: 'In this video, you will change the limits to u-values, see what goes wrong if you forget, and find how far a test car travels.' },
      ],
    },
    {
      chapter: 'Changing the limits',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\int_0^4 x\\sqrt{x^2 + 9}\\,dx', 'u = x^2 + 9, \\quad du = 2x\\,dx, \\quad x\\,dx = \\tfrac{1}{2}\\,du', 'x = 0 \\Rightarrow u = 9, \\qquad x = 4 \\Rightarrow u = 25', '\\tfrac{1}{2}\\int_{9}^{25} u^{1/2}\\,du = \\tfrac{1}{2}\\cdot\\tfrac{2}{3}\\Big[u^{3/2}\\Big]_{9}^{25} = \\tfrac{1}{3}(125 - 27) = \\dfrac{98}{3} \\approx 32.67'],
        },
      ],
      lines: [
        { say: 'Evaluate the integral from zero to four of x times the square root of x squared plus nine, d x.', show: 'm.0', focus: 'm.0' },
        { say: 'Let u be the inside of the root, x squared plus nine. Then d u is two x d x, so x d x is one half of d u.', show: 'm.1', focus: 'm.1' },
        { say: 'Now change the limits to u-values. When x is zero, u is zero plus nine: nine. When x is four, u is sixteen plus nine: 25.', show: 'm.2', focus: 'm.2' },
        { say: 'The integral becomes one half, times the integral from nine to 25 of u to the one half, d u. The antiderivative of u to the one half is two thirds u to the three halves.', show: 'm.3', focus: 'm.3' },
        { say: '25 to the three halves is five cubed, 125, and nine to the three halves is three cubed, 27. So the answer is one third of 98: ninety-eight thirds, about 32.67. Because the limits changed with the variable, there is no need to substitute back.', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing x-limits and u', md: '$\\tfrac{1}{3}\\Big[u^{3/2}\\Big]_0^4$ puts the $x$-limits into a function of $u$, and gives the wrong answer $\\tfrac{8}{3}$. Either change the limits to $u$-values, or substitute back to $x$ before using the $x$-limits.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\tfrac{1}{3}\\Big[u^{3/2}\\Big]_0^4 = \\tfrac{1}{3}(8 - 0) = \\tfrac{8}{3}}', '\\tfrac{1}{3}\\Big[(x^2 + 9)^{3/2}\\Big]_0^4 = \\tfrac{1}{3}(125 - 27) = \\dfrac{98}{3} \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'A common mistake is to keep the old limits, zero and four, with the new function of u. That gives one third of, four to the three halves minus zero: eight thirds. That is wrong.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The limits zero and four are values of x, not of u. Either change them to u-values, as we did, or substitute back to x first. Put x squared plus nine back in for u, then use zero and four, and you get ninety-eight thirds again.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Distance from a velocity',
      layout: 'split',
      leftWidth: 540,
      left: [car],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\int_0^3 6t\\sqrt{t^2 + 16}\\,dt', 'u = t^2 + 16, \\quad 6t\\,dt = 3\\,du', '\\text{limits: } u = 16 \\text{ to } u = 25', '3\\int_{16}^{25} u^{1/2}\\,du = 2\\Big[u^{3/2}\\Big]_{16}^{25}', '= 2(125 - 64) = 122\\text{ m}'] },
      ],
      lines: [
        { say: 'A test car’s velocity is v of t equals six t times the square root of t squared plus sixteen, metres per second. How far does it travel in the first three seconds?', show: ['car.grid', 'car.axes', 'car.v', 'car.name'] },
        { say: 'The velocity is never negative here, so the distance is the area under the graph: the integral from zero to three of six t, root t squared plus sixteen, d t.', show: ['car.A', 'm.0'], focus: ['car.A', 'm.0'] },
        { say: 'Let u be t squared plus sixteen. Then d u is two t d t, so six t d t is three d u. The limits become sixteen, when t is zero, and 25, when t is three.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Three times the integral of u to the one half is three times two thirds, which is two, times u to the three halves, from sixteen to 25.', show: 'm.3', focus: 'm.3' },
        { say: '25 to the three halves is 125, and sixteen to the three halves is four cubed, 64. So the distance is two times 61: 122 metres.', show: ['m.4', 'car.text'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\displaystyle\\int_0^2 2x(x^2 + 1)^3\\,dx$.',
          choices: ['$4$', '$\\dfrac{625}{4}$', '$156$', '$312$'],
          answer: 2,
          working: '$u = x^2 + 1$, $du = 2x\\,dx$; the limits become $1$ and $5$. $\\int_1^5 u^3\\,du = \\Big[\\dfrac{u^4}{4}\\Big]_1^5 = \\dfrac{625 - 1}{4} = 156$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the integral from zero to two of two x, times x squared plus one, cubed, d x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 156. Let u be x squared plus one, so d u is two x d x. When x is zero, u is one, and when x is two, u is five. The integral from one to five of u cubed is u to the fourth over four: 625 over four, minus one over four, which is 624 over four: 156.', show: 'q.answer' },
        { say: 'Choice A, four, puts the x-limits, zero and two, into the function of u.' },
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
          items: ['In a definite integral, change the limits to $u$-values along with the integrand.', 'Then evaluate in $u$, with no need to substitute back.', 'Never use $x$-limits with a function of $u$.', 'A distance is the integral of a velocity that is never negative.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a definite integral, change the limits to u-values when you change the integrand.', show: 'sum.0' },
        { say: 'Then evaluate in u, with no need to substitute back.', show: 'sum.1' },
        { say: 'Never use x-limits with a function of u.', show: 'sum.2' },
        { say: 'And the distance travelled is the integral of a velocity that is never negative. Next, we use integrals to find areas between curves and the volumes of solids. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
