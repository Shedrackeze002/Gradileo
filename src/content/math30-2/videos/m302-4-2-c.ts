import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm302-4-2-c',
  lessonId: 'm302-4-2',
  title: 'Operations on Rational Expressions, Part 3: Binomial Denominators',
  thumbnailTitle: 'Binomial Denominators',
  summary: 'Adding and subtracting rational expressions with binomial denominators: 2/(x + 3) − 1/(x − 2) = (x − 7)/((x + 3)(x − 2)), 4/(x² − 9) + 1/(x + 3) = (x + 1)/((x − 3)(x + 3)) with an LCD that uses each factor once, and a final numerator that simplifies further, 1/(x − 2) − 4/(x² − 4) = 1/(x + 2).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Rational Expressions and Equations · Part 3', title: 'Binomial Denominators', subtitle: 'Build the LCD from every different factor' }],
      lines: [
        { say: 'When the denominators are binomials, such as x plus three and x minus two, the method for adding and subtracting stays the same. Only the lowest common denominator takes more care.', show: 'title' },
        { say: 'In this video, you will build the LCD from binomial factors, subtract and add rational expressions, and simplify the result at the end.' },
      ],
    },
    {
      chapter: 'Building the LCD',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'The LCD of binomial denominators', md: 'Factor every denominator. The LCD uses each **different** factor once. Two different binomials with no common factor have their product as the LCD.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x + 3 \\text{ and } x - 2: \\quad \\text{LCD} = (x + 3)(x - 2)', 'x^2 - 9 = (x - 3)(x + 3) \\text{ and } x + 3: \\quad \\text{LCD} = (x - 3)(x + 3)'] },
      ],
      lines: [
        { say: 'First, factor every denominator. The LCD uses each different factor once.', show: 'key' },
        { say: 'The binomials x plus three and x minus two have no common factor, so their LCD is their product: x plus three, times x minus two.', show: 'm.0', focus: 'm.0' },
        { say: 'But x squared minus nine factors as x minus three, times x plus three. It already contains x plus three. So the LCD of x squared minus nine and x plus three is just x minus three, times x plus three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two binomials',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{2}{x + 3} - \\dfrac{1}{x - 2}, \\quad x \\ne -3, \\ 2',
            '= \\dfrac{2\\good{(x - 2)} - \\good{(x + 3)}}{(x + 3)(x - 2)}',
            '2x - 4 - x - 3 = x - 7',
            '= \\dfrac{x - 7}{(x + 3)(x - 2)}',
          ],
        },
      ],
      lines: [
        { say: 'Simplify two over x plus three, minus one over x minus two. The restrictions are x not equal to negative three, and x not equal to two.', show: 'm.0', focus: 'm.0' },
        { say: 'The LCD is x plus three, times x minus two. The first fraction is missing x minus two, so its numerator becomes two times x minus two. The second is missing x plus three, so its numerator becomes one times x plus three, in brackets because it is subtracted.', show: 'm.1', focus: 'm.1' },
        { say: 'Expand the numerator. Two times x minus two is two x minus four. Minus the bracket x plus three is minus x, minus three. Collect: two x minus x is x, and negative four minus three is negative seven. So the numerator is x minus seven.', show: 'm.2', focus: 'm.2' },
        { say: 'The answer is x minus seven, over x plus three times x minus two. The numerator shares no factor with the denominator, so it is simplified.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A shared factor',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{4}{x^2 - 9} + \\dfrac{1}{x + 3}',
            'x^2 - 9 = (x - 3)(x + 3), \\quad x \\ne -3, \\ 3',
            '= \\dfrac{4}{(x - 3)(x + 3)} + \\dfrac{1\\good{(x - 3)}}{(x + 3)\\good{(x - 3)}}',
            '= \\dfrac{4 + x - 3}{(x - 3)(x + 3)} = \\dfrac{x + 1}{(x - 3)(x + 3)}',
          ],
        },
      ],
      lines: [
        { say: 'Simplify four over x squared minus nine, plus one over x plus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor first: x squared minus nine is x minus three, times x plus three. So x is not negative three, and not three.', show: 'm.1', focus: 'm.1' },
        { say: 'The factor x plus three appears in both denominators, so the LCD uses it once: x minus three, times x plus three. That is the first denominator already. The second fraction is missing only x minus three, so multiply its top and bottom by x minus three.', show: 'm.2', focus: 'm.2' },
        { say: 'Add the numerators: four plus x minus three is x plus one. So the answer is x plus one, over x minus three times x plus three.', show: 'm.3', focus: 'm.3' },
        { say: 'Multiplying the two denominators together would also give a common denominator, but a bigger one, with more to simplify at the end. Using each factor once keeps the work short.' },
      ],
    },
    {
      chapter: 'Simplify at the end',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{1}{x - 2} - \\dfrac{4}{x^2 - 4}, \\quad x \\ne -2, \\ 2',
            '= \\dfrac{(x + 2) - 4}{(x - 2)(x + 2)} = \\dfrac{x - 2}{(x - 2)(x + 2)}',
            '= \\dfrac{1}{x + 2}, \\quad x \\ne -2, \\ 2',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the final numerator', md: 'After adding or subtracting, factor the numerator. If it shares a factor with the denominator, divide it out, and keep the restrictions.' },
      ],
      lines: [
        { say: 'Sometimes the answer simplifies further. Simplify one over x minus two, minus four over x squared minus four. x squared minus four is x minus two, times x plus two, so x is not negative two, and not two.', show: 'm.0', focus: 'm.0' },
        { say: 'The first fraction is missing x plus two. So the numerator is x plus two, minus four, which is x minus two.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the numerator, x minus two, is also a factor of the denominator. Divide it out, and the answer is one over x plus two. The restriction x not equal to two stays, because the original expression is undefined there.', show: ['m.2', 'tip'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Distribute the minus sign to the whole numerator', md: 'In $2(x - 2) - (x + 3)$, the minus sign changes **both** terms: $-x - 3$, not $-x + 3$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{2x - 4 - x + 3 = x - 1} \\qquad \\good{2x - 4 - x - 3 = x - 7}'] },
      ],
      lines: [
        { say: 'As with monomial denominators, the most common mistake is with the minus sign.', show: 'oops' },
        { say: 'In two times x minus two, minus the bracket x plus three, the minus sign changes both terms in the bracket: minus x, minus three. Writing minus x plus three gives x minus one, which is wrong. The numerator is x minus seven.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{3}{x - 1} + \\dfrac{2}{x + 4}$, where $x \\ne -4, \\ 1$.',
          choices: ['$\\dfrac{5x + 10}{(x - 1)(x + 4)}$', '$\\dfrac{5}{2x + 3}$', '$\\dfrac{5x + 14}{(x - 1)(x + 4)}$', '$\\dfrac{5x + 11}{(x - 1)(x + 4)}$'],
          answer: 0,
          working: '$\\dfrac{3(x + 4) + 2(x - 1)}{(x - 1)(x + 4)} = \\dfrac{3x + 12 + 2x - 2}{(x - 1)(x + 4)} = \\dfrac{5x + 10}{(x - 1)(x + 4)}$',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify three over x minus one, plus two over x plus four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The LCD is x minus one, times x plus four. The numerator is three times x plus four, plus two times x minus one: three x plus twelve, plus two x minus two, which is five x plus ten. Choice C gets the last sign wrong: two times negative one is negative two, not plus two.', show: 'q.answer' },
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
          items: ['Factor every denominator; the LCD uses each different factor once.', 'Multiply each numerator by the factors its denominator is missing, and bracket a numerator you subtract.', 'Check the final numerator for a common factor, and keep every restriction.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Factor every denominator. The LCD uses each different factor once.', show: 'sum.0' },
        { say: 'Multiply each numerator by the factors its denominator is missing, and put brackets around a numerator you subtract.', show: 'sum.1' },
        { say: 'And check the final numerator for a factor it shares with the denominator, keeping every restriction. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
