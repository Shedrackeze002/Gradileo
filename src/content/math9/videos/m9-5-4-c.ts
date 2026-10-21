import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

// The two products in 2x(x + 3) − 4(x − 1), as area models side by side.
const models = (id: string) =>
  figure(
    id,
    [
      areaModel({ name: 'a', top: ['x', '3'], side: ['2x'], cells: [['2x^2', '6x']] }),
      areaModel({ name: 'b', top: ['x', '-1'], side: ['-4'], cells: [['-4x', '4']], at: [8.5, 0] }),
    ],
    240,
  );

const video: Explainer = {
  id: 'm9-5-4-c',
  lessonId: 'm9-5-4',
  title: 'Multiplying and Dividing by a Monomial, Part 3: Expanding and Simplifying',
  thumbnailTitle: 'Expand, Then Simplify',
  thumbnail: 'md',
  summary:
    'Some expressions need two products and then like terms. In 2x(x + 3) − 4(x − 1), the minus sign belongs to the 4, so the second monomial is −4: 2x(x + 3) = 2x² + 6x and −4(x − 1) = −4x + 4. Collecting like terms gives 2x² + 2x + 4, and x = 2 gives 16 for both. Writing −4x − 4 instead loses a sign and fails the check.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 3', title: 'Expanding and Simplifying', subtitle: 'Two products, then like terms' }],
      lines: [
        { say: 'Some expressions have two products in them, like two x times x plus three, minus four times x minus one.', show: 'title' },
        { say: 'In this part, you will expand each product, and then collect the like terms.' },
      ],
    },
    {
      chapter: 'Two products',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['2x(x + 3) - 4(x - 1)'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The sign goes with the number', md: 'The minus sign in front of the $4$ belongs to it. The second product is $-4$ times $(x - 1)$.' },
      ],
      lines: [
        { say: 'Expand and simplify two x times x plus three, minus four times x minus one.', show: 'm.0' },
        { say: 'There are two products here. The first is two x times x plus three.' },
        { say: 'For the second product, the minus sign in front of the four belongs to it. So the second product is negative four, times x minus one.', show: 'key' },
      ],
    },
    {
      chapter: 'Expand each product',
      layout: 'center',
      main: [models('md'), { kind: 'math', id: 'm', size: 'lg', lines: ['2x(x + 3) = 2x^2 + 6x', '-4(x - 1) = -4x + 4'] }],
      lines: [
        { say: 'Expand the first product with an area model. Two x times x is two x squared. Two x times three is six x.', show: ['md.a-top', 'md.a-side', 'md.a-outline', 'md.a-grid', 'md.a-c0-0', 'md.a-c0-1', 'm.0'], focus: 'm.0' },
        { say: 'Now the second product. Negative four times x is negative four x.', show: ['md.b-top', 'md.b-side', 'md.b-outline', 'md.b-grid', 'md.b-c0-0'], focus: 'md.b-c0-0' },
        { say: 'And negative four times negative one is positive four. The negative four multiplies both terms, and the signs are the same.', show: ['md.b-c0-1', 'm.1'], focus: ['md.b-c0-1', 'm.1'] },
      ],
    },
    {
      chapter: 'Collect like terms',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['2x(x + 3) - 4(x - 1)', '= 2x^2 + 6x - 4x + 4', '= 2x^2 + \\good{(6x - 4x)} + 4', '= 2x^2 + 2x + 4'],
        },
      ],
      lines: [
        { say: 'Put the two products together: two x squared, plus six x, minus four x, plus four.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Now collect the like terms. The only like terms are the x terms: six x and negative four x.', show: 'm.2', focus: 'm.2' },
        { say: 'Six minus four is two, so they make two x. The answer is two x squared, plus two x, plus four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 2\\text{:}', '2(2)(2 + 3) - 4(2 - 1) = 20 - 4 = 16', '2(4) + 2(2) + 4 = 8 + 4 + 4 = 16 \\;\\good{\\checkmark}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Choose a good value', md: 'Avoid a value that makes a bracket zero, such as $x = 1$ here. It can hide a mistake.' },
      ],
      lines: [
        { say: 'Check by substituting x equal to two into the question and the answer.', show: 'm.0' },
        { say: 'In the question: two times two, times two plus three, is four times five, which is twenty. Four times two minus one is four. Twenty minus four is sixteen.', show: 'm.1', focus: 'm.1' },
        { say: 'In the answer: two times four, plus two times two, plus four, is eight plus four plus four, which is sixteen as well. It matches.', show: 'm.2', focus: 'm.2' },
        { say: 'A tip: here, x equal to one would make the bracket x minus one equal to zero, which can hide a mistake. Two is a better choice.', show: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Losing a sign', md: '$-4(x - 1)$ is $-4x + 4$, not $-4x - 4$. The $-4$ multiplies **both** terms, and $(-4)(-1) = +4$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2x^2 + 6x - 4x - 4 = 2x^2 + 2x - 4 \\;\\bad{\\times}', 'x = 2\\text{: } \\; 8 + 4 - 4 = 8, \\text{ not } 16'] },
      ],
      lines: [
        { say: 'Watch out for losing a sign. Some students write negative four times x minus one as negative four x minus four.', show: 'oops' },
        { say: 'That gives two x squared, plus two x, minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'The check catches it. With x equal to two, that gives eight, not sixteen. Negative four times negative one is positive four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Expand and simplify $3(x + 2) - x(x - 5)$.',
          choices: ['$-x^2 - 2x + 6$', '$-x^2 + 8x + 6$', '$x^2 + 8x + 6$', '$-x^2 + 8x + 2$'],
          answer: 1,
          working: '$3(x + 2) = 3x + 6$ and $-x(x - 5) = -x^2 + 5x$. Together: $3x + 6 - x^2 + 5x = -x^2 + 8x + 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. Expand and simplify three times x plus two, minus x times x minus five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Three times x plus two is three x plus six. Negative x times x minus five is negative x squared plus five x. Then three x plus five x is eight x. Choice A forgets that negative x times negative five is positive five x.', show: 'q.answer' },
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
            'Expand each product. A minus sign in front of a number belongs to it.',
            'The monomial multiplies **every** term in its brackets.',
            'Then collect like terms: $2x(x + 3) - 4(x - 1) = 2x^2 + 2x + 4$.',
            'Check with a value that does not make a bracket zero.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Expand each product first. A minus sign in front of a number belongs to that number.', show: 'sum.0' },
        { say: 'The monomial multiplies every term in its brackets.', show: 'sum.1' },
        { say: 'Then collect the like terms.', show: 'sum.2' },
        { say: 'And check with a value that does not make a bracket zero. In the next part, you will divide a polynomial by a monomial. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
