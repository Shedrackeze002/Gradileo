import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-4-2',
  lessonId: 'm302-4-2',
  title: 'Operations on Rational Expressions, Part 1: Multiplying and Dividing',
  thumbnailTitle: 'Multiplying and Dividing',
  summary: 'Multiplying rational expressions by factoring, stating restrictions and dividing out common factors ((x² − 9)/(4x) × 8x²/(x + 3) = 2x(x − 3)), and dividing by multiplying by the reciprocal ((2x − 6)/x² ÷ (x² − 9)/(3x) = 6/(x(x + 3))), including the zeros of the divisor’s numerator in the restrictions. Part 2 adds and subtracts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Expressions and Equations · Part 1', title: 'Multiplying and Dividing', subtitle: 'Factor first, then divide out' }],
      lines: [
        { say: 'Rational expressions follow the same rules as fractions: multiply straight across, and divide by flipping the second fraction. The algebra is much easier if you factor first.', show: 'title' },
        { say: 'In this video, you will multiply and divide rational expressions, and keep track of the non-permissible values as you go.' },
      ],
    },
    {
      chapter: 'Multiplying',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{2}{3} \\times \\dfrac{9}{10} = \\dfrac{\\bad{\\cancel{2}}}{\\bad{\\cancel{3}}} \\times \\dfrac{\\bad{\\cancel{9}}\\,3}{\\bad{\\cancel{10}}\\,5} = \\dfrac{3}{5}'] },
        { kind: 'bullets', id: 'b', items: ['Factor every numerator and denominator.', 'State the non-permissible values.', 'Divide out factors that appear in any numerator and any denominator.', 'Multiply what is left.'] },
      ],
      lines: [
        { say: 'Start with numbers. Two thirds times nine tenths: before multiplying, divide out common factors. Two goes into ten, leaving five, and three goes into nine, leaving three. So the answer is three fifths.', show: 'm' },
        { say: 'Rational expressions work the same way. First, factor every numerator and every denominator.', show: 'b.0', focus: 'b.0' },
        { say: 'Second, state the non-permissible values, from every denominator.', show: 'b.1', focus: 'b.1' },
        { say: 'Third, divide out any factor that appears in a numerator and in a denominator, even across the two fractions.', show: 'b.2', focus: 'b.2' },
        { say: 'Finally, multiply what is left.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'A product',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{x^2 - 9}{4x} \\times \\dfrac{8x^2}{x + 3}',
            '= \\dfrac{(x - 3)(x + 3)}{4x} \\times \\dfrac{8x^2}{x + 3}, \\quad x \\ne -3, \\ 0',
            '\\dfrac{8x^2}{4x} = 2x, \\quad \\text{and } (x + 3) \\text{ divides out}',
            '= 2x(x - 3), \\quad x \\ne -3, \\ 0',
          ],
        },
      ],
      lines: [
        { say: 'Simplify x squared minus nine, over four x, times eight x squared, over x plus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor: x squared minus nine is a difference of squares, x minus three times x plus three. The other parts are already factored.', show: 'm.1', focus: 'm.1' },
        { say: 'The restrictions come from both denominators. Four x is zero when x is zero, and x plus three is zero when x is negative three. So x is not negative three, and not zero.' },
        { say: 'Now divide out. x plus three is on the top of the first fraction and the bottom of the second, so it divides out. And eight x squared over four x is two x.', show: 'm.2', focus: 'm.2' },
        { say: 'What is left is two x times x minus three, with x not equal to negative three or zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Factored or expanded?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['2x(x - 3) = 2x^2 - 6x, \\quad x \\ne -3, \\ 0'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Factored or expanded?', md: '$2x(x - 3)$ and $2x^2 - 6x$ are the same answer. The factored form makes it easy to see whether anything else divides out.' },
      ],
      lines: [
        { say: 'You can also expand the answer, as two x squared minus six x. Both forms are correct, and the restrictions stay the same.', show: 'm' },
        { say: 'But the factored form makes it easy to see whether anything else divides out, so it is often the better form to leave an answer in.', show: 'tip' },
      ],
    },
    {
      chapter: 'Dividing',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}', '\\dfrac{2}{3} \\div \\dfrac{4}{9} = \\dfrac{2}{3} \\times \\dfrac{9}{4} = \\dfrac{18}{12} = \\dfrac{3}{2}'] },
      ],
      lines: [
        { say: 'Dividing by a fraction is the same as multiplying by its reciprocal: the fraction flipped upside down.', show: 'm.0', focus: 'm.0' },
        { say: 'For example, two thirds divided by four ninths is two thirds times nine quarters. That is eighteen twelfths, or three halves.', show: 'm.1', focus: 'm.1' },
        { say: 'So to divide rational expressions, flip the second one, the divisor, and then multiply as before.' },
      ],
    },
    {
      chapter: 'A quotient',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{2x - 6}{x^2} \\div \\dfrac{x^2 - 9}{3x}',
            '= \\dfrac{2(x - 3)}{x^2} \\times \\dfrac{3x}{(x - 3)(x + 3)}',
            'x \\ne 0, \\quad \\text{and the divisor } \\ne 0: \\ x \\ne -3, \\ 3',
            '= \\dfrac{2 \\times 3}{x(x + 3)} = \\dfrac{6}{x(x + 3)}, \\quad x \\ne -3, \\ 0, \\ 3',
          ],
        },
      ],
      lines: [
        { say: 'Simplify two x minus six, over x squared, divided by x squared minus nine, over three x.', show: 'm.0', focus: 'm.0' },
        { say: 'Flip the divisor and multiply, and factor as you go. Two x minus six is two times x minus three, and x squared minus nine is x minus three, times x plus three.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the restrictions. The denominators x squared and three x are zero when x is zero. But there is more: you cannot divide by zero, so the divisor, x squared minus nine over three x, cannot be zero either. Its numerator is zero when x is three or negative three.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide out x minus three, and one factor of x: three x over x squared leaves three over x. What is left is two times three, over x times x plus three. That is six over x times x plus three, with x not equal to negative three, zero or three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the divisor’s numerator', md: 'After you flip the divisor, its numerator becomes a denominator. At $x = 3$, the divisor $\\dfrac{x^2 - 9}{3x}$ is $0$, and you cannot divide by $0$. Include the zeros of the divisor’s numerator in the non-permissible values.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 3: \\quad \\dfrac{3^2 - 9}{3 \\times 3} = \\dfrac{0}{9} = 0'] },
      ],
      lines: [
        { say: 'A common mistake is to take the restrictions only from the denominators you can see at the start.', show: 'oops' },
        { say: 'After you flip the divisor, its numerator becomes a denominator. At x equals three, the divisor is zero over nine, which is zero, and dividing by zero is undefined.', show: 'm', focus: 'm' },
        { say: 'So when you divide, include the zeros of the divisor’s numerator in the non-permissible values.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{5x}{x + 2} \\times \\dfrac{x^2 - 4}{10x^2}$, where $x \\ne -2, \\ 0$.',
          choices: ['$\\dfrac{x + 2}{2x}$', '$2x(x - 2)$', '$\\dfrac{x - 2}{2}$', '$\\dfrac{x - 2}{2x}$'],
          answer: 3,
          working: '$\\dfrac{5x}{x + 2} \\times \\dfrac{(x - 2)(x + 2)}{10x^2}$: divide out $x + 2$, and $\\dfrac{5x}{10x^2} = \\dfrac{1}{2x}$, leaving $\\dfrac{x - 2}{2x}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify five x over x plus two, times x squared minus four, over ten x squared. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Factor x squared minus four as x minus two, times x plus two. Then x plus two divides out, and five x over ten x squared is one over two x. That leaves x minus two, over two x. Choice C forgets that x squared over x leaves an x in the denominator.', show: 'q.answer' },
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
          items: ['Multiply: factor, state restrictions, divide out common factors, multiply what is left.', 'Divide: multiply by the reciprocal of the divisor.', 'Include the zeros of the divisor’s numerator in the restrictions.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To multiply, factor, state the restrictions, divide out common factors, and multiply what is left.', show: 'sum.0' },
        { say: 'To divide, multiply by the reciprocal of the divisor.', show: 'sum.1' },
        { say: 'And when you divide, include the zeros of the divisor’s numerator in the restrictions. In part two, we add and subtract rational expressions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
