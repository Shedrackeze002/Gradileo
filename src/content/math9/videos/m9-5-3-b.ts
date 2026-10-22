import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tileIds, tileRow } from './lib/m9-5-figures.ts';

// 2x² + 4x − 7 on top, and its opposite, −2x² − 4x + 7, below: every tile flipped.
const flip = (id: string) =>
  figure(
    id,
    [
      tileRow({
        name: 'a',
        blocks: [
          { id: 's', kind: 'x2', n: 2 },
          { id: 'x', kind: 'x', n: 4 },
          { id: 'u', kind: '1', n: 7, neg: true },
        ],
        at: [0, 2.8],
        small: true,
      }),
      tileRow({
        name: 'b',
        blocks: [
          { id: 's', kind: 'x2', n: 2, neg: true },
          { id: 'x', kind: 'x', n: 4, neg: true },
          { id: 'u', kind: '1', n: 7 },
        ],
        small: true,
      }),
    ],
    500,
  );

const TOP = [...tileIds('fl', 's', 2, 0, 'a'), ...tileIds('fl', 'x', 4, 0, 'a'), ...tileIds('fl', 'u', 7, 0, 'a')];
const BOTTOM = [...tileIds('fl', 's', 2, 0, 'b'), ...tileIds('fl', 'x', 4, 0, 'b'), ...tileIds('fl', 'u', 7, 0, 'b')];

