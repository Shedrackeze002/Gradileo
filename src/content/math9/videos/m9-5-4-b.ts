import type { Explainer } from '@/video/script.ts';
import { areaModel, X } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';
import { cellIds, measure, upTo } from './lib/m9-5-figures.ts';

// 2x(x + 3): a rectangle 2x tall and x + 3 wide, holding two x² tiles and six x-tiles.
const tiles = (id: string) =>
  figure(
    id,
    [
      areaModel({
        top: ['x', '3'],
        side: ['x', 'x'],
        cells: [
          ['x^2', '3x'],
          ['x^2', '3x'],
        ],
        tiles: true,
      }),
      measure({ id: 'w', from: [0, 0.5], to: [X + 3, 0.5], tex: 'x + 3', tone: 'adj' }),
      measure({ id: 'h', from: [-0.5, 0], to: [-0.5, -2 * X], tex: '2x', tone: 'opp' }),
    ],
    540,
  );

// The area models for 2x(3x − 5) and −3(x² + 2x − 1), as tables.
const model1 = (id: string) => figure(id, [areaModel({ top: ['3x', '-5'], side: ['2x'], cells: [['6x^2', '-10x']] })], 260);
const model2 = (id: string) => figure(id, [areaModel({ top: ['x^2', '2x', '-1'], side: ['-3'], cells: [['-3x^2', '-6x', '3']] })], 260);

