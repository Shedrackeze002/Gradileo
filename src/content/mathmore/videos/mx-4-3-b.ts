import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-4-3-b',
  lessonId: 'mx-4-3',
  title: 'Polynomial Identities, Part 2: The Fundamental Theorem of Algebra',
  thumbnailTitle: 'The Fundamental Theorem of Algebra',
  thumbnail: false,
  summary: 'A polynomial of degree n ≥ 1 has exactly n complex roots, counted with multiplicity. With real coefficients, non-real roots come in conjugate pairs, so a cubic always has a real root. x³ − 5x² + 17x − 13 has the root 2 + 3i, so 2 − 3i too, giving the factor x² − 4x + 13, and its third root is 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Complex Numbers and Polynomials · Part 2', title: 'The Fundamental Theorem of Algebra', subtitle: 'How many roots does a polynomial have?' }],
      lines: [
        { say: 'A quadratic has two solutions, once complex numbers are allowed. What about a cubic, or a polynomial of degree ten?', show: 'title' },
        { say: 'In this video, you will learn a big result that answers this question, called the fundamental theorem of algebra, and use it to find the roots of a cubic.' },
      ],
    },
    {
      chapter: 'The theorem',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'key', title: 'The fundamental theorem of algebra', md: 'A polynomial of degree $n \\ge 1$ has **exactly $n$ complex roots**, when each root is counted as many times as it is repeated (its **multiplicity**).' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(x - 2)^2 (x + 1) = 0: \\quad \\text{roots } 2,\\ 2,\\ {-1} \\quad \\text{(three, counting } 2 \\text{ twice)}'] },
      ],
      lines: [
        { say: 'The fundamental theorem of algebra says that a polynomial of degree n, where n is at least one, has exactly n complex roots.', show: 'def' },
        { say: 'There is one condition: a root that is repeated is counted as many times as it is repeated. That number is called its multiplicity.' },
        { say: 'For example, x minus two, squared, times x plus one, has the roots two and negative one. But two is a double root, so we count it twice. That makes three roots, for a cubic.', show: 'm.0', focus: 'm.0' },
        { say: 'So a cubic has three roots, and a quartic, of degree four, has four. Some of them may be real, and some may not.' },
      ],
    },
    {
      chapter: 'Conjugate pairs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Conjugate pairs', md: 'When the coefficients are **real**, non-real roots come in **conjugate pairs**: if $a + bi$ is a root, so is $a - bi$.' },
        { kind: 'text', id: 't', md: 'So a cubic with real coefficients always has **at least one real root**: its three roots cannot all pair up.', align: 'center' },
      ],
      lines: [
        { say: 'When the coefficients of a polynomial are real, its non-real roots come in conjugate pairs. If "a" plus b i is a root, then "a" minus b i is a root too.', show: 'key' },
        { say: 'We saw this with quadratics: negative one plus two i and negative one minus two i.' },
        { say: 'This means a cubic with real coefficients always has at least one real root. It has three roots, and the non-real ones come in pairs, so at least one is left over, and it must be real.', show: 't' },
      ],
    },
    {
      chapter: 'Finding the other roots',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['p(x) = x^3 - 5x^2 + 17x - 13, \\quad \\text{root } 2 + 3i', '\\text{So } 2 - 3i \\text{ is a root too.}', '(x - (2 + 3i))(x - (2 - 3i)) = (x - 2)^2 + 9 = x^2 - 4x + 13', 'x^3 - 5x^2 + 17x - 13 = (x^2 - 4x + 13)(x - 1)', '\\text{Roots: } 2 + 3i,\\ 2 - 3i,\\ 1'] },
      ],
      lines: [
        { say: 'The cubic x cubed minus five x squared plus seventeen x minus thirteen has real coefficients, and two plus three i is a root. Find the other roots.', show: 'm.0', focus: 'm.0' },
        { say: 'The coefficients are real, so the conjugate, two minus three i, is also a root.', show: 'm.1', focus: 'm.1' },
        { say: 'Each root gives a factor. Multiply the two factors: x minus two plus three i, times x minus two minus three i. That is x minus two, squared, plus nine, which expands to x squared minus four x plus thirteen.', show: 'm.2', focus: 'm.2' },
        { say: 'The cubic is this quadratic times one more factor, x plus something. The constant terms must multiply to negative thirteen. Thirteen times what is negative thirteen? Negative one. So the last factor is x minus one.', show: 'm.3', focus: 'm.3' },
        { say: 'So the three roots are two plus three i, two minus three i, and one. That is exactly three roots, as the theorem promises, and one of them is real.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A polynomial of degree $4$ with real coefficients has roots $3i$ and $1 + i$. What are its other two roots?',
          choices: ['$3$ and $1$', '$-3i$ and $1 - i$', '$-3i$ and $-1 - i$', '$3i$ and $1 + i$ again'],
          answer: 1,
          working: 'With real coefficients, the conjugates are roots too: $-3i$ (the conjugate of $0 + 3i$) and $1 - i$. That makes $4$ roots.',
        },
      ],
      lines: [
        { say: 'Your turn. A polynomial of degree four with real coefficients has the roots three i and one plus i. What are its other two roots? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The coefficients are real, so the conjugates are roots too. The conjugate of three i is negative three i, and the conjugate of one plus i is one minus i. That makes four roots, for degree four. Choice C changes the sign of the real part as well, which a conjugate does not.', show: 'q.answer' },
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
          items: ['A polynomial of degree $n$ has exactly $n$ complex roots, with multiplicity.', 'With real coefficients, non-real roots come in conjugate pairs.', 'A cubic with real coefficients has at least one real root.', 'Two conjugate roots give a real quadratic factor.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A polynomial of degree n has exactly n complex roots, counted with multiplicity.', show: 'sum.0' },
        { say: 'With real coefficients, non-real roots come in conjugate pairs.', show: 'sum.1' },
        { say: 'So a cubic with real coefficients always has at least one real root.', show: 'sum.2' },
        { say: 'And a pair of conjugate roots gives a quadratic factor with real coefficients. In the next lesson, we start on vectors. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
