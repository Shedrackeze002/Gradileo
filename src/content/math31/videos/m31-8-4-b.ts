import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-8-4-b',
  lessonId: 'm31-8-4',
  title: 'Integration by Substitution, Part 2: Exponentials, Logarithms and Trigonometry',
  thumbnailTitle: 'Substitution with e, ln and sin',
  thumbnail: false,
  summary: 'Four substitutions: ∫ e^(3x) dx = ⅓e^(3x) + C with u = 3x; ∫ x e^(x²) dx = ½e^(x²) + C with u = x²; ∫ 2x/(x² + 1) dx = ln(x² + 1) + C with u = x² + 1; and ∫ cos x sin²x dx = ⅓sin³x + C with u = sin x. Then an initial condition: the antiderivative of 6x(x² + 1)² with F(0) = 2 is F(x) = (x² + 1)³ + 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 2', title: 'Substitution with e, ln and sin', subtitle: 'Four substitutions and an initial condition' }],
      lines: [
        { say: 'Substitution is not just for powers. Whenever a function sits inside another, and the inside’s derivative is a factor, the same four steps work.', show: 'title' },
        { say: 'In this video, you will use substitution with exponentials, logarithms and trigonometric functions, and then with an initial condition.' },
      ],
    },
    {
      chapter: 'Exponentials',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['(a)\\quad \\int e^{3x}\\,dx\\colon \\quad u = 3x, \\quad du = 3\\,dx, \\quad dx = \\tfrac{1}{3}\\,du', '= \\tfrac{1}{3}\\int e^u\\,du = \\tfrac{1}{3}e^{3x} + C', '(b)\\quad \\int xe^{x^2}\\,dx\\colon \\quad u = x^2, \\quad du = 2x\\,dx, \\quad x\\,dx = \\tfrac{1}{2}\\,du', '= \\tfrac{1}{2}\\int e^u\\,du = \\tfrac{1}{2}e^{x^2} + C'],
        },
      ],
      lines: [
        { say: 'First, the integral of e to the three x, d x. The inside function is the exponent, so let u equal three x. Then d u equals three d x, and d x is one third of d u.', show: 'm.0', focus: 'm.0' },
        { say: 'The integral becomes one third of the integral of e to the u, d u. e to the u is its own antiderivative, so the answer is one third e to the three x, plus C.', show: 'm.1', focus: 'm.1' },
        { say: 'Next, the integral of x e to the x squared, d x. Again, let u be the exponent: u equals x squared. Then d u equals two x d x, so x d x is one half of d u. The factor x is there, as we need.', show: 'm.2', focus: 'm.2' },
        { say: 'The integral becomes one half of the integral of e to the u, d u, which is one half e to the x squared, plus C.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A logarithm and a sine',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['(c)\\quad \\int \\dfrac{2x}{x^2 + 1}\\,dx\\colon \\quad u = x^2 + 1, \\quad du = 2x\\,dx', '= \\int \\dfrac{1}{u}\\,du = \\ln(x^2 + 1) + C', '(d)\\quad \\int \\cos x\\,\\sin^2 x\\,dx\\colon \\quad u = \\sin x, \\quad du = \\cos x\\,dx', '= \\int u^2\\,du = \\tfrac{1}{3}\\sin^3 x + C'],
        },
      ],
      lines: [
        { say: 'Third, the integral of two x over x squared plus one. Let u be the denominator, x squared plus one. Then d u is two x d x: exactly the numerator.', show: 'm.0', focus: 'm.0' },
        { say: 'So the integral is the integral of one over u, d u, which is the natural log of the absolute value of u. And x squared plus one is always positive, so no absolute value is needed: the natural log of x squared plus one, plus C.', show: 'm.1', focus: 'm.1' },
        { say: 'Fourth, the integral of cosine x times sine squared x. Sine squared x means sine x, squared, so sine x is the inside of a power. Let u equal sine x. Then d u equals cosine x d x, which is the other factor.', show: 'm.2', focus: 'm.2' },
        { say: 'The integral becomes the integral of u squared, d u, which is u cubed over three. So the answer is one third sine cubed x, plus C.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'With an initial condition',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Find the antiderivative $F$ of $f(x) = 6x(x^2 + 1)^2$ with $F(0) = 2$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['u = x^2 + 1, \\quad du = 2x\\,dx, \\quad 6x\\,dx = 3\\,du', '\\int 3u^2\\,du = u^3 + C \\;\\Rightarrow\\; F(x) = (x^2 + 1)^3 + C', 'F(0) = 1 + C = 2 \\;\\Rightarrow\\; C = 1', 'F(x) = (x^2 + 1)^3 + 1'] },
      ],
      lines: [
        { say: 'An initial condition picks out one antiderivative, just as it did before. Find the antiderivative F of six x times, x squared plus one, squared, with F of zero equal to two.', show: 'p' },
        { say: 'Let u equal x squared plus one. Then d u is two x d x. The integrand has six x d x, which is three times two x d x: three d u.', show: 'm.0', focus: 'm.0' },
        { say: 'So the integral is the integral of three u squared, d u, which is u cubed, plus C. In terms of x, F of x equals, x squared plus one, cubed, plus C.', show: 'm.1', focus: 'm.1' },
        { say: 'Now use F of zero equals two. At x equals zero, x squared plus one is one, and one cubed is one. So one plus C equals two, and C is one.', show: 'm.2', focus: 'm.2' },
        { say: 'The antiderivative is F of x equals, x squared plus one, cubed, plus one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $\\displaystyle\\int x^2 e^{x^3}\\,dx$.',
          choices: ['$\\dfrac{1}{3}e^{x^3} + C$', '$3e^{x^3} + C$', '$\\dfrac{1}{3}x^3 e^{x^3} + C$', '$e^{x^3} + C$'],
          answer: 0,
          working: '$u = x^3$ and $du = 3x^2\\,dx$, so $x^2\\,dx = \\tfrac{1}{3}\\,du$ and the integral is $\\tfrac{1}{3}\\int e^u\\,du = \\tfrac{1}{3}e^{x^3} + C$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the integral of x squared, e to the x cubed, d x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Let u be the exponent, x cubed. Then d u is three x squared d x, so x squared d x is one third of d u. The integral is one third of the integral of e to the u, which is one third e to the x cubed, plus C.', show: 'q.answer' },
        { say: 'Choice B multiplies by three instead of dividing. Differentiate it, and you get nine x squared e to the x cubed, which is nine times too big.' },
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
          items: ['For $e^{g(x)}$, let $u$ be the exponent.', 'For a fraction whose numerator is the derivative of its denominator, let $u$ be the denominator: the answer is a logarithm.', 'For powers of $\\sin x$ times $\\cos x$, let $u = \\sin x$.', 'An initial condition then finds $C$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For e to the power of a function, let u be the exponent.', show: 'sum.0' },
        { say: 'For a fraction whose numerator is the derivative of its denominator, let u be the denominator, and the answer is a natural log.', show: 'sum.1' },
        { say: 'For a power of sine x times cosine x, let u be sine x.', show: 'sum.2' },
        { say: 'And an initial condition then finds C. In the next part, we use substitution in definite integrals, and change the limits as we go. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
