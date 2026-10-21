import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { note, tileGroups } from './lib/m6-6-figures.ts';

// 4 × 2 and 2 × 4: the same 8 tiles, turned.
const turned = (id: string) =>
  figure(
    id,
    [
      tiles({ name: 'a', cols: 4, rows: 2, labels: { width: '4', height: '2' } }),
      note({ id: 'a-cap', at: [2, -2.4], tex: '4 \\times 2 = 8' }),
      tiles({ name: 'b', cols: 2, rows: 4, at: [6.5, 0], labels: { width: '2', height: '4' } }),
      note({ id: 'b-cap', at: [7.5, -2.4], tex: '2 \\times 4 = 8' }),
    ],
    330,
  );

// 3(x + 4): three groups of x + 4, which hold 3 long tiles and 12 small squares in all.
const threeGroups = (id: string) =>
  figure(
    id,
    [
      tileGroups({
        groups: [
          { id: 'g1', x: 1, units: 4, caption: 'x + 4' },
          { id: 'g2', x: 1, units: 4, caption: 'x + 4' },
          { id: 'g3', x: 1, units: 4, caption: 'x + 4' },
        ],
        gap: 1,
      }),
    ],
    300,
  );
const group = (id: string, g: string) => [`${id}.${g}-xs`, `${id}.${g}-us`, `${id}.${g}-box`, `${id}.${g}-cap`];

