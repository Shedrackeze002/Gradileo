import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tile, tileIds, tileRow, U, XL } from './lib/m9-5-figures.ts';

// The three kinds of algebra tile, and the same three in red (negative), with a caption under each.
const kit = (id: string) =>
  figure(
    id,
    [
      tile({ id: 'sq', kind: 'x2', at: [0, 0] }),
      tile({ id: 'rect', kind: 'x', at: [XL + 0.8, 0] }),
      tile({ id: 'unit', kind: '1', at: [XL + U + 1.6, 0] }),
      tile({ id: 'nsq', kind: 'x2', neg: true, at: [XL + 2 * U + 3.2, 0] }),
      tile({ id: 'nrect', kind: 'x', neg: true, at: [2 * XL + 2 * U + 4, 0] }),
      tile({ id: 'nunit', kind: '1', neg: true, at: [2 * XL + 3 * U + 4.8, 0] }),
    ],
    300,
  );

// 2x² + 3x − 4: two x² tiles, three x-tiles and four red unit tiles.
const poly = (id: string) =>
  figure(
    id,
    [
      tileRow({
        blocks: [
          { id: 'a', kind: 'x2', n: 2, caption: '2x^2' },
          { id: 'b', kind: 'x', n: 3, caption: '3x' },
          { id: 'c', kind: '1', n: 4, neg: true, caption: '-4' },
        ],
        gap: 1,
      }),
    ],
    320,
  );

