import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-4-2-b',
  lessonId: 'm302-4-2',
  title: 'Operations on Rational Expressions, Part 2: Adding and Subtracting',
  thumbnailTitle: 'Adding and Subtracting',
  summary: 'Adding and subtracting rational expressions with monomial denominators over the lowest common denominator: 3/(4x) + 5/(6x²) = (9x + 10)/(12x²) and (x + 2)/(3x) − (x − 1)/(6x) = (x + 5)/(6x), and why a numerator you subtract needs brackets. Part 3 uses binomial denominators.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Expressions and Equations · Part 2', title: 'Adding and Subtracting', subtitle: 'Over the lowest common denominator' }],
      lines: [
        { say: 'To add one quarter and one sixth, you rewrite both fractions over twelve, the lowest common denominator. Rational expressions are added and subtracted the same way.', show: 'title' },
        { say: 'In this video, you will find the lowest common denominator of monomials, add and subtract rational expressions, and avoid the most common sign mistake.' },
      ],
    },
    {
      chapter: 'The lowest common denominator',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1}{4} + \\dfrac{1}{6} = \\dfrac{3}{12} + \\dfrac{2}{12} = \\dfrac{5}{12}', '\\text{LCD of } 4x \\text{ and } 6x^2: \\quad 12 \\times x^2 = 12x^2'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Lowest common denominator (LCD)', md: 'The least common multiple of the coefficients, times each variable to its **highest** power.' },
      ],
      lines: [
        { say: 'One quarter plus one sixth: twelve is the smallest number that both four and six divide into. So one quarter is three twelfths, one sixth is two twelfths, and the sum is five twelfths.', show: 'm.0', focus: 'm.0' },
        { say: 'With variables, the lowest common denominator, or LCD, is the least common multiple of the coefficients, times each variable to its highest power.', show: 'key' },
        { say: 'For example, the LCD of four x and six x squared: the least common multiple of four and six is twelve, and the highest power of x is x squared. So the LCD is twelve x squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Different powers of x',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{3}{4x} + \\dfrac{5}{6x^2}, \\quad x \\ne 0, \\quad \\text{LCD} = 12x^2',
            '= \\dfrac{3}{4x} \\cdot \\dfrac{\\good{3x}}{\\good{3x}} + \\dfrac{5}{6x^2} \\cdot \\dfrac{\\good{2}}{\\good{2}}',
            '= \\dfrac{9x}{12x^2} + \\dfrac{10}{12x^2} = \\dfrac{9x + 10}{12x^2}',
          ],
        },
      ],
      lines: [
        { say: 'Simplify three over four x, plus five over six x squared. x cannot be zero, and the LCD is twelve x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply each fraction by what its denominator is missing. Four x needs three x more to make twelve x squared, so multiply the top and bottom of the first fraction by three x. Six x squared needs only a factor of two.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiplying the top and bottom by the same thing is multiplying by one, so the values do not change.' },
        { say: 'That gives nine x over twelve x squared, plus ten over twelve x squared. Now the denominators match, so add the numerators: nine x plus ten, over twelve x squared.', show: 'm.2', focus: 'm.2' },
        { say: 'Nine x plus ten has no factor in common with twelve x squared, so the answer is simplified, with x not equal to zero.' },
      ],
    },
    {
      chapter: 'Subtracting a binomial numerator',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{x + 2}{3x} - \\dfrac{x - 1}{6x}, \\quad x \\ne 0, \\quad \\text{LCD} = 6x',
            '= \\dfrac{2(x + 2) - (x - 1)}{6x}',
            '= \\dfrac{2x + 4 - x + 1}{6x}',
            '= \\dfrac{x + 5}{6x}',
          ],
        },
      ],
      lines: [
        { say: 'Simplify x plus two over three x, minus x minus one over six x. Again, x is not zero, and the LCD is six x.', show: 'm.0', focus: 'm.0' },
        { say: 'The first fraction needs a factor of two, so its numerator becomes two times x plus two. The second fraction already has six x. Put its numerator in brackets, because the minus sign belongs to the whole numerator.', show: 'm.1', focus: 'm.1' },
        { say: 'Expand carefully. Two times x plus two is two x plus four. Minus the bracket x minus one is minus x, plus one: the minus sign changes the sign of both terms inside.', show: 'm.2', focus: 'm.2' },
        { say: 'Collect like terms. Two x minus x is x, and four plus one is five. The answer is x plus five, over six x, with x not equal to zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting only the first term', md: '$2(x + 2) - (x - 1)$ is $2x + 4 - x + 1$, **not** $2x + 4 - x - 1$. Put brackets around a numerator you subtract, so the minus sign reaches every term.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{2x + 4 - x - 1 = x + 3} \\qquad \\good{2x + 4 - x + 1 = x + 5}'] },
      ],
      lines: [
        { say: 'The most common mistake is to subtract only the first term of the second numerator.', show: 'oops' },
        { say: 'Writing two x plus four minus x minus one gives x plus three, which is wrong. The minus sign must reach every term of x minus one, so minus negative one becomes plus one, and the answer is x plus five.', show: 'm', focus: 'm' },
        { say: 'Brackets around a numerator you subtract make sure you never forget.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{2}{3x} + \\dfrac{1}{x^2}$, where $x \\ne 0$.',
          choices: ['$\\dfrac{3}{3x + x^2}$', '$\\dfrac{2x + 3}{3x^2}$', '$\\dfrac{2x + 1}{3x^2}$', '$\\dfrac{3}{3x^2}$'],
          answer: 1,
          working: 'The LCD is $3x^2$: $\\dfrac{2}{3x} \\cdot \\dfrac{x}{x} + \\dfrac{1}{x^2} \\cdot \\dfrac{3}{3} = \\dfrac{2x}{3x^2} + \\dfrac{3}{3x^2} = \\dfrac{2x + 3}{3x^2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify two over three x, plus one over x squared. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The LCD is three x squared. The first fraction needs a factor of x, giving two x over three x squared. The second needs a factor of three, giving three over three x squared. So the sum is two x plus three, over three x squared. Choice A adds the tops and adds the bottoms, which never works for fractions.', show: 'q.answer' },
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
          items: ['LCD: the least common multiple of the coefficients, times each variable to its highest power.', 'Multiply each numerator by what its denominator is missing, then add or subtract the numerators.', 'Put brackets around a numerator you subtract.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The LCD is the least common multiple of the coefficients, times each variable to its highest power.', show: 'sum.0' },
        { say: 'Multiply each numerator by what its denominator is missing, then add or subtract the numerators.', show: 'sum.1' },
        { say: 'And put brackets around a numerator you subtract. In part three, we add and subtract with binomial denominators. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
