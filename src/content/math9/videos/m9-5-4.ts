import type { Explainer } from '@/video/script.ts';
import { areaModel, X } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';
import { cellIds, measure, upTo } from './lib/m9-5-figures.ts';

// A rectangle 3x tall and 2x wide, filled with six x² tiles.
const rect = (id: string) =>
  figure(
    id,
    [
      areaModel({
        top: ['x', 'x'],
        side: ['x', 'x', 'x'],
        cells: [
          ['x^2', 'x^2'],
          ['x^2', 'x^2'],
          ['x^2', 'x^2'],
        ],
        tiles: true,
      }),
      measure({ id: 'w', from: [0, 0.5], to: [2 * X, 0.5], tex: '2x', tone: 'adj' }),
      measure({ id: 'h', from: [-0.5, 0], to: [-0.5, -3 * X], tex: '3x', tone: 'opp' }),
    ],
    560,
  );

const video: Explainer = {
  id: 'm9-5-4',
  lessonId: 'm9-5-4',
  title: 'Multiplying and Dividing by a Monomial, Part 1: Multiplying Monomials',
  thumbnailTitle: 'Multiplying Monomials',
  thumbnail: 'rc',
  summary:
    'A rectangle 3x by 2x holds six x² tiles, so 3x × 2x = 6x². To multiply monomials, multiply the coefficients, then multiply the variables: x · x = x² and x · y = xy. With the sign rules, (−4x)(5x) = −20x², (3x)(−2y) = −6xy and (−2)(−7x) = 14x. Remember that x · x is x², not 2x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 1', title: 'Multiplying Monomials', subtitle: 'Multiply the numbers, then the variables' }],
      lines: [
        { say: 'A rectangular rink is two x metres wide and three x minus five metres long. What is its area? To answer, you multiply polynomials.', show: 'title' },
        { say: 'In this lesson, you will multiply and divide polynomials by monomials. Remember, a monomial is a polynomial with just one term. In this part, you will multiply one monomial by another.' },
      ],
    },
    {
      chapter: 'A rectangle of tiles',
      layout: 'split',
      left: [rect('rc')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\text{area} = 3x \\times 2x', '= 6x^2'] }],
      lines: [
        { say: 'Think of a rectangle that is three x tall and two x wide. Its area is three x times two x.', show: ['rc.outline', 'rc.w', 'rc.h', 'm.0'] },
        { say: 'Fill it with algebra tiles. Each tile is x by x, so each one is an x squared tile.', show: cellIds('rc', [0], upTo(2)), focus: cellIds('rc', [0], upTo(2)) },
        { say: 'There are two tiles across, and three rows of them.', show: [...cellIds('rc', [1, 2], upTo(2)), 'rc.grid'], focus: cellIds('rc', [1, 2], upTo(2)) },
        { say: 'That makes three times two, or six x squared tiles. So three x times two x is six x squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Multiplying monomials', md: 'Multiply the **coefficients**, then multiply the **variables**: $x \\cdot x = x^2$ and $x \\cdot y = xy$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3x \\times 2x = (3 \\times 2)(x \\times x)', '= 6x^2'] },
      ],
      lines: [
        { say: 'The tiles show the rule. To multiply monomials, multiply the coefficients, then multiply the variables.', show: 'def' },
        { say: 'For three x times two x, the coefficients give three times two, which is six.', show: 'm.0', focus: 'm.0' },
        { say: 'The variables give x times x, which is x squared. So the product is six x squared.', show: 'm.1', focus: 'm.1' },
        { say: 'When the variables are different, write them side by side. The dot means times: x times y is written x y.' },
      ],
    },
    {
      chapter: 'Products of monomials',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $(-4x)(5x)$, $(3x)(-2y)$ and $(-2)(-7x)$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['(-4)(5) = -20, \\quad x \\cdot x = x^2 \\quad \\to \\quad {-20x^2}', '(3)(-2) = -6, \\quad x \\cdot y = xy \\quad \\to \\quad {-6xy}', '(-2)(-7) = 14 \\quad \\to \\quad 14x'],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Sign rules', md: 'The same signs give a **positive** product. Different signs give a **negative** product.' },
      ],
      lines: [
        { say: 'Let’s practise with negatives. Find negative four x times five x, three x times negative two y, and negative two times negative seven x.', show: 'q' },
        { say: 'Remember the sign rules. When you multiply, the same signs give a positive product, and different signs give a negative product.', show: 'tip' },
        { say: 'Negative four times five is negative twenty, and x times x is x squared. So the first product is negative twenty x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Three times negative two is negative six, and x times y is x y. So the second product is negative six x y.', show: 'm.1', focus: 'm.1' },
        { say: 'Negative two times negative seven is positive fourteen. There is only one x, so the third product is fourteen x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Times or plus?', md: '$x \\cdot x = x^2$, an $x^2$-tile. But $x + x = 2x$, two $x$-tiles.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x \\cdot x = x^2 \\qquad x + x = 2x', '3x \\times 2x = 6x^2, \\text{ not } 6x \\text{ or } 5x'] },
      ],
      lines: [
        { say: 'Watch out for mixing up times and plus. Some students write x times x as two x.', show: 'oops' },
        { say: 'But x times x is x squared: the area of an x by x square. And x plus x is two x: two x tiles side by side.', show: 'm.0', focus: 'm.0' },
        { say: 'So three x times two x is six x squared. It is not six x, and it is not five x, which would come from adding.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $(-6x)(3x)$.',
          choices: ['$-18x^2$', '$18x^2$', '$-18x$', '$-3x^2$'],
          answer: 0,
          working: 'Coefficients: $(-6)(3) = -18$, because the signs are different. Variables: $x \\cdot x = x^2$. So $(-6x)(3x) = -18x^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify negative six x times three x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiply the coefficients: negative six times three is negative eighteen, because the signs are different. Then x times x is x squared. Choice C forgets that x times x is x squared.', show: 'q.answer' },
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
            'A rectangle $3x$ by $2x$ holds six $x^2$-tiles: $3x \\times 2x = 6x^2$.',
            'Multiply the coefficients, then the variables: $x \\cdot x = x^2$ and $x \\cdot y = xy$.',
            'Use the sign rules: the same signs give a positive product.',
            '$x \\cdot x = x^2$, but $x + x = 2x$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rectangle three x by two x holds six x squared tiles, so three x times two x is six x squared.', show: 'sum.0' },
        { say: 'To multiply monomials, multiply the coefficients, then the variables.', show: 'sum.1' },
        { say: 'Use the sign rules: the same signs give a positive product, and different signs give a negative one.', show: 'sum.2' },
        { say: 'And remember that x times x is x squared, but x plus x is two x. In the next part, you will multiply a polynomial with several terms by a monomial. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
