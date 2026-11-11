import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const f = (x: number) => x ** 3 - 2 * x - 5;
const g = plane({ x: [1, 3.5], y: [-5, 20], xStep: 0.5, yStep: 5, width: 6, height: 5.4, titles: { x: 'x', y: 'y' } });
const g2 = plane({ x: [1, 3.5], y: [-5, 20], xStep: 1, yStep: 5, width: 6, height: 5.4, titles: { x: 'x', y: 'y' } });
const x0 = 3;
const x1 = x0 - f(x0) / (3 * x0 * x0 - 2);

const video: Explainer = {
  id: 'mx-19-2',
  lessonId: 'mx-19-2',
  title: 'Locating Roots and the Newton–Raphson Method',
  thumbnail: 'gr',
  summary: 'If f is continuous and f(a) and f(b) have different signs, f(x) = 0 has a root between a and b: x³ − 2x − 5 is −1 at 2 and 16 at 3. Asymptotes and repeated roots can mislead. The Newton–Raphson method follows tangents to the x-axis: xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ), so from x₀ = 2 we get 2.1 and then about 2.0946.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Pure: Further Calculus and Numerical Methods', title: 'Locating Roots', subtitle: 'and the Newton–Raphson method' }],
      lines: [
        { say: 'Most equations, such as x cubed minus two x minus five equals zero, cannot be solved exactly.', show: 'title' },
        { say: 'Numerical methods first trap a root in a small interval, then close in on it. In this video, you will learn both steps.' },
      ],
    },
    {
      chapter: 'Change of sign',
      layout: 'split',
      leftWidth: 520,
      left: [figure('gr', [g, plot(g, { id: 'f', f, from: 1, to: 3.25, label: 'y = f(x)', labelAt: 0.95 }), dots(g, [{ id: 'a', x: 2, y: -1, tex: '(2, -1)', place: 'above left' }, { id: 'b', x: 3, y: 16, tex: '(3, 16)', place: 'left' }])], 440)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Change of sign', md: 'If $f$ is **continuous** on $[a, b]$ and $f(a)$, $f(b)$ have different signs, then $f(x) = 0$ has a root between $a$ and $b$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['f(2) = 8 - 4 - 5 = {-1}', 'f(3) = 27 - 6 - 5 = 16'] },
      ],
      lines: [
        { say: 'If a function is continuous on an interval, and its values at the two ends have different signs, then its graph must cross the x-axis in between. So there is a root there.', show: 'def' },
        { say: 'Show that x cubed minus two x minus five equals zero has a root between two and three. f of two is negative one, and f of three is sixteen.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.a', 'gr.b', 'm'] },
        { say: 'There is a change of sign, and f is a polynomial, so it is continuous. So there is a root between two and three.', focus: ['gr.a', 'gr.b'] },
        { say: 'Continuity matters: one over x minus two changes sign between one and three because of an asymptote, not a root. And a repeated root, where the graph just touches the axis, gives no change of sign at all.' },
      ],
    },
    {
      chapter: 'Newton–Raphson',
      layout: 'split',
      leftWidth: 520,
      left: [figure('nr', [g2, plot(g2, { id: 'f', f, from: 1, to: 3.25 }), plot(g2, { id: 't', f: (x) => f(x0) + 25 * (x - x0), from: x1 - 0.1, to: 3.15, tone: 'theta', dashed: true }), dots(g2, [{ id: 'p0', x: x0, y: 0, tex: 'x_0', place: 'above right' }, { id: 'q0', x: x0, y: f(x0), tone: 'theta' }, { id: 'p1', x: x1, y: 0, tex: 'x_1', place: 'below' }])], 440)],
      right: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['f\'(x) = 3x^2 - 2', 'x_1 = 2 - \\tfrac{-1}{10} = 2.1', 'x_2 = 2.1 - \\tfrac{0.061}{11.23} \\approx 2.0946'] },
      ],
      lines: [
        { say: 'Now close in. Start at a value x nought near the root, and draw the tangent to the curve there.', show: ['nr.grid', 'nr.axes', 'nr.f', 'nr.p0', 'nr.q0', 'nr.t'] },
        { say: 'Follow the tangent down to the x-axis. Where it lands, x one, is usually much closer to the root. Repeat from there.', show: 'nr.p1', focus: 'nr.p1' },
        { say: 'The tangent has gradient f dash of x n, so it meets the axis at x n minus f of x n over f dash of x n. That is the Newton–Raphson formula.', show: 'f', focus: 'f' },
        { say: 'For our function, f dash of x is three x squared minus two. Starting from two, x one is two minus negative one over ten, which is two point one.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Then x two is about two point zero nine four six. On a calculator, type the formula once with the answer key and keep pressing equals. The method fails if f dash is zero, because the tangent is then flat.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use one step of the Newton–Raphson method on $f(x) = x^2 - 3$, starting from $x_0 = 2$. Find $x_1$.',
          choices: ['$2.25$', '$1.5$', '$1.75$', '$1.732$'],
          answer: 2,
          working: '$f(2) = 1$ and $f\'(2) = 4$, so $x_1 = 2 - \\tfrac{1}{4} = 1.75$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use one step of the Newton–Raphson method on x squared minus three, starting from x nought equals two. Find x one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. f of two is one, and f dash of two is four, so x one is two minus one quarter, which is one point seven five. Choice A adds instead of subtracting, and choice D is the root itself.', show: 'q.answer' },
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
          items: ['A continuous $f$ that changes sign between $a$ and $b$ has a root between them.', 'Asymptotes and repeated roots can mislead.', 'Newton–Raphson: $x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A continuous function that changes sign between two values has a root between them.', show: 'sum.0' },
        { say: 'But asymptotes and repeated roots can mislead.', show: 'sum.1' },
        { say: 'And the Newton–Raphson method follows tangents to close in on a root. In the next lesson, we estimate areas with the trapezium rule. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
