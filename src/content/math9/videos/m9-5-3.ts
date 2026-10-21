import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pairIds, pairRows } from './lib/m9-5-figures.ts';

// (2x² + 3x − 4) + (x² − 5x + 6): positive tiles on top, negative tiles below, sorted by kind.
const sum = (id: string) =>
  figure(
    id,
    [
      pairRows({
        kinds: [
          { kind: 'x2', pos: 3, neg: 0 },
          { kind: 'x', pos: 3, neg: 5 },
          { kind: '1', pos: 6, neg: 4 },
        ],
        small: true,
      }),
    ],
    480,
  );

// The first polynomial's tiles, the second's, and the zero pairs.
const FIRST = (f: string) => [...pairIds(f, 'p', 'x2', 2), ...pairIds(f, 'p', 'x', 3), ...pairIds(f, 'n', '1', 4)];
const SECOND = (f: string) => [...pairIds(f, 'p', 'x2', 3, 2), ...pairIds(f, 'n', 'x', 5), ...pairIds(f, 'p', '1', 6)];

const video: Explainer = {
  id: 'm9-5-3',
  lessonId: 'm9-5-3',
  title: 'Adding and Subtracting Polynomials, Part 1: Adding Polynomials',
  thumbnailTitle: 'Adding Polynomials',
  thumbnail: 'sm',
  summary:
    'To add polynomials, put all the terms together and collect like terms. With algebra tiles, put both groups of tiles together, remove the zero pairs and read what is left. With symbols, remove the brackets (every term keeps its sign), group like terms and add the coefficients: (2x² + 3x − 4) + (x² − 5x + 6) = 3x² − 2x + 2. Like terms can also be lined up in columns, the way you add whole numbers.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 1', title: 'Adding Polynomials', subtitle: 'Put the terms together' }],
      lines: [
        { say: 'A community garden has two plots. If you know an expression for the area of each plot, how do you find the total area? You add the two polynomials.', show: 'title' },
        { say: 'In this lesson, you will add and subtract polynomials. The only tool you need is collecting like terms. In this part, you will add polynomials, first with algebra tiles and then with symbols.' },
      ],
    },
    {
      chapter: 'With algebra tiles',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(2x^2 + 3x - 4) + (x^2 - 5x + 6)'] }, sum('sm')],
      lines: [
        { say: 'Add two x squared, plus three x, minus four, and x squared, minus five x, plus six.', show: 'm.0' },
        { say: 'Here are the tiles for the first polynomial: two x squared tiles, three x tiles, and four red unit tiles. Positive tiles go in the top row, and negative tiles in the bottom row.', show: FIRST('sm'), focus: FIRST('sm') },
        { say: 'Now add the tiles for the second polynomial: one more x squared tile, five red x tiles, and six unit tiles.', show: SECOND('sm'), focus: SECOND('sm') },
        { say: 'Adding means putting all the tiles together. Now we simplify, just as before.', focus: 'sm' },
      ],
    },
    {
      chapter: 'Remove the zero pairs',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(2x^2 + 3x - 4) + (x^2 - 5x + 6)', '= 3x^2 - 2x + 2'] }, sum('sm')],
      lines: [
        { say: 'There are three x squared tiles, and no red ones, so there are no zero pairs there. That gives three x squared.', show: ['m.0', ...FIRST('sm'), ...SECOND('sm')], focus: pairIds('sm', 'p', 'x2', 3) },
        { say: 'Three x tiles and five red x tiles make three zero pairs.', show: pairIds('sm', 'zp', 'x', 3), focus: pairIds('sm', 'zp', 'x', 3) },
        { say: 'Remove them. Two red x tiles are left, which is negative two x.', hide: [...pairIds('sm', 'zp', 'x', 3), ...pairIds('sm', 'p', 'x', 3), ...pairIds('sm', 'n', 'x', 3)] },
        { say: 'Six unit tiles and four red unit tiles make four zero pairs.', show: pairIds('sm', 'zp', '1', 4), focus: pairIds('sm', 'zp', '1', 4) },
        { say: 'Remove them. Two unit tiles are left, which is plus two.', hide: [...pairIds('sm', 'zp', '1', 4), ...pairIds('sm', 'p', '1', 4), ...pairIds('sm', 'n', '1', 4)] },
        { say: 'Read what is left: three x squared, minus two x, plus two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'With symbols',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '(2x^2 + 3x - 4) + (x^2 - 5x + 6)',
            '= 2x^2 + 3x - 4 + x^2 - 5x + 6',
            '= \\adj{(2x^2 + x^2)} + \\good{(3x - 5x)} + \\opp{(-4 + 6)}',
            '= \\adj{3x^2} \\good{\\,-\\,2x} \\opp{\\,+\\,2}',
          ],
        },
      ],
      lines: [
        { say: 'With symbols, the steps are the same. Start with the sum.', show: 'm.0', focus: 'm.0' },
        { say: 'First, remove the brackets. When you add, every term keeps its sign. Plus x squared, minus five x, plus six stay just as they are.', show: 'm.1', focus: 'm.1' },
        { say: 'Next, group the like terms: the x squared terms, the x terms, and the constants.', show: 'm.2', focus: 'm.2' },
        { say: 'Then add the coefficients. Two plus one is three. Three minus five is negative two. Negative four plus six is two.', show: 'm.3', focus: 'm.3' },
        { say: 'The sum is three x squared, minus two x, plus two. That matches the tiles.' },
      ],
    },
    {
      chapter: 'In columns',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', '$x^2$-terms', '$x$-terms', 'constants'],
          rows: [
            ['first polynomial', '$2$', '$3$', '$-4$'],
            ['second polynomial', '$1$', '$-5$', '$6$'],
            ['sum', '$3$', '$-2$', '$2$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3x^2 - 2x + 2'] },
      ],
      lines: [
        { say: 'You can also line up like terms in columns, the way you add whole numbers, with ones digits under ones digits, and tens digits under tens digits.' },
        { say: 'Write the coefficients of the first polynomial in a row: two for x squared, three for x, and negative four for the constant.', show: 't.0', focus: 't.0' },
        { say: 'Write the second polynomial underneath: one, negative five and six. An x squared on its own has a coefficient of one.', show: 't.1', focus: 't.1' },
        { say: 'Now add each column: three, negative two, and two.', show: 't.2', focus: 't.2' },
        { say: 'So the sum is three x squared, minus two x, plus two, the same answer again.', show: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $(x^2 + 4x - 3) + (2x^2 - x - 5)$.',
          choices: ['$3x^2 + 5x - 8$', '$3x^2 + 3x - 8$', '$3x^2 + 3x + 2$', '$2x^2 + 3x - 8$'],
          answer: 1,
          working: '$(x^2 + 2x^2) + (4x - x) + (-3 - 5) = 3x^2 + 3x - 8$. Check with $x = 1$: $2 + (-4) = -2$ and $3 + 3 - 8 = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify the sum of x squared, plus four x, minus three, and two x squared, minus x, minus five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. One x squared plus two x squared is three x squared. Four x minus x is three x. Negative three minus five is negative eight. Choice A adds x instead of negative x: four x minus x is three x, not five x.', show: 'q.answer' },
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
            'To add polynomials, put all the terms together and collect like terms.',
            'With tiles: put the tiles together, remove the zero pairs, and read what is left.',
            'With symbols: remove the brackets (every term keeps its sign), group like terms and add the coefficients.',
            'You can also add like terms in columns.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To add polynomials, put all the terms together, and collect like terms.', show: 'sum.0' },
        { say: 'With tiles, put the tiles together, remove the zero pairs, and read what is left.', show: 'sum.1' },
        { say: 'With symbols, remove the brackets, keeping every sign. Then group the like terms and add their coefficients.', show: 'sum.2' },
        { say: 'You can also add like terms in columns. In the next part, you will subtract polynomials. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
