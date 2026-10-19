import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-5-3-c',
  lessonId: 'm31-5-3',
  title: 'Implicit Differentiation and Higher Derivatives, Part 3: Higher Derivatives',
  thumbnailTitle: 'Higher Derivatives',
  thumbnail: false,
  summary: 'The second derivative f″(x), or d²y/dx², is the derivative of the derivative, and differentiating again gives f‴ and f⁽ⁿ⁾. All the derivatives of x⁴ − 3x² + 5x, acceleration as the second derivative of position for s(t) = t³ − 6t² + 9t, and simplifying y′ = (x + 1)eˣ before finding y″ = (x + 2)eˣ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Transcendental Functions and Implicit Differentiation · Part 3', title: 'Higher Derivatives', subtitle: 'Differentiating again and again' }],
      lines: [
        { say: 'The derivative of a function is a function too. So it has a derivative of its own.', show: 'title' },
        { say: 'In this video, you will find second, third and higher derivatives, see what the second derivative of position means, and learn a habit that makes them quicker.' },
      ],
    },
    {
      chapter: 'The second derivative',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Higher derivatives',
          md: "The **second derivative** is $f''(x) = \\dfrac{d}{dx}f'(x)$, also written $\\dfrac{d^{2}y}{dx^{2}}$. Differentiating again gives the third derivative $f'''(x)$, and so on, up to the derivative of order $n$, $f^{(n)}(x)$.",
        },
        { kind: 'math', id: 'm', size: 'md', lines: ["f \\ \\to\\ f' \\ \\to\\ f'' \\ \\to\\ f''' \\ \\to\\ f^{(4)} \\ \\to\\ \\cdots"] },
      ],
      lines: [
        { say: 'The second derivative is the derivative of the first derivative. It is written f double prime of x, or d squared y by d x squared.', show: 'def' },
        { say: 'The first derivative tells you how fast f is changing. The second derivative tells you how fast that rate of change is itself changing: whether the slope is growing or shrinking.' },
        { say: 'Differentiate again to get the third derivative, f triple prime of x. After that, we write the number in brackets: f with a four in brackets is the fourth derivative.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Again and again',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = x^{4} - 3x^{2} + 5x',
            "f'(x) = 4x^{3} - 6x + 5",
            "f''(x) = 12x^{2} - 6",
            "f'''(x) = 24x",
            'f^{(4)}(x) = 24, \\qquad f^{(5)}(x) = 0',
          ],
        },
      ],
      lines: [
        { say: 'Find all the derivatives of f of x equals x to the fourth, minus three x squared, plus five x.', show: 'm.0', focus: 'm.0' },
        { say: 'By the power rule, f prime of x is four x cubed, minus six x, plus five.', show: 'm.1', focus: 'm.1' },
        { say: 'Differentiate that: f double prime of x is twelve x squared minus six. The constant five disappears.', show: 'm.2', focus: 'm.2' },
        { say: 'Again: f triple prime of x is 24 x.', show: 'm.3', focus: 'm.3' },
        { say: 'The fourth derivative is the constant 24, and the fifth derivative is zero. Each step lowers the degree by one, so every derivative after the fourth is zero.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Acceleration',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Acceleration', md: "If $s(t)$ is position, then velocity is $v(t) = s'(t)$, and **acceleration**, the rate of change of velocity, is $a(t) = v'(t) = s''(t)$." },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['s(t) = t^{3} - 6t^{2} + 9t', 'v(t) = 3t^{2} - 12t + 9', 'a(t) = 6t - 12', 'a(3) = 18 - 12 = 6\\text{ m/s}^{2}'],
        },
      ],
      lines: [
        { say: 'Second derivatives have a meaning you can feel. If s of t is the position of an object, its velocity is the first derivative, and its acceleration, the rate of change of velocity, is the second derivative.', show: 'def' },
        { say: 'An object’s position is s of t equals t cubed, minus six t squared, plus nine t, in metres, after t seconds.', show: 'm.0', focus: 'm.0' },
        { say: 'Its velocity is three t squared, minus twelve t, plus nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Its acceleration is six t minus twelve.', show: 'm.2', focus: 'm.2' },
        { say: 'At three seconds, the acceleration is eighteen minus twelve: six metres per second squared. That means its velocity is increasing by six metres per second, every second.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Simplify first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Simplify before differentiating again', md: 'Tidy each derivative (factor, combine fractions) before you differentiate it again.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['y = xe^{x}', "y' = e^{x} + xe^{x} = (x + 1)e^{x}", "y'' = e^{x} + (x + 1)e^{x} = (x + 2)e^{x}"],
        },
      ],
      lines: [
        { say: 'Here is a habit that saves work: tidy each derivative before you differentiate it again.', show: 'tip' },
        { say: 'Take y equals x e to the x.', show: 'm.0', focus: 'm.0' },
        { say: 'By the product rule, y prime is e to the x, plus x e to the x. Factor it: x plus one, times e to the x.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the product rule again is quick. The derivative of x plus one is one, times e to the x, plus x plus one, times e to the x. That is x plus two, times e to the x. Can you guess the third derivative?', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "For $f(x) = 2x^{3} - 5x^{2} + x$, find $f''(1)$.",
          choices: ['$-3$', '$12$', '$-2$', '$2$'],
          answer: 3,
          working: "$f'(x) = 6x^{2} - 10x + 1$ and $f''(x) = 12x - 10$, so $f''(1) = 12 - 10 = 2$.",
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals two x cubed, minus five x squared, plus x, find f double prime of one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. f prime of x is six x squared, minus ten x, plus one, and f double prime of x is twelve x minus ten. At x equals one, that is two. Choice A is f prime of one: it stops after the first derivative.', show: 'q.answer' },
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
          items: [
            "$f''$, $f'''$ and $f^{(n)}$ come from differentiating again and again.",
            "Acceleration is the second derivative of position: $a(t) = s''(t)$.",
            'Simplify each derivative before you differentiate it again.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The second, third and higher derivatives come from differentiating again and again.', show: 'sum.0' },
        { say: 'Acceleration is the second derivative of position.', show: 'sum.1' },
        { say: 'And simplify each derivative before you differentiate it again. In the next part, we find patterns that give a derivative far down the line, without doing every step. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
