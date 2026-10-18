import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-4-1-c',
  lessonId: 'm302-4-1',
  title: 'Equivalent Rational Expressions, Part 3: Equivalent Forms and Opposites',
  thumbnailTitle: 'Equivalent Forms and Opposites',
  summary: 'Building an equivalent rational expression (3/(x + 2) = (3x − 6)/(x² − 4)), opposite binomials such as 5 − x = −(x − 5), which divide to −1, and simplifying (10 − 2x)/(x² − 25) = −2/(x + 5) by factoring out −2 so the factors match.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Expressions and Equations · Part 3', title: 'Equivalent Forms and Opposites', subtitle: '$5 - x = -(x - 5)$' }],
      lines: [
        { say: 'Three quarters and six eighths are equivalent: multiply the top and the bottom of three quarters by two. Rational expressions have equivalent forms too. And some factors that look different are really opposites.', show: 'title' },
        { say: 'In this video, you will find a missing numerator, and simplify expressions with opposite factors, such as five minus x and x minus five.' },
      ],
    },
    {
      chapter: 'Equivalent expressions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{3}{4} = \\dfrac{3 \\times 2}{4 \\times 2} = \\dfrac{6}{8}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Equivalent expressions', md: 'Multiplying the numerator and the denominator by the same non-zero factor gives an **equivalent** expression: it has the same value wherever both are defined.' },
      ],
      lines: [
        { say: 'Multiplying the top and the bottom of a fraction by the same number does not change its value. Three quarters is six eighths.', show: 'm' },
        { say: 'The same is true for rational expressions. Multiplying the numerator and the denominator by the same non-zero factor gives an equivalent expression: one with the same value, wherever both are defined.', show: 'key' },
      ],
    },
    {
      chapter: 'A missing numerator',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{3}{x + 2} = \\dfrac{?}{x^2 - 4}',
            'x^2 - 4 = (x + 2)\\good{(x - 2)}',
            '\\dfrac{3\\good{(x - 2)}}{(x + 2)\\good{(x - 2)}} = \\dfrac{3x - 6}{x^2 - 4}',
            'x \\ne -2, \\ 2',
          ],
        },
      ],
      lines: [
        { say: 'Find the missing numerator. Three over x plus two equals what, over x squared minus four?', show: 'm.0', focus: 'm.0' },
        { say: 'Factor the new denominator: x squared minus four is x plus two, times x minus two. So the old denominator, x plus two, was multiplied by x minus two.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply the numerator by the same factor: three times x minus two, which is three x minus six. That is the missing numerator.', show: 'm.2', focus: 'm.2' },
        { say: 'The new expression has the restrictions x not equal to negative two, and x not equal to two. The two forms are equal wherever both are defined. At x equals two, only the first one has a value.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Opposites',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['5 - x = -1(x - 5) = -(x - 5)', '\\dfrac{5 - x}{x - 5} = \\dfrac{-(x - 5)}{x - 5} = -1, \\quad x \\ne 5', 'x = 7: \\quad \\dfrac{5 - 7}{7 - 5} = \\dfrac{-2}{2} = -1 \\ \\checkmark'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Opposites', md: 'Binomials such as $5 - x$ and $x - 5$ are **opposites**. Factor out $-1$ to make them match: they divide to $-1$.' },
      ],
      lines: [
        { say: 'Binomials like five minus x and x minus five are opposites: they have the same terms, with opposite signs. Factor negative one out of five minus x, and you get negative one, times x minus five.', show: 'm.0', focus: 'm.0' },
        { say: 'So five minus x, over x minus five, is negative one times x minus five, all over x minus five. The x minus five divides out, leaving negative one, for every x except five.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with x equals seven. Five minus seven is negative two, and seven minus five is two. Negative two over two is negative one.', show: 'm.2', focus: 'm.2' },
        { say: 'So opposites divide to negative one. To make them match, factor out negative one.', show: 'key' },
      ],
    },
    {
      chapter: 'Opposite factors',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{10 - 2x}{x^2 - 25}',
            '10 - 2x = -2(x - 5)',
            'x^2 - 25 = (x - 5)(x + 5), \\quad x \\ne -5, \\ 5',
            '\\dfrac{-2\\bad{\\cancel{(x - 5)}}}{\\bad{\\cancel{(x - 5)}}(x + 5)} = -\\dfrac{2}{x + 5}, \\quad x \\ne -5, \\ 5',
          ],
        },
      ],
      lines: [
        { say: 'Simplify ten minus two x, over x squared minus twenty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'The numerator has a common factor of two. Factor out negative two, not two, so that the binomial left inside matches the denominator: ten minus two x is negative two, times x minus five.', show: 'm.1', focus: 'm.1' },
        { say: 'The denominator is a difference of squares: x minus five, times x plus five. So x is not negative five, and not five.', show: 'm.2', focus: 'm.2' },
        { say: 'Now x minus five divides out, leaving negative two over x plus five, with x not equal to negative five or five.', show: 'm.3', focus: 'm.3' },
        { say: 'If you had factored out a positive two, you would have two times five minus x, which does not match x minus five. Factoring out negative two is what makes the factors match.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Opposites are not equal', md: '$5 - x$ and $x - 5$ do **not** divide to $1$. They divide to $-1$, so a negative sign must appear in the answer.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{5 - x}{x - 5} = 1} \\qquad \\good{\\dfrac{5 - x}{x - 5} = -1}'] },
      ],
      lines: [
        { say: 'A common mistake is to treat opposites as if they were equal, and cancel five minus x with x minus five to get one.', show: 'oops' },
        { say: 'They divide to negative one, not one. So when you divide out a pair of opposites, a negative sign must appear in the answer. Testing a value, like x equals seven, will catch the mistake.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{3x - 12}{16 - x^2}$, where $x \\ne -4, \\ 4$.',
          choices: ['$\\dfrac{3}{x + 4}$', '$\\dfrac{3}{4 - x}$', '$-\\dfrac{3}{x + 4}$', '$-\\dfrac{3}{x - 4}$'],
          answer: 2,
          working: '$3x - 12 = 3(x - 4)$ and $16 - x^2 = (4 - x)(4 + x) = -(x - 4)(x + 4)$, so the expression is $\\dfrac{3(x - 4)}{-(x - 4)(x + 4)} = -\\dfrac{3}{x + 4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify three x minus twelve, over sixteen minus x squared. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The numerator is three times x minus four. The denominator is four minus x, times four plus x, and four minus x is negative one times x minus four. So x minus four divides out, and leaves negative three over x plus four. Choice A treats x minus four and four minus x as equal, and loses the negative sign.', show: 'q.answer' },
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
          items: ['Multiply the numerator and denominator by the same factor to build an equivalent expression.', 'Opposites: $5 - x = -(x - 5)$, and they divide to $-1$.', 'Factor out $-1$, with any common factor, so that the factors match.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Multiply the numerator and the denominator by the same factor to build an equivalent expression.', show: 'sum.0' },
        { say: 'Opposites, like five minus x and x minus five, divide to negative one.', show: 'sum.1' },
        { say: 'And factor out negative one, together with any common factor, so that the factors match. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
