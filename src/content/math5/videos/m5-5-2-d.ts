import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { bar } from './lib/m5-5-figures.ts';

// 3⅕ on bars of fifths: three full bars and one fifth of a fourth bar.
const bars = (id: string) =>
  figure(id, [
    bar({ name: 'a', parts: 5, shaded: 5, at: [0, 4.5], width: 6, tone: 'adj' }),
    bar({ name: 'b', parts: 5, shaded: 5, at: [0, 3], width: 6, tone: 'adj' }),
    bar({ name: 'c', parts: 5, shaded: 5, at: [0, 1.5], width: 6, tone: 'adj' }),
    bar({ name: 'd', parts: 5, shaded: 1, at: [0, 0], width: 6, tone: 'adj' }),
  ], 420);

const frames = (id: string) => ['a', 'b', 'c', 'd'].map((k) => `${id}.${k}-frame`);
const pieces = (id: string, k: string, n: number) => Array.from({ length: n }, (_, i) => `${id}.${k}-p${i}`);

const video: Explainer = {
  id: 'm5-5-2-d',
  lessonId: 'm5-5-2',
  title: 'Adding and Subtracting Fractions, Part 4: Subtracting Mixed Numbers',
  thumbnailTitle: 'Subtracting Mixed Numbers',
  thumbnail: 'rg',
  summary: 'Subtracting mixed numbers when the fraction part is too small: 3⅕ − 1⅗ by regrouping a whole as 5/5 (2 + 6/5, then 1⅗), or with improper fractions (16/5 − 8/5 = 8/5), and why flipping the fractions is wrong.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Fractions · Part 4', title: 'Subtracting Mixed Numbers', subtitle: 'Regroup a whole when you need to' }],
      lines: [
        { say: 'Subtracting mixed numbers is a lot like adding them. But sometimes the fraction part is too small to take from. Then you need a trick.', show: 'title' },
        { say: 'In this video, you will subtract mixed numbers in two ways: by regrouping a whole, and by using improper fractions.' },
      ],
    },
    {
      chapter: 'Not enough fifths',
      layout: 'split',
      leftWidth: 460,
      left: [bars('nf')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3\\dfrac15 - 1\\dfrac35 = \\; ?', '\\dfrac15 - \\dfrac35 \\; ?'] }],
      lines: [
        { say: 'Find three and one fifth, minus one and three fifths. Here is three and one fifth: three whole bars, and one fifth more.', show: [...frames('nf'), 'nf.a-shade', 'nf.b-shade', 'nf.c-shade', 'nf.d-shade', 'm.0'], focus: 'm.0' },
        { say: 'We need to take away one whole, and three fifths. The wholes are easy. But look at the fifths: there is only one fifth on its own.', show: 'm.1', focus: ['m.1', 'nf.d-shade'] },
        { say: 'You cannot take three fifths from one fifth. There are not enough fifths!' },
      ],
    },
    {
      chapter: 'Way 1: regroup',
      layout: 'split',
      leftWidth: 460,
      left: [bars('rg')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3\\dfrac15 = 2 + \\dfrac65', '\\text{Wholes: } 2 - 1 = 1', '\\text{Parts: } \\dfrac65 - \\dfrac35 = \\dfrac35', '3\\dfrac15 - 1\\dfrac35 = 1\\dfrac35'] }],
      lines: [
        { say: 'Here is the trick. Trade one whole for five fifths. One whole bar is five fifths, so we can count it as fifths instead.', show: [...frames('rg'), 'rg.a-shade', 'rg.b-shade', ...pieces('rg', 'c', 5), 'rg.d-shade'], focus: pieces('rg', 'c', 5) },
        { say: 'Now we have two wholes, and five fifths plus one fifth, which is six fifths. So three and one fifth is two plus six fifths. It is the same amount, written a new way.', show: 'm.0', focus: [...pieces('rg', 'c', 5), 'rg.d-shade', 'm.0'] },
        { say: 'Now subtract the wholes: two minus one is one. Take away one whole bar.', show: 'm.1', hide: 'rg.a-shade', focus: 'm.1' },
        { say: 'Then subtract the parts: six fifths minus three fifths is three fifths. Take away three fifths.', show: 'm.2', hide: ['rg.c-p2', 'rg.c-p3', 'rg.c-p4'], focus: 'm.2' },
        { say: 'What is left? One whole bar, and three fifths. So the answer is one and three fifths.', show: 'm.3', focus: ['m.3', 'rg.b-shade', 'rg.c-p0', 'rg.c-p1', 'rg.d-shade'] },
      ],
    },
    {
      chapter: 'Way 2: improper fractions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3\\dfrac15 = \\dfrac{3 \\times 5 + 1}{5} = \\dfrac{16}{5}', '1\\dfrac35 = \\dfrac{1 \\times 5 + 3}{5} = \\dfrac85', '\\dfrac{16}{5} - \\dfrac85 = \\dfrac85', '\\dfrac85 = 1\\dfrac35'] },
      ],
      lines: [
        { say: 'Way two: change both mixed numbers into improper fractions. Three and one fifth: three times five is 15, plus one is 16. Sixteen fifths.', show: 'm.0', focus: 'm.0' },
        { say: 'One and three fifths: one times five is five, plus three is eight. Eight fifths.', show: 'm.1', focus: 'm.1' },
        { say: 'Now subtract the numerators: 16 minus eight is eight. Eight fifths. No regrouping needed!', show: 'm.2', focus: 'm.2' },
        { say: 'Change it back: eight divided by five is one, remainder three. One and three fifths, the same answer as way one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not flip the fractions', md: 'In $3\\dfrac{1}{5} - 1\\dfrac{3}{5}$, do not subtract $\\dfrac{1}{5}$ from $\\dfrac{3}{5}$ to get $2\\dfrac{2}{5}$. The first number’s fraction part is the one being taken from. Regroup a whole instead.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{3\\dfrac15 - 1\\dfrac35 \\ne 2\\dfrac25}', '\\text{Check: } 2\\dfrac25 + 1\\dfrac35 = 4, \\text{ not } 3\\dfrac15'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. When the parts do not fit, some people flip them, and take one fifth away from three fifths instead. That gives two and two fifths, which is wrong.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The first number’s fraction part is the one being taken from. You cannot swap the order in a subtraction.' },
        { say: 'You can check with addition. If the answer were two and two fifths, then two and two fifths plus one and three fifths would give back three and one fifth. But it gives four. So regroup a whole instead.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Which way is easier?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Which way is easier?', md: 'Wholes and parts is quick when the fraction parts are easy to add or subtract. Improper fractions are handy when you would need to regroup.' }],
      lines: [
        { say: 'Which way is easier? Wholes and parts is quick when the fraction parts are easy to add or subtract.', show: 'tip' },
        { say: 'Improper fractions are handy when you would need to regroup, because then there is nothing to trade.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $4\\dfrac{1}{4} - 2\\dfrac{3}{4}$.',
          choices: ['$1\\dfrac{2}{4}$', '$2\\dfrac{2}{4}$', '$1\\dfrac{1}{4}$', '$2\\dfrac{3}{4}$'],
          answer: 0,
          working: 'Regroup: $4\\tfrac{1}{4} = 3 + \\tfrac{5}{4}$. Wholes: $3 - 2 = 1$. Parts: $\\tfrac{5}{4} - \\tfrac{3}{4} = \\tfrac{2}{4}$. So the answer is $1\\tfrac{2}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find four and one fourth, minus two and three fourths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, one and two fourths. You cannot take three fourths from one fourth, so trade one whole for four fourths: four and one fourth is three plus five fourths. Three minus two is one, and five fourths minus three fourths is two fourths. Choice B flips the fractions.', show: 'q.answer' },
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
          items: ['If the fraction part is too small, **regroup**: trade $1$ whole for a fraction like $\\dfrac55$.', 'Or change to improper fractions, subtract the numerators, and change back.', 'Never flip the fractions.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When the fraction part is too small to take from, regroup: trade one whole for a fraction, like five fifths.', show: 'sum.0' },
        { say: 'Or change both mixed numbers to improper fractions, subtract the numerators, and change back.', show: 'sum.1' },
        { say: 'And never flip the fractions. In the next part, we solve word problems with fractions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
