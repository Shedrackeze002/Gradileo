import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tileIds, tileRow } from './lib/m9-5-figures.ts';

// x² − 4x + 3: three groups of tiles, one for each term.
const tri = (id: string) =>
  figure(
    id,
    [
      tileRow({
        blocks: [
          { id: 'a', kind: 'x2', n: 1, caption: 'x^2' },
          { id: 'b', kind: 'x', n: 4, neg: true, caption: '-4x' },
          { id: 'c', kind: '1', n: 3, perCol: 3, caption: '3' },
        ],
        gap: 1.2,
      }),
    ],
    420,
  );

const video: Explainer = {
  id: 'm9-5-1-c',
  lessonId: 'm9-5-1',
  title: 'Introduction to Polynomials, Part 3: Monomials, Binomials and Trinomials',
  thumbnailTitle: 'Monomials, Binomials, Trinomials',
  thumbnail: 'tr',
  summary:
    'Polynomials are named by how many terms they have: a monomial has one term (−6x²), a binomial two (2x + 5) and a trinomial three (x² − 4x + 3). They are usually written in descending order, the highest degree first and the constant last, each term keeping its sign: 6 − 2x² + x is a trinomial, −2x² + x + 6 in descending order. Count terms, not signs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 3', title: 'Monomials, Binomials and Trinomials', subtitle: 'Count the terms' }],
      lines: [
        { say: 'A bicycle has two wheels, and a tricycle has three. Polynomials get names in the same way, by counting.', show: 'title' },
        { say: 'In this part, you will name polynomials by their number of terms, and write them in a standard order, called descending order.' },
      ],
    },
    {
      chapter: 'Counting terms',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Name', 'Number of terms', 'Example'],
          rows: [
            ['monomial', '$1$', '$-6x^2$'],
            ['binomial', '$2$', '$2x + 5$'],
            ['trinomial', '$3$', '$x^2 - 4x + 3$'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Word parts', md: '**Mono** means one, **bi** means two, and **tri** means three.' },
      ],
      lines: [
        { say: 'Polynomials are named by how many terms they have.', show: 'tip' },
        { say: 'A monomial has one term, like negative six x squared. Mono means one.', show: 't.0', focus: 't.0' },
        { say: 'A binomial has two terms, like two x plus five. Bi means two, as in bicycle.', show: 't.1', focus: 't.1' },
        { say: 'A trinomial has three terms, like x squared, minus four x, plus three. Tri means three, as in tricycle.', show: 't.2', focus: 't.2' },
        { say: 'A single number, like nine, is one term, so it is a monomial as well.' },
      ],
    },
    {
      chapter: 'Terms as tiles',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'xl', lines: ['x^2 - 4x + 3'] }, tri('tr')],
      lines: [
        { say: 'With algebra tiles, each term is a group of tiles of one kind. Here is x squared, minus four x, plus three.', show: 'm.0' },
        { say: 'One x squared tile is the first term.', show: [...tileIds('tr', 'a', 1), 'tr.a-cap'], focus: tileIds('tr', 'a', 1) },
        { say: 'Four red x tiles make the second term, negative four x.', show: [...tileIds('tr', 'b', 4), 'tr.b-cap'], focus: tileIds('tr', 'b', 4) },
        { say: 'And three unit tiles make the constant term, which is three.', show: [...tileIds('tr', 'c', 3), 'tr.c-cap'], focus: tileIds('tr', 'c', 3) },
        { say: 'Three groups of tiles means three terms, so this polynomial is a trinomial.', focus: 'tr' },
      ],
    },
    {
      chapter: 'Descending order',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Descending order', md: 'Write the term with the **highest degree first**, then the next highest, and the **constant term last**. Each term keeps its sign.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3 + x^2 - 4x', 'x^2 - 4x + 3'] },
      ],
      lines: [
        { say: 'Polynomials are usually written in descending order. Descending means going down.', show: 'def' },
        { say: 'So the term with the highest degree comes first, then the next highest, and the constant term comes last.' },
        { say: 'For example, three plus x squared minus four x has the same terms as before, in a jumbled order.', show: 'm.0', focus: 'm.0' },
        { say: 'In descending order, the x squared term goes first, then negative four x, then three. Each term keeps its own sign as it moves.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Classify and reorder',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Classify $6 - 2x^2 + x$ and write it in descending order.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Terms: } \\; 6, \\quad {-2x^2}, \\quad x', '3 \\text{ terms: a trinomial}', '{-2x^2} + x + 6'] },
      ],
      lines: [
        { say: 'Let’s try one. Classify six, minus two x squared, plus x, and write it in descending order.', show: 'q' },
        { say: 'First, find the terms. They are six, negative two x squared, and x. The minus sign belongs to the two x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'There are three terms, so it is a trinomial.', show: 'm.1', focus: 'm.1' },
        { say: 'Now reorder. The x squared term has the highest degree, so it goes first, with its minus sign. Then the x term, and the constant six goes last.', show: 'm.2', focus: 'm.2' },
        { say: 'In descending order, it is negative two x squared, plus x, plus six.' },
      ],
    },
    {
      chapter: 'Count terms, not signs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Count before you classify', md: 'Count the **terms**, never the signs. $-2x^2 + x + 6$ has two signs between its terms, but three terms.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['{-2x^2} \\;+\\; x \\;+\\; 6 \\qquad 3 \\text{ terms}'] },
      ],
      lines: [
        { say: 'A tip: count the terms, never the signs.', show: 'tip' },
        { say: 'Negative two x squared, plus x, plus six has two plus signs between its terms, and a minus sign at the front. But it has three terms. It is a trinomial.', show: 'm.0', focus: 'm.0' },
        { say: 'Also, when two terms are the same kind, like three x and two x, they can be joined into one term, five x. Count the terms after they are joined. You will learn how to join terms in the next lesson.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $5 + 3x - x^2$ in descending order and name its type.',
          choices: ['$-x^2 + 3x + 5$, a trinomial', '$x^2 + 3x + 5$, a trinomial', '$-x^2 + 3x + 5$, a binomial', '$5 + 3x - x^2$, a monomial'],
          answer: 0,
          working: 'The terms are $5$, $3x$ and $-x^2$. The $x^2$-term goes first and keeps its sign: $-x^2 + 3x + 5$. It has three terms, so it is a trinomial.',
        },
      ],
      lines: [
        { say: 'Your turn. Write five, plus three x, minus x squared in descending order, and name its type. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The terms are five, three x, and negative x squared. The x squared term goes first, and it keeps its minus sign. There are three terms, so it is a trinomial. Choice C counts the two signs instead of the three terms.', show: 'q.answer' },
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
            'One term: monomial. Two terms: binomial. Three terms: trinomial.',
            'Descending order: the highest degree first, the constant term last.',
            'Each term keeps its sign when it moves.',
            'Count the terms, not the signs.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A monomial has one term, a binomial has two, and a trinomial has three.', show: 'sum.0' },
        { say: 'In descending order, the term with the highest degree comes first, and the constant term comes last.', show: 'sum.1' },
        { say: 'Each term keeps its sign when it moves.', show: 'sum.2' },
        { say: 'And count the terms, not the signs. In the next lesson, you will join like terms to simplify polynomials. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