const video: Explainer = {
  id: 'm9-5-3-b',
  lessonId: 'm9-5-3',
  title: 'Adding and Subtracting Polynomials, Part 2: Subtracting Polynomials',
  thumbnailTitle: 'Subtracting Polynomials',
  thumbnail: 'fl',
  summary:
    'Subtracting is the same as adding the opposite: 7 − 3 = 7 + (−3). The opposite of a polynomial has the sign of every term changed (with tiles, every tile flips), so the opposite of 2x² + 4x − 7 is −2x² − 4x + 7. Then (5x² − 2x + 3) − (2x² + 4x − 7) = 5x² − 2x + 3 − 2x² − 4x + 7 = 3x² − 6x + 10. Changing only the first sign gives 3x² + 2x − 4, which fails the check with x = 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 2', title: 'Subtracting Polynomials', subtitle: 'Add the opposite' }],
      lines: [
        { say: 'Subtracting is where most mistakes happen with polynomials. But one simple idea makes it easy.', show: 'title' },
        { say: 'In this part, you will subtract a polynomial by adding its opposite.' },
      ],
    },
    {
      chapter: 'Add the opposite',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['7 - 3 = 4 \\qquad 7 + (-3) = 4'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Opposite of a polynomial', md: 'The **opposite** of a polynomial has the sign of **every** term changed. The opposite of $2x^2 + 4x - 7$ is $-2x^2 - 4x + 7$.' },
      ],
      lines: [
        { say: 'Start with numbers. Seven minus three is four. And seven plus negative three is also four. Subtracting a number is the same as adding its opposite.', show: 'm.0' },
        { say: 'Polynomials work the same way. To subtract a polynomial, you add its opposite.' },
        { say: 'The opposite of a polynomial has the sign of every term changed. The opposite of two x squared, plus four x, minus seven, is negative two x squared, minus four x, plus seven.', show: 'def' },
      ],
    },
    {
      chapter: 'Flip every tile',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2x^2 + 4x - 7 \\quad \\to \\quad {-2x^2} - 4x + 7'] }, flip('fl')],
      lines: [
        { say: 'Here is two x squared, plus four x, minus seven, with tiles: two x squared tiles, four x tiles, and seven red unit tiles.', show: TOP },
        { say: 'Real algebra tiles have a coloured side and a red side. To make the opposite, flip every tile over.', focus: TOP },
        { say: 'The x squared tiles become red, the x tiles become red, and the red unit tiles become positive. Every single tile changes.', show: [...BOTTOM, 'm.0'], focus: BOTTOM },
        { say: 'That is negative two x squared, minus four x, plus seven: the opposite.', focus: 'fl' },
      ],
    },
    {
      chapter: 'Subtract two trinomials',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '(5x^2 - 2x + 3) - (2x^2 + 4x - 7)',
            '= 5x^2 - 2x + 3 \\bad{\\,-\\,2x^2 - 4x + 7}',
            '= \\adj{(5x^2 - 2x^2)} + \\good{(-2x - 4x)} + \\opp{(3 + 7)}',
            '= \\adj{3x^2} \\good{\\,-\\,6x} \\opp{\\,+\\,10}',
          ],
        },
      ],
      lines: [
        { say: 'Now subtract: five x squared, minus two x, plus three, take away two x squared, plus four x, minus seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Add the opposite of the second polynomial. Change the sign of every one of its terms: two x squared becomes negative two x squared, plus four x becomes minus four x, and minus seven becomes plus seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Group the like terms.', show: 'm.2', focus: 'm.2' },
        { say: 'Add the coefficients. Five minus two is three. Negative two minus four is negative six. Three plus seven is ten.', show: 'm.3', focus: 'm.3' },
        { say: 'So the difference is three x squared, minus six x, plus ten.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting only the first term', md: 'The minus sign in front of the bracket applies to **every** term inside it, not just the first.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['5x^2 - 2x + 3 - 2x^2 + 4x - 7 = 3x^2 + 2x - 4 \\;\\bad{\\times}', '5x^2 - 2x + 3 - 2x^2 - 4x + 7 = 3x^2 - 6x + 10 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for the most common mistake: changing the sign of the first term only.', show: 'oops' },
        { say: 'Here, only two x squared became negative. Plus four x and minus seven were left alone, which gives three x squared, plus two x, minus four. That is wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'The minus sign in front of the bracket applies to every term inside it. So plus four x becomes minus four x, and minus seven becomes plus seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check by substituting',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 1\\text{:}', '(5 - 2 + 3) - (2 + 4 - 7) = 6 - (-1) = 7', '3 - 6 + 10 = 7 \\;\\good{\\checkmark}', '3 + 2 - 4 = 1 \\;\\bad{\\times}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check by substituting', md: 'Substitute an easy value, such as $x = 1$, into the question and into your answer.' },
      ],
      lines: [
        { say: 'Check by substituting an easy value, such as x equal to one. Then every x squared and every x is just one.', show: ['tip', 'm.0'] },
        { say: 'In the question: five minus two plus three is six. Two plus four minus seven is negative one. Six minus negative one is seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Our answer: three minus six plus ten is seven as well. They match, so the answer is very likely right.', show: 'm.2', focus: 'm.2' },
        { say: 'The wrong answer gives three plus two minus four, which is one, not seven. The check catches the mistake.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $(4x^2 + x - 2) - (x^2 - 3x + 5)$.',
          choices: ['$3x^2 - 2x + 3$', '$5x^2 - 2x + 3$', '$3x^2 + 4x - 7$', '$3x^2 + 4x + 3$'],
          answer: 2,
          working: 'Add the opposite: $4x^2 + x - 2 - x^2 + 3x - 5 = 3x^2 + 4x - 7$. Check with $x = 1$: $3 - 3 = 0$ and $3 + 4 - 7 = 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify four x squared, plus x, minus two, take away x squared, minus three x, plus five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Change the sign of every term in the second polynomial: negative x squared, plus three x, minus five. Then collect like terms: three x squared, plus four x, minus seven. Choice A changes the sign of the first term only.', show: 'q.answer' },
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
            'Subtracting is adding the opposite: $7 - 3 = 7 + (-3)$.',
            'The opposite of a polynomial changes the sign of **every** term (every tile flips).',
            'Then collect like terms as usual.',
            'Check by substituting a value such as $x = 1$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Subtracting is the same as adding the opposite.', show: 'sum.0' },
        { say: 'The opposite of a polynomial changes the sign of every term. With tiles, every tile flips.', show: 'sum.1' },
        { say: 'Then collect like terms as usual.', show: 'sum.2' },
        { say: 'And check by substituting a value, such as x equal to one. In the next part, you will use adding and subtracting to solve problems. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