const video: Explainer = {
  id: 'm6-6-2-c',
  lessonId: 'm6-6-2',
  title: 'Like Terms and Algebraic Properties, Part 3: Algebraic Properties',
  thumbnailTitle: 'Algebraic Properties',
  thumbnail: 'tg',
  summary:
    'Three properties that let you move terms without changing the value: the commutative property (change the order: a + b = b + a, a × b = b × a), the associative property (change the grouping: (a + b) + c = a + (b + c)) and the distributive property (a(b + c) = ab + ac, so 3(x + 4) = 3x + 12). Using them, 3 + 2x + 5 = 2x + 8.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 3', title: 'Algebraic Properties', subtitle: 'Order, grouping and sharing out' }],
      lines: [
        { say: 'You can move the terms of an expression around without changing its value. The rules that tell you how are called properties.', show: 'title' },
        { say: 'In this video, you will meet three of them: the commutative, associative and distributive properties. Then you will use them to simplify an expression.' },
      ],
    },
    {
      chapter: 'Commutative property',
      layout: 'split',
      leftWidth: 520,
      left: [turned('tn')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Commutative property', md: 'You can change the **order** when you add or multiply.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 + 5 = 5 + 3', 'a + b = b + a', 'a \\times b = b \\times a'] },
      ],
      lines: [
        { say: 'The commutative property says you can change the order when you add or multiply. The answer stays the same.', show: 'def' },
        { say: 'Three plus five is eight, and five plus three is eight as well.', show: 'm.0' },
        { say: 'With letters, "a" plus b equals b plus "a". The letters can stand for any numbers.', show: 'm.1' },
        { say: 'It works for multiplying as well. Two rows of four tiles make eight tiles. Turn the picture, and you have four rows of two. It is still eight tiles. So "a" times b equals b times "a".', show: ['m.2', 'tn.a-outline', 'tn.a-grid', 'tn.a-width', 'tn.a-height', 'tn.a-cap', 'tn.b-outline', 'tn.b-grid', 'tn.b-width', 'tn.b-height', 'tn.b-cap'] },
        { say: 'The word commutative comes from commute, which means to travel back and forth. The numbers can swap places.' },
      ],
    },
    {
      chapter: 'Associative property',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Associative property', md: 'You can change the **grouping** when you add or multiply.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['(2 + 3) + 7 = 5 + 7 = 12', '2 + (3 + 7) = 2 + 10 = 12', '(a + b) + c = a + (b + c)', '(a \\times b) \\times c = a \\times (b \\times c)'] },
      ],
      lines: [
        { say: 'The associative property says you can change the grouping when you add or multiply. The parentheses show which numbers are grouped together.', show: 'def' },
        { say: 'Group two and three first: two plus three is five, and five plus seven is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'Now group three and seven first: three plus seven is ten, and two plus ten is twelve. The same answer.', show: 'm.1', focus: 'm.1' },
        { say: 'With letters, "a" plus b in brackets, plus c, equals "a" plus, b plus c in brackets. And the same is true when you multiply.', show: ['m.2', 'm.3'] },
        { say: 'Be careful: these two properties work for adding and multiplying, but not for subtracting or dividing. Ten minus two is eight, but two minus ten is not eight.' },
      ],
    },
    {
      chapter: 'Distributive property',
      layout: 'center',
      main: [
        threeGroups('tg'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Distributive property', md: 'A number times a sum multiplies **each** term in the sum: $a(b + c) = ab + ac$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3(x + 4) = 3 \\times x + 3 \\times 4 = 3x + 12'] },
      ],
      lines: [
        { say: 'The distributive property says that a number times a sum multiplies each term in the sum. "a" times the bracket, b plus c, is "a" b plus "a" c.', show: 'def' },
        { say: 'Look at three times the bracket x plus four. It means three groups of x plus four.', show: [...group('tg', 'g1'), ...group('tg', 'g2'), ...group('tg', 'g3')] },
        { say: 'Count the long tiles. There is one in each group, so three x.', focus: ['tg.g1-xs', 'tg.g2-xs', 'tg.g3-xs'] },
        { say: 'Count the small squares. There are four in each group, and three times four is twelve.', focus: ['tg.g1-us', 'tg.g2-us', 'tg.g3-us'] },
        { say: 'So three times the bracket x plus four is three x plus twelve. The three multiplied the x, and it multiplied the four as well.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Using the properties',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Simplify $3 + 2x + 5$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: ['\\opp{3} + 2x + \\opp{5}', '= 2x + \\opp{3} + \\opp{5} \\qquad \\text{(commutative)}', '= 2x + (\\opp{3 + 5}) \\qquad \\text{(associative)}', '= 2x + 8'],
        },
      ],
      lines: [
        { say: 'Let’s use the properties. Simplify three plus two x plus five.', show: ['q', 'm.0'] },
        { say: 'The constants, three and five, are like terms, but they are not next to each other.', focus: 'm.0' },
        { say: 'The commutative property lets us change the order. Move the two x to the front: two x plus three plus five.', show: 'm.1', focus: 'm.1' },
        { say: 'The associative property lets us change the grouping. Group the constants: two x, plus three plus five in brackets.', show: 'm.2', focus: 'm.2' },
        { say: 'Three plus five is eight. So three plus two x plus five simplifies to two x plus eight.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which expression is equal to $4(n + 2)$?',
          choices: ['$4n + 2$', '$4n + 6$', '$n + 8$', '$4n + 8$'],
          answer: 3,
          working: 'The $4$ multiplies each term in the sum: $4 \\times n = 4n$ and $4 \\times 2 = 8$. So $4(n + 2) = 4n + 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which expression is equal to four times the bracket n plus two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, four n plus eight. The four multiplies each term in the bracket: four times n is four n, and four times two is eight. Choice A forgets to multiply the two by four.', show: 'q.answer' },
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
          items: ['Commutative property: change the order. $a + b = b + a$', 'Associative property: change the grouping. $(a + b) + c = a + (b + c)$', 'Distributive property: $a(b + c) = ab + ac$, so $3(x + 4) = 3x + 12$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The commutative property: you can change the order when you add or multiply.', show: 'sum.0' },
        { say: 'The associative property: you can change the grouping when you add or multiply.', show: 'sum.1' },
        { say: 'And the distributive property: a number times a sum multiplies each term in the sum. In the next lesson, you will use what you know to solve equations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