const video: Explainer = {
  id: 'm9-5-4-b',
  lessonId: 'm9-5-4',
  title: 'Multiplying and Dividing by a Monomial, Part 2: The Distributive Property',
  thumbnailTitle: 'A Polynomial Times a Monomial',
  thumbnail: 'tl',
  summary:
    'The distributive property says the number outside the brackets multiplies every term inside: 3(10 + 2) = 30 + 6. A rectangle 2x by (x + 3) holds two x² tiles and six x-tiles, so 2x(x + 3) = 2x² + 6x. An area model keeps track of the products: 2x(3x − 5) = 6x² − 10x, and −3(x² + 2x − 1) = −3x² − 6x + 3. Multiplying only the first term, or losing a sign, gives a wrong answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Polynomials · Part 2', title: 'The Distributive Property', subtitle: 'Multiply every term inside' }],
      lines: [
        { say: 'Back to the rink: two x metres wide, and three x minus five metres long. Its area is two x times the binomial three x minus five.', show: 'title' },
        { say: 'In this part, you will multiply a polynomial by a monomial, using algebra tiles, area models, and the distributive property.' },
      ],
    },
    {
      chapter: 'The distributive property',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Distributive property', md: 'A number outside brackets multiplies **every** term inside: $a(b + c) = ab + ac$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3(10 + 2) = 3 \\times 10 + 3 \\times 2 = 30 + 6 = 36', '3 \\times 12 = 36 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'The distributive property says that a number outside brackets multiplies every term inside the brackets.', show: 'def' },
        { say: 'You already use it with numbers. Three times twelve is three times ten, plus three times two. That is thirty plus six, which is thirty-six.', show: 'm.0', focus: 'm.0' },
        { say: 'And three times twelve is thirty-six. The same answer. The three multiplied both the ten and the two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A rectangle of tiles',
      layout: 'split',
      left: [tiles('tl')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['2x(x + 3)', '= 2x \\cdot x + 2x \\cdot 3', '= 2x^2 + 6x'] }],
      lines: [
        { say: 'Here is two x times x plus three, as a rectangle. It is two x tall and x plus three wide.', show: ['tl.outline', 'tl.w', 'tl.h', 'm.0'] },
        { say: 'Under the x part of the top, the tiles are x by x: two x squared tiles.', show: cellIds('tl', upTo(2), [0]), focus: cellIds('tl', upTo(2), [0]) },
        { say: 'Under the three, each row has three x tiles, and there are two rows: six x tiles.', show: [...cellIds('tl', upTo(2), [1]), 'tl.grid'], focus: cellIds('tl', upTo(2), [1]) },
        { say: 'So the two x multiplied both terms. Two x times x, plus two x times three.', show: 'm.1', focus: 'm.1' },
        { say: 'The area is two x squared plus six x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Using an area model',
      layout: 'split',
      leftWidth: 520,
      left: [model1('am')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['2x(3x - 5)', '2x \\cdot 3x = 6x^2', '2x \\cdot (-5) = -10x', '= 6x^2 - 10x'] }],
      lines: [
        { say: 'Now the rink: expand two x times three x minus five. Expand means multiply out the brackets.', show: 'm.0' },
        { say: 'An area model keeps track of the products, without drawing every tile. Put three x and negative five along the top, and two x down the side.', show: ['am.top', 'am.side', 'am.outline', 'am.grid'] },
        { say: 'Multiply two x by the first term: two x times three x is six x squared.', show: ['am.c0-0', 'm.1'], focus: ['am.c0-0', 'm.1'] },
        { say: 'Multiply two x by the second term: two x times negative five is negative ten x.', show: ['am.c0-1', 'm.2'], focus: ['am.c0-1', 'm.2'] },
        { say: 'So two x times three x minus five is six x squared minus ten x. The area of the rink is six x squared minus ten x square metres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A negative monomial',
      layout: 'split',
      leftWidth: 600,
      left: [model2('an')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['-3(x^2 + 2x - 1)', '= -3x^2 - 6x + 3'] }],
      lines: [
        { say: 'The monomial can be negative. Expand negative three times x squared, plus two x, minus one.', show: ['m.0', 'an.top', 'an.side', 'an.outline', 'an.grid'] },
        { say: 'Negative three times x squared is negative three x squared.', show: 'an.c0-0', focus: 'an.c0-0' },
        { say: 'Negative three times two x is negative six x.', show: 'an.c0-1', focus: 'an.c0-1' },
        { say: 'And negative three times negative one is positive three. The signs are the same, so the product is positive.', show: 'an.c0-2', focus: 'an.c0-2' },
        { say: 'The answer is negative three x squared, minus six x, plus three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying only the first term', md: '$2x(3x - 5)$ is **not** $6x^2 - 5$. The $2x$ multiplies **both** terms. And watch the signs: $(-3)(-1) = +3$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['2x(3x - 5) = 6x^2 - 5 \\;\\bad{\\times}', '2x(3x - 5) = 6x^2 - 10x \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Watch out for multiplying only the first term. Two x times three x minus five is not six x squared minus five.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The two x multiplies both terms inside the brackets, so the second term is negative ten x.', show: 'm.1', focus: 'm.1' },
        { say: 'Watch the signs as well. With negative three outside, the last product is negative three times negative one, which is positive three.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Expand $-2x(x - 4)$.',
          choices: ['$-2x^2 - 8x$', '$-2x^2 - 4$', '$-2x^2 + 8x$', '$2x^2 + 8x$'],
          answer: 2,
          working: '$(-2x)(x) = -2x^2$ and $(-2x)(-4) = 8x$, because the signs are the same. So $-2x(x - 4) = -2x^2 + 8x$.',
        },
      ],
      lines: [
        { say: 'Your turn. Expand negative two x times x minus four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Negative two x times x is negative two x squared. Negative two x times negative four is positive eight x, because the signs are the same. Choice B multiplies only the first term.', show: 'q.answer' },
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
            'The distributive property: the monomial outside multiplies **every** term inside.',
            'A rectangle of tiles shows it: $2x(x + 3) = 2x^2 + 6x$.',
            'An area model keeps track of the products: $2x(3x - 5) = 6x^2 - 10x$.',
            'Watch the signs: $-3(x^2 + 2x - 1) = -3x^2 - 6x + 3$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With the distributive property, the monomial outside the brackets multiplies every term inside.', show: 'sum.0' },
        { say: 'A rectangle of tiles shows why.', show: 'sum.1' },
        { say: 'An area model keeps track of the products.', show: 'sum.2' },
        { say: 'And watch the signs: a negative times a negative is positive. In the next part, you will expand two products and then simplify. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
