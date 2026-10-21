import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { balance } from '@/content/math5/videos/lib/m5-7-figures.ts';
import { shift } from '@/content/math6/videos/lib/m6-11-figures.ts';
import { tip } from './lib/m7-6-figures.ts';

// 5 + 3 = 8 with marbles: level (named lv). One more marble on the left only tips it (named tp).
const pans = (id: string) =>
  figure(
    id,
    [
      balance({
        name: 'lv',
        perRow: 4,
        left: { marbles: [{ id: 'five', count: 5 }, { id: 'three', count: 3, tone: 'opp' }] },
        right: { marbles: [{ id: 'eight', count: 8 }] },
        labels: ['5 + 3', '8'],
      }),
      shift(
        tip(
          balance({
            name: 'tp',
            perRow: 4,
            left: { marbles: [{ id: 'five', count: 5 }, { id: 'three', count: 3, tone: 'opp' }, { id: 'extra', count: 1, tone: 'hyp' }] },
            right: { marbles: [{ id: 'eight', count: 8 }] },
            labels: ['5 + 3 + 1', '8'],
          }),
          { name: 'tp', down: 'left' },
        ),
        12,
        0,
      ),
    ],
    340,
  );

// 2x + 3 = 11: two bags and 3 marbles on the left, 11 marbles on the right.
const bags = (id: string, o: { bags: number; loose: number; total: number; labels: [string, string] }) =>
  figure(
    id,
    [
      balance({
        tex: 'x',
        perRow: 6,
        left: { bags: o.bags, marbles: [{ id: 'loose', count: o.loose, tone: 'opp' }] },
        right: { marbles: [{ id: 'all', count: o.total }] },
        labels: o.labels,
      }),
    ],
    360,
  );
const bagsAll = (id: string) => [`${id}.stand`, `${id}.lbags`, `${id}.l-loose`, `${id}.r-all`];

const video: Explainer = {
  id: 'm7-6-2',
  lessonId: 'm7-6-2',
  title: 'Preserving Equality, Part 1: An Equation Is a Balance',
  thumbnailTitle: 'An Equation Is a Balance',
  thumbnail: 'eq',
  summary:
    'A pan balance stays level only when both pans hold the same mass, and an equation works the same way: its two sides have the same value, and the equals sign is the middle of the balance. Two bags of x marbles and 3 more marbles balancing 11 marbles show the equation 2x + 3 = 11.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Expressions and Equations · Part 1', title: 'An Equation Is a Balance', subtitle: 'Two sides with the same value' }],
      lines: [
        { say: 'Have you ever seen a pan balance? It has two pans, one on each side. It stays level only when both pans hold the same mass.', show: 'title' },
        { say: 'An equation works in the same way. In this video, you will see how an equation is like a level balance, and write equations from pictures of balances.' },
      ],
    },
    {
      chapter: 'A pan balance',
      layout: 'center',
      main: [pans('pb')],
      lines: [
        { say: 'Here is a pan balance. Every marble has the same mass. The left pan holds five yellow marbles and three orange marbles. The right pan holds eight marbles.', show: ['pb.lv-stand', 'pb.lv-l-five', 'pb.lv-l-three', 'pb.lv-r-eight'] },
        { say: 'Five plus three is eight, so both pans hold the same mass. The balance is level.', show: 'pb.lv-labels', focus: 'pb.lv-labels' },
        { say: 'Now put one more marble on the left pan only. The left side is heavier, so the balance tips down on the left.', show: ['pb.tp-stand', 'pb.tp-l-five', 'pb.tp-l-three', 'pb.tp-l-extra', 'pb.tp-r-eight', 'pb.tp-labels'], focus: 'pb.tp-l-extra' },
        { say: 'A balance is level only when the two sides are equal.' },
      ],
    },
    {
      chapter: 'Bags of marbles',
      layout: 'center',
      main: [bags('eq', { bags: 2, loose: 3, total: 11, labels: ['2x + 3', '11'] }), { kind: 'math', id: 'm', size: 'xl', lines: ['\\adj{2x + 3} = \\opp{11}'] }],
      lines: [
        { say: 'This balance is level as well. The left pan has two bags, with the same number of marbles in each, plus three loose marbles. The right pan has eleven marbles.', show: bagsAll('eq') },
        { say: 'We do not know how many marbles are in a bag, so let x be the number of marbles in one bag. Two bags hold two x marbles.', focus: 'eq.lbags' },
        { say: 'So the left pan holds two x plus three marbles, and the right pan holds eleven.', show: 'eq.labels', focus: 'eq.labels' },
        { say: 'The balance is level, so the two sides are equal. The balance shows the equation: two x plus three equals eleven.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The equals sign',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\underbrace{\\adj{2x + 3}}_{\\text{left side}} \\;=\\; \\underbrace{\\opp{11}}_{\\text{right side}}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'An equation is a balance', md: 'The two sides of an equation have the **same value**, like the two pans of a level balance. The equals sign is like the middle of the balance.' },
      ],
      lines: [
        { say: 'Every equation has two sides. Here, the left side is two x plus three, and the right side is eleven.', show: 'm.0' },
        { say: 'The equals sign is like the middle of the balance. It says that the left side and the right side have the same value.', show: 'key' },
        { say: 'So whenever you see an equation, you can picture a level balance, with one side of the equation on each pan.' },
      ],
    },
    {
      chapter: 'Write the equation',
      layout: 'center',
      main: [bags('wr', { bags: 3, loose: 1, total: 7, labels: ['3x + 1', '7'] }), { kind: 'math', id: 'm', size: 'xl', lines: ['3x + 1 = 7'] }],
      lines: [
        { say: 'Let’s write the equation for this balance. On the left, there are three bags of x marbles and one loose marble.', show: bagsAll('wr'), focus: ['wr.lbags', 'wr.l-loose'] },
        { say: 'Three bags hold three x marbles, plus one more. So the left side is three x plus one.', focus: 'wr.lbags' },
        { say: 'On the right, there are seven marbles. So the right side is seven.', focus: 'wr.r-all' },
        { say: 'The balance is level, so the equation is three x plus one equals seven.', show: ['wr.labels', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A level balance has $4$ bags of $x$ marbles and $2$ loose marbles on the left pan, and $14$ marbles on the right pan. Which equation does it show?',
          choices: ['$x + 4 + 2 = 14$', '$4x + 2 = 14$', '$2x + 4 = 14$', '$4x = 14 + 2$'],
          answer: 1,
          working: 'Four bags hold $4x$ marbles, plus $2$ loose marbles: the left side is $4x + 2$. The right side is $14$. So $4x + 2 = 14$.',
        },
      ],
      lines: [
        { say: 'Your turn. A level balance has four bags of x marbles and two loose marbles on the left pan, and fourteen marbles on the right pan. Which equation does it show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, four x plus two equals fourteen. Four bags hold four x marbles, plus two loose marbles. Choice C swaps the numbers: it has two bags and four loose marbles.', show: 'q.answer' },
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
          items: ['A pan balance is level only when both pans hold the same mass.', 'An equation is like a level balance: both sides have the same value.', 'The equals sign is like the middle of the balance.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A pan balance is level only when both pans hold the same mass.', show: 'sum.0' },
        { say: 'An equation is like a level balance: its two sides have the same value.', show: 'sum.1' },
        { say: 'And the equals sign is like the middle of the balance. In the next part, you will learn how to keep an equation balanced when you change it. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