const video: Explainer = {
  id: 'm9-5-1',
  lessonId: 'm9-5-1',
  title: 'Introduction to Polynomials, Part 1: Terms, Coefficients and Constants',
  thumbnailTitle: 'Terms, Coefficients and Constants',
  thumbnail: 'pl',
  summary:
    'A term is a number, a variable, or a number multiplied by variables, and the sign in front of a term belongs to it: the terms of 5x² − 3x + 8 are 5x², −3x and 8. The coefficient is the number that multiplies the variable (5 and −3), and the constant term has no variable (8). In 4x² − x + 7, −x means −1x, so its coefficient is −1. Algebra tiles show terms: a big square for x², a long rectangle for x and a small square for 1, red when negative.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 1', title: 'Terms, Coefficients and Constants', subtitle: 'The parts of a polynomial' }],
      lines: [
        { say: 'The perimeter of a garden, the area of a rink, the points a team earns in a season: algebra lets you write all of these as expressions, like two x plus six, or x squared plus three x.', show: 'title' },
        { say: 'Expressions like these are called polynomials. In this part, you will learn the names of their parts, so you can talk about them clearly.' },
      ],
    },
    {
      chapter: 'Terms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['5x^2 - 3x + 8', '\\text{terms: } \\quad 5x^2 \\qquad {-3x} \\qquad 8'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Term', md: 'A **term** is a number, a variable, or a number multiplied by variables. The sign in front of a term belongs to it.' },
      ],
      lines: [
        { say: 'Look at the expression five x squared, minus three x, plus eight. It has a letter, x, called a variable. A variable is a letter that stands for a number.', show: 'm.0' },
        { say: 'The expression is built from three pieces, joined by plus and minus signs. Each piece is called a term.' },
        { say: 'A term is a number, a variable, or a number multiplied by variables.', show: 'def' },
        { say: 'So the terms here are five x squared, negative three x, and eight. Notice that the minus sign goes with the three x. The sign in front of a term belongs to it.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Coefficients and constants',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Term', 'Coefficient', 'What it is'],
          rows: [
            ['$5x^2$', '$5$', 'an $x^2$-term'],
            ['$-3x$', '$-3$', 'an $x$-term'],
            ['$8$', 'none', 'the constant term'],
          ],
        },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Coefficient and constant term', md: 'The **coefficient** is the number that multiplies the variable. A **constant term** has no variable, so its value never changes.' },
      ],
      lines: [
        { say: 'Each term with a variable has a coefficient. The coefficient is the number that multiplies the variable.', show: 'def' },
        { say: 'In five x squared, the coefficient is five.', show: 't.0', focus: 't.0' },
        { say: 'In negative three x, the coefficient is negative three. The minus sign belongs to the term, so it belongs to the coefficient as well.', show: 't.1', focus: 't.1' },
        { say: 'The last term, eight, has no variable at all. A term with no variable is called a constant term. Whatever number x stands for, this term is always eight. Its value never changes.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Name the parts',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'For $4x^2 - x + 7$, name the terms, the coefficient of $x^2$, the coefficient of $x$ and the constant term.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\text{Terms: } \\; 4x^2, \\quad {-x}, \\quad 7', '\\text{Coefficient of } x^2\\text{: } \\; 4', '{-x} = -1x\\text{, so the coefficient of } x \\text{ is } {-1}', '\\text{Constant term: } \\; 7'],
        },
      ],
      lines: [
        { say: 'Let’s practise. For four x squared, minus x, plus seven, name the terms, the coefficient of x squared, the coefficient of x, and the constant term.', show: 'q' },
        { say: 'The terms are separated by the plus and minus signs. They are four x squared, negative x, and seven.', show: 'm.0', focus: 'm.0' },
        { say: 'The coefficient of x squared is four.', show: 'm.1', focus: 'm.1' },
        { say: 'What about negative x? There is no number written in front of the x. But negative x means negative one times x. So the coefficient of x is negative one.', show: 'm.2', focus: 'm.2' },
        { say: 'The term with no variable is seven, so the constant term is seven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sign belongs to the term', md: 'In $4x^2 - x + 7$, the middle term is $-x$, not $x$. Keep the sign in front of a term with it.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = 1x \\quad \\text{coefficient } 1', '{-x} = -1x \\quad \\text{coefficient } {-1}'] },
      ],
      lines: [
        { say: 'Watch out for two things. First, the sign belongs to the term. In this polynomial, the middle term is negative x, not x. Always keep the sign in front of a term with it.', show: 'oops' },
        { say: 'Second, when there is no number in front of a variable, the coefficient is one. The term x means one x, so its coefficient is one.', show: 'm.0', focus: 'm.0' },
        { say: 'And negative x means negative one x, so its coefficient is negative one. It is not zero, because the x is still there.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Algebra tiles',
      layout: 'center',
      main: [kit('kit'), { kind: 'callout', id: 'key', tone: 'key', title: 'Algebra tiles', md: 'Big square: $x^2$. Long rectangle: $x$. Small square: $1$. A red tile is negative.' }],
      lines: [
        { say: 'You can also build terms with algebra tiles. Each tile has a value that matches its area.' },
        { say: 'The big blue square has two sides of length x, so its area is x squared. It is called an x squared tile.', show: 'kit.sq' },
        { say: 'The long green rectangle is x long and one wide, so its area is x. It is called an x tile.', show: 'kit.rect' },
        { say: 'The small orange square is one by one, so it is worth one. It is called a unit tile.', show: 'kit.unit' },
        { say: 'A red tile is negative. These three red tiles are worth negative x squared, negative x and negative one. Each tile has its value written on it as well.', show: ['kit.nsq', 'kit.nrect', 'kit.nunit', 'key'] },
      ],
    },
    {
      chapter: 'Tiles for a polynomial',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['2x^2 + 3x - 4'] }, poly('pl')],
      lines: [
        { say: 'Here is how to show two x squared, plus three x, minus four with algebra tiles.', show: 'm.0' },
        { say: 'The first term is two x squared, so use two x squared tiles. The coefficient, two, tells you how many tiles.', show: [...tileIds('pl', 'a', 2), 'pl.a-cap'], focus: tileIds('pl', 'a', 2) },
        { say: 'The next term is three x, so use three x tiles.', show: [...tileIds('pl', 'b', 3), 'pl.b-cap'], focus: tileIds('pl', 'b', 3) },
        { say: 'The constant term is negative four, so use four red unit tiles. Each one is worth negative one.', show: [...tileIds('pl', 'c', 4), 'pl.c-cap'], focus: tileIds('pl', 'c', 4) },
        { say: 'Each term is one group of tiles of the same kind. The number of tiles is the coefficient, and the colour shows the sign.', focus: 'pl' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For the polynomial $3x^2 - 7x - 2$, which pair gives the coefficient of $x$ and the constant term, in that order?',
          choices: ['$7$ and $2$', '$-7$ and $-2$', '$3$ and $-2$', '$-7$ and $2$'],
          answer: 1,
          working: 'The terms are $3x^2$, $-7x$ and $-2$. Each sign belongs to its term, so the coefficient of $x$ is $-7$ and the constant term is $-2$.',
        },
      ],
      lines: [
        { say: 'Your turn. For the polynomial three x squared, minus seven x, minus two, which pair gives the coefficient of x and the constant term, in that order? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The terms are three x squared, negative seven x, and negative two. Each sign belongs to its term, so the coefficient of x is negative seven, and the constant term is negative two. Choice A drops both minus signs.', show: 'q.answer' },
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
            'A term is a number, a variable, or a number times variables. The sign in front of a term belongs to it.',
            'The coefficient multiplies the variable: $x$ has coefficient $1$, and $-x$ has coefficient $-1$.',
            'The constant term has no variable.',
            'Algebra tiles: a big square for $x^2$, a long rectangle for $x$, a small square for $1$; red is negative.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A term is a number, a variable, or a number multiplied by variables. The sign in front of a term belongs to it.', show: 'sum.0' },
        { say: 'The coefficient is the number that multiplies the variable. The term x has a coefficient of one, and negative x has a coefficient of negative one.', show: 'sum.1' },
        { say: 'The constant term is the term with no variable.', show: 'sum.2' },
        { say: 'And algebra tiles show terms: a big square for x squared, a long rectangle for x, and a small square for one, in red when negative. In the next part, you will find the degree of a polynomial. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
