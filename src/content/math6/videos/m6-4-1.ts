import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pie } from '@/content/math5/videos/lib/m5-5-figures.ts';
import { dotGroups } from './lib/m6-4-figures.ts';

// Each friend has a colour: the first friend's pieces are yellow, then blue, green and orange.
const FRIENDS: DiagramTone[] = ['theta', 'adj', 'good', 'opp'];

// Three pizzas, each cut into 4 equal pieces; each friend takes one piece of each pizza.
const pizzas = (id: string, height = 260) =>
  figure(id, [0, 1, 2].map((k) => pie({ name: `p${k}`, parts: 4, shaded: 4, tones: FRIENDS, at: [k * 3.8, 0] })), height);

// Two pizzas, each cut into 3 equal pieces, shared by 3 friends.
const twoPizzas = (id: string) =>
  figure(id, [0, 1].map((k) => pie({ name: `p${k}`, parts: 3, shaded: 3, tones: FRIENDS, at: [k * 3.8, 0] })), 240);

// Twelve apples shared by three friends: three groups of four.
const apples = (id: string) => figure(id, [dotGroups({ groups: 3, size: 4, cols: 2, tones: ['theta', 'adj', 'good'], labels: ['4', '4', '4'] })]);

const video: Explainer = {
  id: 'm6-4-1',
  lessonId: 'm6-4-1',
  title: 'Fractions as Quotients, Part 1: Sharing Makes a Fraction',
  thumbnailTitle: 'Sharing Makes a Fraction',
  thumbnail: 'pz',
  summary:
    'Equal sharing gives a quotient: 12 apples for 3 friends is 12 ÷ 3 = 4 each. Three pizzas shared by four friends, each pizza cut into quarters, gives each friend 3 quarters: 3 ÷ 4 = 3/4. The numerator is the amount shared and the denominator the number of shares, so 3 pizzas for 4 friends is 3/4, not 4/3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 1', title: 'Sharing Makes a Fraction', subtitle: 'Equal shares and quotients' }],
      lines: [
        { say: 'Three pizzas. Four hungry friends. How much pizza does each friend get?', show: 'title' },
        { say: 'When you share things equally, the answer is often a fraction. In this part, you will see that a fraction is also a division.' },
      ],
    },
    {
      chapter: 'Equal sharing',
      layout: 'split',
      leftWidth: 520,
      left: [apples('ap')],
      right: [
        { kind: 'callout', id: 'share', tone: 'definition', title: 'Equal sharing', md: '**Equal sharing** means splitting an amount so that every share is the same size.' },
        { kind: 'callout', id: 'quot', tone: 'definition', title: 'Quotient', md: 'A **quotient** is the answer to a division. In $12 \\div 3 = 4$, the quotient is $4$.' },
      ],
      lines: [
        { say: 'Equal sharing means splitting an amount so that every share is the same size.', show: 'share' },
        { say: 'Suppose twelve apples are shared equally by three friends. Each friend gets four apples.', show: ['ap.g0', 'ap.g1', 'ap.g2', 'ap.labels'] },
        { say: 'Sharing equally is dividing. Twelve divided by three equals four.' },
        { say: 'The answer to a division is called the quotient. In twelve divided by three equals four, the quotient is four.', show: 'quot' },
      ],
    },
    {
      chapter: 'Three pizzas, four friends',
      layout: 'center',
      main: [
        pizzas('pz'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{each piece} = \\dfrac14 \\text{ of a pizza}', '\\dfrac14 + \\dfrac14 + \\dfrac14 = \\dfrac34'] },
      ],
      lines: [
        { say: 'Now the pizzas. Three pizzas are shared equally by four friends. There are fewer pizzas than friends, so nobody gets a whole pizza.', show: ['pz.p0-rim', 'pz.p1-rim', 'pz.p2-rim'] },
        { say: 'Here is one way to share. Cut each pizza into four equal pieces. Each piece is one quarter of a pizza, which is also called one fourth.', show: 'm.0', focus: 'm.0' },
        { say: 'Each friend takes one piece from each pizza. The first friend takes the yellow pieces: one, two, three pieces.', show: ['pz.p0-s0', 'pz.p1-s0', 'pz.p2-s0'], focus: ['pz.p0-s0', 'pz.p1-s0', 'pz.p2-s0'] },
        { say: 'The other three friends do the same, so every friend gets three pieces, and no pizza is left over.', show: ['pz.p0-s1', 'pz.p1-s1', 'pz.p2-s1', 'pz.p0-s2', 'pz.p1-s2', 'pz.p2-s2', 'pz.p0-s3', 'pz.p1-s3', 'pz.p2-s3'] },
        { say: 'Three pieces of one quarter make three quarters. So each friend gets three quarters of a pizza.', show: 'm.1', focus: ['m.1', 'pz.p0-s0', 'pz.p1-s0', 'pz.p2-s0'] },
      ],
    },
    {
      chapter: 'A share is a quotient',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['3 \\div 4 = \\dfrac{3}{4}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Equal-sharing fractions', md: 'The **numerator** (top) is the amount shared. The **denominator** (bottom) is the number of shares.' },
        { kind: 'math', id: 'w', size: 'lg', lines: ['\\dfrac{\\text{amount shared}}{\\text{number of shares}} = \\dfrac{3 \\text{ pizzas}}{4 \\text{ friends}}'] },
      ],
      lines: [
        { say: 'We shared three pizzas among four friends. That is three divided by four. And each friend got three quarters. So three divided by four equals three quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'The fraction three quarters is the quotient of three divided by four.' },
        { say: 'In an equal-sharing fraction, the numerator, the top number, is the amount being shared: three pizzas.', show: ['key', 'w.0'] },
        { say: 'The denominator, the bottom number, is the number of shares: four friends.', focus: 'w.0' },
      ],
    },
    {
      chapter: 'Two pizzas, three friends',
      layout: 'center',
      main: [
        twoPizzas('tp'),
        { kind: 'math', id: 'm', size: 'lg', lines: ['2 \\div 3 = \\dfrac{2}{3} \\text{ of a pizza each}'] },
      ],
      lines: [
        { say: 'Let’s try another. Two pizzas are shared equally by three friends.', show: ['tp.p0-rim', 'tp.p1-rim'] },
        { say: 'Each pizza is cut into three equal pieces, so each piece is one third of a pizza.' },
        { say: 'Each friend takes one piece from each pizza. The first friend gets the two yellow pieces: two thirds.', show: ['tp.p0-s0', 'tp.p1-s0'], focus: ['tp.p0-s0', 'tp.p1-s0'] },
        { say: 'The other friends get two thirds each as well. So two divided by three is two thirds of a pizza each. The amount shared is on top, and the number of shares is on the bottom.', show: ['tp.p0-s1', 'tp.p1-s1', 'tp.p0-s2', 'tp.p1-s2', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Flipping the fraction', md: '$3$ pizzas shared by $4$ friends is $\\dfrac{3}{4}$, not $\\dfrac{4}{3}$. Put the amount being shared on top.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{4}{3}} \\text{ is more than } 1 \\text{ whole pizza each}', '\\good{\\dfrac{3}{4}} \\text{ of a pizza each} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. It is easy to flip the fraction, and write four thirds.', show: 'oops' },
        { say: 'Four thirds is more than one whole pizza. But there are fewer pizzas than friends, so each friend must get less than one whole pizza!', show: 'm.0', focus: 'm.0' },
        { say: 'Put the amount being shared on top. Three pizzas for four friends is three quarters of a pizza each.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$4$ muffins are shared equally by $5$ friends. How much does each friend get?',
          choices: ['$\\dfrac{5}{4}$ of a muffin', '$\\dfrac{1}{5}$ of a muffin', '$\\dfrac{4}{5}$ of a muffin', '$\\dfrac{1}{4}$ of a muffin'],
          answer: 2,
          working: 'Each friend gets $4 \\div 5 = \\tfrac{4}{5}$ of a muffin: the amount shared, $4$, on top, and the number of shares, $5$, on the bottom.',
        },
      ],
      lines: [
        { say: 'Your turn. Four muffins are shared equally by five friends. How much does each friend get? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, four fifths of a muffin. The amount shared, four muffins, goes on top, and the number of shares, five friends, goes on the bottom. Choice A flips the fraction: five quarters is more than one muffin each, but there are fewer muffins than friends.', show: 'q.answer' },
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
            '**Equal sharing** splits an amount into shares of the same size. Sharing is dividing.',
            'A **quotient** is the answer to a division.',
            '$3$ pizzas shared by $4$ friends is $3 \\div 4 = \\dfrac{3}{4}$ of a pizza each.',
            'The numerator is the amount shared; the denominator is the number of shares.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Equal sharing splits an amount into shares of the same size, and sharing is dividing.', show: 'sum.0' },
        { say: 'A quotient is the answer to a division.', show: 'sum.1' },
        { say: 'Three pizzas shared by four friends is three divided by four, which is three quarters of a pizza each.', show: 'sum.2' },
        { say: 'The numerator is the amount shared, and the denominator is the number of shares. In the next part, you will share in different ways, and share more than one whole each. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
