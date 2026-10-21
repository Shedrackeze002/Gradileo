import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tag, tile, U, XL } from './lib/m9-5-figures.ts';

// The three kinds of tile, with the degree of each written under it.
const kinds = (id: string) =>
  figure(
    id,
    [
      tile({ id: 'sq', kind: 'x2', at: [0, 0] }),
      tile({ id: 'rect', kind: 'x', at: [XL + 1.6, 0] }),
      tile({ id: 'unit', kind: '1', at: [XL + U + 3.2, 0] }),
      tag({ id: 'd2', at: [XL / 2, -0.25], tex: '\\text{degree } 2', tone: 'adj', place: 'below' }),
      tag({ id: 'd1', at: [XL + 1.6 + U / 2, -0.25], tex: '\\text{degree } 1', tone: 'good', place: 'below' }),
      tag({ id: 'd0', at: [XL + U + 3.2 + U / 2, -0.25], tex: '\\text{degree } 0', tone: 'opp', place: 'below' }),
    ],
    440,
  );

const video: Explainer = {
  id: 'm9-5-1-b',
  lessonId: 'm9-5-1',
  title: 'Introduction to Polynomials, Part 2: Polynomials and Their Degree',
  thumbnailTitle: 'The Degree of a Polynomial',
  thumbnail: 'kd',
  summary:
    'A polynomial is one term, or several terms added or subtracted, each a number or a number times variables with whole-number exponents. The degree of a term is the sum of the exponents on its variables (5x² has degree 2, −3x degree 1, and 8 degree 0), and the degree of a polynomial is the highest degree of its terms: 7 − 4x + x² has degree 2, and so does 3xy − 5x + 2, because xy has degree 1 + 1. The degree is not the number of terms.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 2', title: 'Polynomials and Their Degree', subtitle: 'Look at the exponents' }],
      lines: [
        { say: 'In the last part, you learned the names of the parts of a term. Now let’s look at whole polynomials, and one number that describes each of them: its degree.', show: 'title' },
        { say: 'In this part, you will learn exactly what a polynomial is, and how to find its degree.' },
      ],
    },
    {
      chapter: 'Polynomials',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Polynomial', md: 'A **polynomial** is one term, or several terms added or subtracted. Each term is a number, or a number times variables with whole-number exponents.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x^2 = x \\times x \\qquad \\text{exponent } 2', '3x^2 - 2x + 1 \\qquad 4xy \\qquad 7 - x'] },
      ],
      lines: [
        { say: 'A polynomial is one term, or several terms added or subtracted.', show: 'def' },
        { say: 'Each term is a number, or a number times variables with whole-number exponents. An exponent is the small raised number. In x squared, the exponent is two, and it means x times x.', show: 'm.0', focus: 'm.0' },
        { say: 'Whole-number exponents are zero, one, two, three, and so on. So these are all polynomials: three x squared, minus two x, plus one.', show: 'm.1', focus: 'm.1' },
        { say: 'Four x y is a polynomial with just one term. And seven minus x is a polynomial with two terms.' },
      ],
    },
    {
      chapter: 'Degree of a term',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Degree of a term', md: 'The **degree of a term** is the sum of the exponents on its variables.' },
        {
          kind: 'table',
          id: 't',
          head: ['Term', 'Exponents', 'Degree'],
          rows: [
            ['$5x^2$', '$x$ has exponent $2$', '$2$'],
            ['$-3x$', '$x = x^1$, exponent $1$', '$1$'],
            ['$8$', 'no variable', '$0$'],
          ],
        },
      ],
      lines: [
        { say: 'Every term has a degree. The degree of a term is the sum of the exponents on its variables.', show: 'def' },
        { say: 'In five x squared, the exponent on x is two, so the degree is two.', show: 't.0', focus: 't.0' },
        { say: 'In negative three x, there seems to be no exponent. But x is the same as x to the power one. So the degree is one.', show: 't.1', focus: 't.1' },
        { say: 'And a constant term like eight has no variable at all, so its degree is zero.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Degree and tiles',
      layout: 'center',
      main: [kinds('kd')],
      lines: [
        { say: 'The algebra tiles match the degrees. The x squared tile has sides x and x, so it stands for a term of degree two.', show: ['kd.sq', 'kd.d2'] },
        { say: 'The x tile has one side of length x, so it stands for a term of degree one.', show: ['kd.rect', 'kd.d1'] },
        { say: 'And the unit tile has no x at all, so it stands for a term of degree zero.', show: ['kd.unit', 'kd.d0'] },
      ],
    },
    {
      chapter: 'Degree of a polynomial',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Degree of a polynomial', md: 'The **degree of a polynomial** is the highest degree of any of its terms.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['7 - 4x + x^2', '\\text{degrees of the terms: } \\; 0, \\; 1, \\; 2', '\\text{highest: } 2 \\text{, so the degree is } 2'] },
      ],
      lines: [
        { say: 'A whole polynomial has a degree as well. The degree of a polynomial is the highest degree of any of its terms.', show: 'def' },
        { say: 'What is the degree of seven, minus four x, plus x squared?', show: 'm.0', focus: 'm.0' },
        { say: 'The terms are seven, negative four x, and x squared. Their degrees are zero, one and two.', show: 'm.1', focus: 'm.1' },
        { say: 'The highest of these is two, so the polynomial has degree two. It does not matter that the x squared term is written last.', show: 'm.2', focus: 'm.2' },
        { say: 'In this unit, you will work with polynomials of degree two or less.' },
      ],
    },
    {
      chapter: 'Two variables',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['3xy - 5x + 2', '3xy = 3x^1y^1 \\text{: degree } 1 + 1 = 2', '{-5x} \\text{: degree } 1 \\qquad 2 \\text{: degree } 0', '\\text{The polynomial has degree } 2.'] },
      ],
      lines: [
        { say: 'Some terms have two variables. What is the degree of three x y, minus five x, plus two?', show: 'm.0', focus: 'm.0' },
        { say: 'The term three x y means three times x to the power one, times y to the power one. Add the exponents: one plus one is two. So this term has degree two.', show: 'm.1', focus: 'm.1' },
        { say: 'Negative five x has degree one, and the constant two has degree zero.', show: 'm.2', focus: 'm.2' },
        { say: 'The highest degree is two, so the polynomial has degree two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Degree is not the number of terms', md: 'Count the terms to name the type of polynomial. Look at the exponents to find the degree.' },
        {
          kind: 'table',
          id: 't',
          head: ['Polynomial', 'Number of terms', 'Degree'],
          rows: [
            ['$x^2 + 1$', '$2$', '$2$'],
            ['$6x - 1$', '$2$', '$1$'],
          ],
        },
      ],
      lines: [
        { say: 'Watch out: the degree is not the number of terms.', show: 'oops' },
        { say: 'The polynomial x squared plus one has two terms. Its degree is two, but that is because of the exponent on x squared, not because there are two terms.', show: 't.0', focus: 't.0' },
        { say: 'And six x minus one also has two terms, but its degree is one. The highest exponent on x is one.', show: 't.1', focus: 't.1' },
        { say: 'So count the terms to name the type of polynomial, which is the next part. Look at the exponents to find the degree.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the degree of the polynomial $5xy + 3x - 8$?',
          choices: ['$1$', '$3$', '$5$', '$2$'],
          answer: 3,
          working: '$5xy = 5x^1y^1$ has degree $1 + 1 = 2$, $3x$ has degree $1$ and $-8$ has degree $0$. The highest is $2$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the degree of the polynomial five x y, plus three x, minus eight? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, two. The term five x y has x to the power one and y to the power one, so its degree is one plus one, which is two. That is the highest degree. Choice B counts the terms instead: there are three terms, but the degree comes from the exponents.', show: 'q.answer' },
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
            'A polynomial is one term, or several terms added or subtracted, with whole-number exponents.',
            'The degree of a term is the sum of the exponents on its variables. A constant has degree $0$.',
            'The degree of a polynomial is the highest degree of its terms.',
            'The degree is not the number of terms.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A polynomial is one term, or several terms added or subtracted, with whole-number exponents.', show: 'sum.0' },
        { say: 'The degree of a term is the sum of the exponents on its variables. A constant term has degree zero.', show: 'sum.1' },
        { say: 'The degree of a polynomial is the highest degree of any of its terms.', show: 'sum.2' },
        { say: 'And the degree is not the number of terms. In the next part, you will name polynomials by counting their terms. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
