import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-6-3-d',
  lessonId: 'm302-6-3',
  title: 'Logarithms and the Laws of Logarithms, Part 4: Combining, Expanding and Solving',
  thumbnailTitle: 'Using the Laws of Logarithms',
  summary: 'Using the laws of logarithms in both directions: writing 2 log x + log y − 3 log z as the single logarithm log(x²y/z³), finding log 18 ≈ 1.2552 from log 2 and log 3, and solving log₃ x − log₃ 4 = 2 (x = 36) by combining, then writing the equation in exponential form.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 4', title: 'Using the Laws', subtitle: 'Combine, expand and solve' }],
      lines: [
        { say: 'The laws of logarithms work in both directions. They can break one logarithm into several, or combine several into one.', show: 'title' },
        { say: 'In this video, you will write an expression as a single logarithm, find a logarithm from known values, and solve an equation with the laws.' },
      ],
    },
    {
      chapter: 'Both directions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\log \\dfrac{x^{2}y}{z^{3}} \\quad\\overset{\\text{expand}}{\\underset{\\text{combine}}{\\rightleftharpoons}}\\quad 2\\log x + \\log y - 3\\log z'] },
        { kind: 'bullets', id: 'b', items: ['**Expand:** one logarithm becomes a sum and difference of simpler ones.', '**Combine:** several logarithms become a single logarithm.'] },
      ],
      lines: [
        { say: 'Read the laws from left to right, and they expand one logarithm into several simpler ones.', show: ['m.0', 'b.0'] },
        { say: 'Read them from right to left, and they combine several logarithms into one. Both directions are useful.', show: 'b.1' },
      ],
    },
    {
      chapter: 'A single logarithm',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['2\\log x + \\log y - 3\\log z', '= \\log x^{2} + \\log y - \\log z^{3}', '= \\log x^{2}y - \\log z^{3}', '= \\log \\dfrac{x^{2}y}{z^{3}}'] },
      ],
      lines: [
        { say: 'Write two log x, plus log y, minus three log z, as a single logarithm.', show: 'm.0', focus: 'm.0' },
        { say: 'Start with the power law. The numbers in front become exponents: two log x is log x squared, and three log z is log z cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'Next, the product law. The sum, log x squared plus log y, becomes the log of x squared times y.', show: 'm.2', focus: 'm.2' },
        { say: 'Last, the quotient law. Subtracting log z cubed divides by z cubed. So the single logarithm is the log of x squared y, over z cubed.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Known values',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Given $\\log 2 \\approx 0.3010$ and $\\log 3 \\approx 0.4771$, find $\\log 18$ without the LOG key.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['18 = 2 \\times 3^{2}', '\\log 18 = \\log 2 + 2\\log 3', '\\log 18 \\approx 0.3010 + 2(0.4771) = 1.2552'] },
      ],
      lines: [
        { say: 'Expanding lets you build new logarithms from known ones. Given that log two is about 0.3010, and log three is about 0.4771, find log 18 without the log key.', show: 'q' },
        { say: 'Write 18 using twos and threes: eighteen is two times three squared.', show: 'm.0', focus: 'm.0' },
        { say: 'The product law splits the log of the product into log two, plus log three squared. And the power law turns log three squared into two log three.', show: 'm.1', focus: 'm.1' },
        { say: 'So log 18 is about 0.3010, plus two times 0.4771, which is 1.2552. A calculator gives 1.25527, so the laws check out.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Solving with a law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\log_3 x - \\log_3 4 = 2', '\\log_3 \\dfrac{x}{4} = 2', '\\dfrac{x}{4} = 3^{2} = 9', 'x = 36'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the argument', md: 'The number you take a logarithm of must be positive. $x = 36$ is positive, so $\\log_3 x$ is defined.' },
      ],
      lines: [
        { say: 'Combining helps you solve equations. Solve log base three of x, minus log base three of four, equals two.', show: 'm.0', focus: 'm.0' },
        { say: 'The quotient law combines the left side into one logarithm: log base three of x over four equals two.', show: 'm.1', focus: 'm.1' },
        { say: 'Now write it in exponential form. The base is three and the exponent is two, so x over four equals three squared, which is nine.', show: 'm.2', focus: 'm.2' },
        { say: 'Multiply both sides by four: x equals 36.', show: 'm.3', focus: 'm.3' },
        { say: 'Check that the answer makes sense. You can only take the logarithm of a positive number, and 36 is positive. And log base three of 36 minus log base three of four is log base three of nine, which is two. It works.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\log_2 x + \\log_2 5 = 4$.',
          choices: ['$x = 11$', '$x = 80$', '$x = \\frac{16}{5}$', '$x = \\frac{4}{5}$'],
          answer: 2,
          working: 'Product law: $\\log_2 5x = 4$, so $5x = 2^4 = 16$ and $x = \\frac{16}{5}$, which is positive.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve log base two of x, plus log base two of five, equals four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The product law combines the left side into log base two of five x. In exponential form, five x equals two to the fourth, which is sixteen, so x is sixteen fifths. Choice A adds x and five, but the product law multiplies them.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The laws of logarithms work in both directions: expand or combine.', 'To combine, use the power law first, then the product and quotient laws.', 'To solve, combine into one logarithm, write it in exponential form, and check the argument is positive.'] }],
      lines: [
        { say: 'Let’s sum up. The laws of logarithms work in both directions: to expand one logarithm, or to combine several.', show: 'sum.0' },
        { say: 'To combine, use the power law first, then the product and quotient laws.', show: 'sum.1' },
        { say: 'And to solve, combine into one logarithm, write it in exponential form, and check that the argument is positive. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
