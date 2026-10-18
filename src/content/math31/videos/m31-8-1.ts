import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numbers, plane, plot, tangent } from './lib/m31-8-graphs.ts';

// The antiderivatives of 2x: y = x² + C for C = 2, 0 and −2, each with slope 2 at x = 1.
const g = plane({ x: [-3, 3], y: [-3, 9], xStep: 1, yStep: 1, every: 0, width: 6, height: 6 });
const family = figure('fam', [
  g,
  numbers(g, 1, 3),
  plot(g, { id: 'c2', f: (x) => x * x + 2, tone: 'good', samples: 160 }),
  plot(g, { id: 'c0', f: (x) => x * x, tone: 'brand', samples: 160 }),
  plot(g, { id: 'cm2', f: (x) => x * x - 2, tone: 'opp', samples: 160 }),
  tangent(g, { id: 't2', x: 1, y: 3, m: 2, len: 1.1, group: 'slopes' }),
  tangent(g, { id: 't0', x: 1, y: 1, m: 2, len: 1.1, group: 'slopes' }),
  tangent(g, { id: 'tm2', x: 1, y: -1, m: 2, len: 1.1, group: 'slopes' }),
]);

const video: Explainer = {
  id: 'm31-8-1',
  lessonId: 'm31-8-1',
  title: 'Antiderivatives, Part 1: Undoing a Derivative',
  thumbnailTitle: 'Undoing a Derivative',
  thumbnail: 'fam',
  summary: 'F is an antiderivative of f when F′ = f: x² is an antiderivative of 2x, and so are x² + 5 and x² − 3. Every antiderivative of f is F(x) + C, written as the indefinite integral ∫ f(x) dx = F(x) + C; on a graph, the antiderivatives are vertical shifts of one another, with the same slope at every x. Check any antiderivative by differentiating it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 1', title: 'Undoing a Derivative', subtitle: 'Antiderivatives and the constant C' }],
      lines: [
        { say: 'A physicist who knows a rocket’s velocity at every instant wants its position. An economist who knows the marginal cost wants the total cost.', show: 'title' },
        { say: 'Both need to run differentiation backwards. That reverse process is called antidifferentiation, and it is the first step toward integrals.' },
        { say: 'In this video, you will learn what an antiderivative is, why every one comes with a constant, C, and how to check your answer.' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{d}{dx}\\left(x^2\\right) = 2x', '\\dfrac{d}{dx}\\left(x^2 + 5\\right) = 2x', '\\dfrac{d}{dx}\\left(x^2 - 3\\right) = 2x'] },
        { kind: 'text', id: 't', size: 'md', md: '$x^2$, $x^2 + 5$ and $x^2 - 3$ are all **antiderivatives** of $2x$.' },
      ],
      lines: [
        { say: 'Differentiating asks: given a function, what is its derivative? Antidifferentiating asks the reverse: given a derivative, what function did it come from?' },
        { say: 'For example, which function has derivative two x? You know that the derivative of x squared is two x. So x squared is an antiderivative of two x.', show: 'm.0', focus: 'm.0' },
        { say: 'But it is not the only one. The derivative of x squared plus five is also two x, because the derivative of a constant is zero.', show: 'm.1', focus: 'm.1' },
        { say: 'The same goes for x squared minus three, or x squared plus any constant at all. Adding a constant does not change the derivative.', show: ['m.2', 't'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Antiderivatives',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Antiderivative and constant of integration', md: '$F$ is an **antiderivative** of $f$ if $F\'(x) = f(x)$. Every antiderivative of $f$ has the form $F(x) + C$, where $C$ is the **constant of integration**. The general antiderivative is the **indefinite integral**:' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\int f(x)\\,dx = F(x) + C', '\\int 2x\\,dx = x^2 + C'] },
      ],
      lines: [
        { say: 'Here is the definition. A function F is an antiderivative of f if F prime of x equals f of x.', show: 'def' },
        { say: 'If F is one antiderivative, then every antiderivative has the form F of x, plus C, where C is a constant, called the constant of integration.', focus: 'def' },
        { say: 'All of them together are written with a new symbol: the integral of f of x, d x, equals F of x, plus C. This is called an indefinite integral.', show: 'm.0', focus: 'm.0' },
        { say: 'The tall S shape is the integral sign. The function inside, f of x, is called the integrand. And d x says that x is the variable.', focus: 'm.0' },
        { say: 'So the integral of two x, d x, equals x squared, plus C. The plus C stands for every one of the antiderivatives at once.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A family of curves',
      layout: 'split',
      leftWidth: 560,
      left: [family],
      right: [
        { kind: 'text', id: 't', size: 'md', align: 'left', md: 'The antiderivatives of $2x$ are $y = x^2 + C$, here with [[good:C = 2]], [[brand:C = 0]] and [[opp:C = −2]]: copies of one curve, shifted up or down.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["G' = f \\text{ and } F' = f", "(G - F)' = 0", 'G - F = C'] },
      ],
      lines: [
        { say: 'On a graph, the antiderivatives of two x are the curves y equals x squared plus C. Here are three of them: C equals two, zero, and negative two.', show: ['fam.grid', 'fam.axes', 'fam.c2', 'fam.c0', 'fam.cm2', 't'] },
        { say: 'Each one is the same curve, shifted up or down. So at any value of x, they all have the same slope. At x equals one, each has slope two, because each has derivative two x.', show: 'fam.slopes', focus: 'fam.slopes' },
        { say: 'Why must every antiderivative look like this? Suppose G is another antiderivative of f. Then G prime and F prime are both f, so the derivative of G minus F is zero.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'A function whose derivative is zero everywhere on an interval never rises or falls, so it is a constant. That follows from the mean value theorem. So G is F plus a constant.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Always check',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Always check', md: 'You can check any antiderivative by differentiating it. If you get the integrand back, the answer is right.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\int 3x^2\\,dx = x^3 + C \\qquad \\dfrac{d}{dx}\\left(x^3 + C\\right) = 3x^2 \\;\\good{\\checkmark}', '\\int \\cos x\\,dx = \\sin x + C \\qquad \\dfrac{d}{dx}\\left(\\sin x + C\\right) = \\cos x \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Antiderivatives come with a built-in check. Differentiate your answer. If you get the integrand back, the answer is right.', show: 'tip' },
        { say: 'For example, the integral of three x squared, d x, is x cubed, plus C. Check: the derivative of x cubed plus C is three x squared. That is the integrand, so the answer is right.', show: 'm.0', focus: 'm.0' },
        { say: 'And the integral of cosine x, d x, is sine x, plus C, because the derivative of sine x is cosine x.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which function is an antiderivative of $3x^2$?',
          choices: ['$6x$', '$x^3 + 3x$', '$3x^3$', '$x^3 - 7$'],
          answer: 3,
          working: '$\\dfrac{d}{dx}\\left(x^3 - 7\\right) = 3x^2$. The others differentiate to $6$, $3x^2 + 3$ and $9x^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which function is an antiderivative of three x squared? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Differentiate x cubed minus seven: three x squared, minus zero. That is three x squared, so it is an antiderivative. The minus seven is just one choice of C.', show: 'q.answer' },
        { say: 'Choice A, six x, is the derivative of three x squared, not an antiderivative. Differentiating went the wrong way.' },
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
          items: ["$F$ is an antiderivative of $f$ when $F' = f$.", 'Every antiderivative of $f$ is $F(x) + C$: $\\int f(x)\\,dx = F(x) + C$.', 'On a graph, they are vertical shifts of one another.', 'Check an antiderivative by differentiating it.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. F is an antiderivative of f when F prime equals f.', show: 'sum.0' },
        { say: 'Every antiderivative of f has the form F of x plus C, which we write as the integral of f of x, d x.', show: 'sum.1' },
        { say: 'On a graph, the antiderivatives are vertical shifts of one another, with the same slope at every x.', show: 'sum.2' },
        { say: 'And you can always check an antiderivative by differentiating it. In the next part, we run the power rule backwards. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
