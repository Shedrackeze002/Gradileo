import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bagRow } from '@/content/math5/videos/lib/m5-7-figures.ts';
import { bin, sides, tileGroups } from './lib/m6-6-figures.ts';

// 4n + 3 and 2n + 5 as algebra tiles.
const model = (id: string) =>
  figure(
    id,
    [
      tileGroups({
        groups: [
          { id: 'g1', x: 4, units: 3, tex: 'n', caption: '4n + 3' },
          { id: 'g2', x: 2, units: 5, tex: 'n', caption: '2n + 5' },
        ],
        gap: 1.4,
      }),
    ],
    300,
  );
const group = (id: string, g: string) => [`${id}.${g}-xs`, `${id}.${g}-us`, `${id}.${g}-box`, `${id}.${g}-cap`];

// Seven bags of y; three are taken away.
const sevenBags = (id: string) => figure(id, [bagRow({ count: 7, tex: 'y', gap: 0.5 })], 180);

// Six bags of n and eight loose marbles: 6n + 8 cannot become one number of bags.
const sixAndEight = (id: string) => figure(id, [bin({ bags: 6, marbles: 8, tex: 'n', perCol: 4 })], 260);

// The triangle with sides 2n, n + 4 and 3n + 1 (centimetres).
const tri = (id: string) =>
  figure(
    id,
    [
      sides({
        corners: [
          [0, 0],
          [6, 0],
          [2, 3.4],
        ],
        labels: ['3n + 1', 'n + 4', '2n'],
        places: ['below', 'above right', 'above left'],
      }),
    ],
    330,
  );

const video: Explainer = {
  id: 'm6-6-2-b',
  lessonId: 'm6-6-2',
  title: 'Like Terms and Algebraic Properties, Part 2: Combining Like Terms',
  thumbnailTitle: 'Combining Like Terms',
  thumbnail: 'tl',
  summary:
    'To simplify an expression, combine like terms: 4n + 3 + 2n + 5 = 6n + 8, and 7y + 6 − 3y − 2 = 4y + 4, where each term keeps the sign in front of it. 6n + 8 is not 14n, because 6n and 8 are not like terms. A triangle with sides 2n, n + 4 and 3n + 1 cm has a perimeter of 6n + 5 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 2', title: 'Combining Like Terms', subtitle: 'Simplify by putting like terms together' }],
      lines: [
        { say: 'In the last part, you learned that like terms have exactly the same variable.', show: 'title' },
        { say: 'In this video, you will simplify expressions by combining like terms, and write an expression for the perimeter of a shape.' },
      ],
    },
    {
      chapter: 'Four terms',
      layout: 'center',
      main: [
        model('tl'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\good{4n} + \\opp{3} + \\good{2n} + \\opp{5}', '= \\good{6n} + \\opp{8}'] },
      ],
      lines: [
        { say: 'To simplify an expression means to write it in a shorter way, with the same value. We do it by combining like terms.', show: 'm.0' },
        { say: 'Simplify four n plus three plus two n plus five. Here it is with algebra tiles. Each long tile is n, and each small square is one.', show: [...group('tl', 'g1'), ...group('tl', 'g2')] },
        { say: 'First, the n terms. Four n plus two n is six n. Add the coefficients: four plus two is six.', focus: ['tl.g1-xs', 'tl.g2-xs'] },
        { say: 'Next, the constants. Three plus five is eight.', focus: ['tl.g1-us', 'tl.g2-us'] },
        { say: 'So four n plus three plus two n plus five simplifies to six n plus eight. Four terms became two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'With subtraction',
      layout: 'center',
      main: [
        sevenBags('bg'),
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\good{7y} \\opp{{}+ 6} \\good{{}- 3y} \\opp{{}- 2}', '\\good{7y - 3y = 4y} \\qquad \\opp{6 - 2 = 4}', '= 4y + 4'],
        },
      ],
      lines: [
        { say: 'Now simplify seven y plus six, minus three y, minus two.', show: 'm.0' },
        { say: 'Each term keeps the sign in front of it. The y terms are seven y, and minus three y. The constants are plus six, and minus two.', focus: 'm.0' },
        { say: 'Think of seven bags, each holding y marbles.', show: ['bg.bag0', 'bg.bag1', 'bg.bag2', 'bg.bag3', 'bg.bag4', 'bg.bag5', 'bg.bag6'] },
        { say: 'Take away three bags, and four bags are left. So seven y minus three y is four y.', hide: ['bg.bag4', 'bg.bag5', 'bg.bag6'], show: 'm.1' },
        { say: 'For the constants, six minus two is four. So the expression simplifies to four y plus four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        sixAndEight('sb'),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Combining terms that are not alike', md: '$6n + 8$ is **not** $14n$. $6n$ and $8$ are not like terms, so they stay apart.' },
      ],
      lines: [
        { say: 'Watch out. Six n plus eight is not fourteen n. Six n and eight are not like terms.', show: 'oops' },
        { say: 'Think of six bags and eight loose marbles.', show: ['sb.box', 'sb.bag0', 'sb.bag1', 'sb.bag2', 'sb.bag3', 'sb.bag4', 'sb.bag5', 'sb.marbles'] },
        { say: 'Eight loose marbles are not eight more bags. You cannot add them to get fourteen bags. So six n plus eight stays as it is. It is already as simple as it can be.' },
      ],
    },
    {
      chapter: 'Perimeter',
      layout: 'split',
      leftWidth: 520,
      left: [tri('tr')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A triangle has sides of $2n$, $n + 4$ and $3n + 1$ centimetres. Write a simplified expression for its perimeter.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2n + n + 4 + 3n + 1', '\\good{2n + n + 3n = 6n}', '\\opp{4 + 1 = 5}', '\\text{Perimeter} = 6n + 5\\ \\text{cm}'] },
      ],
      lines: [
        { say: 'The perimeter of a shape is the distance all the way around it. To find it, add the lengths of all the sides.', show: ['tr.shape', 'q'] },
        { say: 'This triangle has sides of two n, n plus four, and three n plus one centimetres. The sides are expressions, so the perimeter will be an expression as well.', show: ['tr.l0', 'tr.l1', 'tr.l2'] },
        { say: 'Add the sides: two n, plus n plus four, plus three n plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Combine the n terms. Two n plus n plus three n is six n. Remember, n on its own means one n.', show: 'm.1', focus: 'm.1' },
        { say: 'Combine the constants. Four plus one is five. So the perimeter is six n plus five centimetres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $5k + 9 - 2k + 1$.',
          choices: ['$7k + 10$', '$3k + 10$', '$13k$', '$3k + 8$'],
          answer: 1,
          working: 'The $k$ terms: $5k - 2k = 3k$. The constants: $9 + 1 = 10$. So the expression is $3k + 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify five k plus nine, minus two k, plus one. Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is B, three k plus ten. The k terms: five k minus two k is three k. The constants: nine plus one is ten. Choice C adds terms that are not alike, so three k and ten must stay apart.',
          show: 'q.answer',
        },
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
          items: ['Simplify by combining like terms: $4n + 3 + 2n + 5 = 6n + 8$.', 'Each term keeps the sign in front of it: $7y + 6 - 3y - 2 = 4y + 4$.', 'Terms that are not alike stay apart: $6n + 8$ is not $14n$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Simplify an expression by combining like terms. Four n plus three plus two n plus five is six n plus eight.', show: 'sum.0' },
        { say: 'Each term keeps the sign in front of it. Seven y plus six, minus three y, minus two is four y plus four.', show: 'sum.1' },
        { say: 'And terms that are not alike stay apart. In the next part, you will meet three properties that let you move terms around. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
