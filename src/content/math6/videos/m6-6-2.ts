import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bin, tileGroups } from './lib/m6-6-figures.ts';

// A bin with 3 bags of x marbles each and 5 loose marbles: 3x + 5.
const marbles = (id: string) => figure(id, [bin({ bags: 3, marbles: 5, caption: '3x + 5' })], 300);

// The lesson's tiles: 2x + 3 and x + 2, and all of them together, 3x + 5.
const model = (id: string, all = false) =>
  figure(
    id,
    [
      tileGroups({
        groups: [
          { id: 'g1', x: 2, units: 3, caption: '2x + 3' },
          { id: 'g2', x: 1, units: 2, caption: 'x + 2' },
          ...(all ? [{ id: 'all', x: 3, units: 5, caption: '3x + 5' }] : []),
        ],
        gap: 1.2,
      }),
    ],
    all ? 300 : 330,
  );
const group = (id: string, g: string) => [`${id}.${g}-xs`, `${id}.${g}-us`, `${id}.${g}-box`, `${id}.${g}-cap`];

const video: Explainer = {
  id: 'm6-6-2',
  lessonId: 'm6-6-2',
  title: 'Like Terms and Algebraic Properties, Part 1: Terms and Like Terms',
  thumbnailTitle: 'Like Terms',
  thumbnail: 'tl',
  summary:
    'A term is a number, a variable, or a number times a variable: 3x + 5 (three bags of x marbles and five loose marbles) has the terms 3x and 5, and 5 is a constant term. Like terms have exactly the same variable, so 3x and 7x are like terms, but 3x and 3y, 3x and 3, or 3x and 3x² are not. Algebra tiles show 2x + 3 and x + 2 together make 3x + 5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 1', title: 'Terms and Like Terms', subtitle: 'Which terms belong together?' }],
      lines: [
        { say: 'Imagine a bin with three bags of marbles and five loose marbles. Every bag holds the same number of marbles, but you do not know that number.', show: 'title' },
        { say: 'In this video, you will learn what terms and like terms are, and use algebra tiles to see which terms belong together.' },
      ],
    },
    {
      chapter: 'A bin of marbles',
      layout: 'split',
      leftWidth: 520,
      left: [marbles('bn')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\text{bags: } \\adj{3x}', '\\text{loose: } \\opp{5}', '\\text{in all: } \\adj{3x} + \\opp{5}'] }],
      lines: [
        { say: 'Here is the bin. Each blue bag holds the same number of marbles. We do not know that number, so we call it x.', show: ['bn.box', 'bn.bag0', 'bn.bag1', 'bn.bag2'] },
        { say: 'A letter that stands for a number like this is called a variable.' },
        { say: 'Three bags hold three times x marbles. We write that as three x.', show: 'm.0', focus: ['bn.bag0', 'bn.bag1', 'bn.bag2', 'm.0'] },
        { say: 'There are also five loose marbles.', show: ['bn.marbles', 'm.1'], focus: ['bn.marbles', 'm.1'] },
        { say: 'So the bin holds three x plus five marbles. Three x plus five is an algebraic expression: it has numbers, an operation and a variable.', show: ['m.2', 'bn.cap'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Terms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\adj{3x} + \\opp{5}'] },
        { kind: 'callout', id: 'term', tone: 'definition', title: 'Term', md: 'A **term** is a number, a variable, or a number times a variable. A term with no variable, like $5$, is a **constant term**.' },
        { kind: 'callout', id: 'coef', tone: 'definition', title: 'Coefficient', md: 'The number in front of the variable is its **coefficient**. In $3x$, the coefficient is $3$.' },
      ],
      lines: [
        { say: 'The parts of an expression that are added or subtracted are called terms. A term is a number, a variable, or a number times a variable.', show: ['m.0', 'term'] },
        { say: 'Three x plus five has two terms. The first term is three x, the bags. The second term is five, the loose marbles.', focus: 'm.0' },
        { say: 'A term with no variable, like five, is called a constant term. Its value is always five. It never changes.' },
        { say: 'The number in front of the variable is called its coefficient. In three x, the coefficient is three. It tells you how many bags there are.', show: 'coef' },
      ],
    },
    {
      chapter: 'Like terms',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Like terms', md: '**Like terms** have exactly the same variable. Constant terms are like terms too.' },
        {
          kind: 'table',
          id: 't',
          head: ['Terms', 'Like terms?', 'Why'],
          rows: [
            ['$3x$ and $7x$', '[[good:Yes]]', 'the same variable, $x$'],
            ['$5$ and $9$', '[[good:Yes]]', 'both are constants'],
            ['$3x$ and $3y$', '[[bad:No]]', 'different variables'],
            ['$3x$ and $3$', '[[bad:No]]', 'only one has a variable'],
            ['$3x$ and $3x^{2}$', '[[bad:No]]', '$x$ and $x^{2}$ are not the same'],
          ],
        },
      ],
      lines: [
        { say: 'Like terms have exactly the same variable. Three x and seven x are like terms, because both have the variable x.', show: ['def', 't.0'], focus: 't.0' },
        { say: 'Constant terms, like five and nine, are like terms as well. They are both just numbers.', show: 't.1', focus: 't.1' },
        { say: 'Three x and three y are not like terms. The variables are different letters, so they can stand for different numbers.', show: 't.2', focus: 't.2' },
        { say: 'Three x and three are not like terms. One has a variable, and the other does not.', show: 't.3', focus: 't.3' },
        { say: 'And three x and three x squared are not like terms either. Three x squared means three times x times x. The variables are not exactly the same.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Algebra tiles',
      layout: 'center',
      main: [
        model('tl'),
        { kind: 'text', id: 'key', size: 'md', md: 'A long [[good:green tile]] stands for $x$. A small [[opp:orange square]] stands for $1$.' },
      ],
      lines: [
        { say: 'You can model an expression with algebra tiles. A long green tile stands for x. A small orange square stands for one.', show: 'key' },
        { say: 'The first group has two long tiles and three small squares. It shows two x plus three.', show: group('tl', 'g1') },
        { say: 'The second group has one long tile and two small squares. It shows x plus two.', show: group('tl', 'g2') },
        { say: 'The long tiles and the small squares are different kinds of tiles, just as x terms and constant terms are different kinds of terms.', focus: ['tl.g1-xs', 'tl.g2-xs'] },
      ],
    },
    {
      chapter: 'All the tiles',
      layout: 'center',
      main: [model('ta', true), { kind: 'math', id: 'm', size: 'md', lines: ['\\good{2x + x = 3x} \\qquad \\opp{3 + 2 = 5} \\qquad \\text{in all: } 3x + 5'] }],
      lines: [
        { say: 'Let’s write one expression for all the tiles together.', show: [...group('ta', 'g1'), ...group('ta', 'g2')] },
        { say: 'First, count the long tiles. Two x plus x is three x. A lone x means one x, so two plus one is three.', focus: ['ta.g1-xs', 'ta.g2-xs'] },
        { say: 'Next, count the small squares. Three plus two is five.', focus: ['ta.g1-us', 'ta.g2-us'] },
        { say: 'So all the tiles show three x plus five. We put the like terms together, and kept the different kinds apart.', show: [...group('ta', 'all'), 'm.0'], focus: 'ta.all-box' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Look at the variable, not the number',
          md: '$3x$ and $3$ both have a $3$, but they are **not** like terms. $3x$ and $7x$ have different numbers, but they **are** like terms. Like terms match in their variable.',
        },
      ],
      lines: [
        { say: 'Watch out. Three x and three both have the number three, but they are not like terms.', show: 'oops' },
        { say: 'Three x and seven x have different numbers, but they are like terms.' },
        { say: 'To decide, look at the variable, not the number in front. Like terms have exactly the same variable.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which pair are like terms?',
          choices: ['$4y$ and $4$', '$2x$ and $2y$', '$5n$ and $9n$', '$6x$ and $6x^{2}$'],
          answer: 2,
          working: '$5n$ and $9n$ have exactly the same variable, $n$. The numbers in front can be different.',
        },
      ],
      lines: [
        { say: 'Your turn. Which pair are like terms? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Five n and nine n have exactly the same variable, n. Choice A has the same number, four, but only one of its terms has a variable.', show: 'q.answer' },
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
          items: ['A term is a number, a variable, or a number times a variable.', 'A constant term has no variable. The coefficient is the number in front of the variable.', 'Like terms have exactly the same variable. Constants are like terms too.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A term is a number, a variable, or a number times a variable.', show: 'sum.0' },
        { say: 'A constant term has no variable. The coefficient is the number in front of the variable.', show: 'sum.1' },
        { say: 'Like terms have exactly the same variable, and constants are like terms as well. In the next part, you will combine like terms to simplify expressions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
