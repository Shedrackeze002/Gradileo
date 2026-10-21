import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hundred } from './lib/m6-12-figures.ts';

const video: Explainer = {
  id: 'm6-12-1-b',
  lessonId: 'm6-12-1',
  title: 'Relative Frequency, Part 2: Fractions, Decimals and Percentages',
  thumbnailTitle: 'Fractions, Decimals, Percentages',
  thumbnail: 'hk',
  summary: 'A relative frequency can be written as a fraction, a decimal or a percentage. When the total is a factor of 100, such as 20, 25 or 50, make an equivalent fraction out of 100: 7 out of 25 is 28 out of 100, so 0.28 or 28%; 9 out of 50 is 18 out of 100, so 0.18 or 18%. The frequency (7) is not the relative frequency.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Relative Frequency and Probability · Part 2', title: 'Fractions, Decimals and Percentages', subtitle: 'Three ways to write a relative frequency' }],
      lines: [
        { say: 'Seven out of twenty-five, zero point two eight, and twenty-eight percent. They look different, but they all say the same thing!', show: 'title' },
        { say: 'In this video, you will write a relative frequency as a fraction, a decimal and a percentage.' },
      ],
    },
    {
      chapter: 'Out of one hundred',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Make the total 100', md: 'When the total is a **factor of 100** (such as $20$, $25$ or $50$), make an equivalent fraction with denominator $100$. Then the decimal and the percentage are easy to read.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['20 \\times 5 = 100, \\quad 25 \\times 4 = 100, \\quad 50 \\times 2 = 100'] },
      ],
      lines: [
        { say: 'A relative frequency can be written as a fraction, a decimal, or a percentage. The trick is to turn the fraction into one out of one hundred.', show: 'key' },
        { say: 'You can do this when the total is a factor of one hundred: a number that divides evenly into one hundred, like twenty, twenty-five or fifty.', show: 'm', focus: 'm' },
        { say: 'Twenty times five is one hundred. Twenty-five times four is one hundred. And fifty times two is one hundred.' },
      ],
    },
    {
      chapter: 'Three forms',
      layout: 'split',
      leftWidth: 460,
      left: [figure('hk', [hundred({ shaded: 28 })], 400)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{fraction: } \\dfrac{7}{25}', '\\dfrac{7 \\times 4}{25 \\times 4} = \\dfrac{28}{100}', '\\text{decimal: } 0.28', '\\text{percentage: } 28\\%'] }],
      lines: [
        { say: 'In a survey of twenty-five students, seven chose hockey. Write the relative frequency of hockey as a fraction, a decimal and a percentage.', show: 'hk.grid' },
        { say: 'As a fraction, it is seven out of twenty-five. That is already in lowest terms.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty-five times four is one hundred. So multiply the top and the bottom by four. Seven out of twenty-five is the same as twenty-eight out of one hundred.', show: ['m.1', 'hk.shade'], focus: 'm.1' },
        { say: 'Twenty-eight out of one hundred is the decimal zero point two eight.', show: 'm.2', focus: 'm.2' },
        { say: 'And percent means out of one hundred. So it is twenty-eight percent: twenty-eight of the hundred squares.', show: 'm.3', focus: ['m.3', 'hk.shade'] },
      ],
    },
    {
      chapter: 'A total of fifty',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'Out of $50$ students, $9$ play an instrument.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{9}{50} = \\dfrac{9 \\times 2}{50 \\times 2} = \\dfrac{18}{100}', '= 0.18 = 18\\%'] },
      ],
      lines: [
        { say: 'Here is another one. Out of fifty students, nine play an instrument. What is the relative frequency?', show: 'q' },
        { say: 'As a fraction, it is nine out of fifty. Fifty times two is one hundred, so multiply the top and the bottom by two: eighteen out of one hundred.', show: 'm.0', focus: 'm.0' },
        { say: 'So the relative frequency is zero point one eight, or eighteen percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Writing the frequency instead', md: 'The relative frequency of hockey is **not** $7$. That is the frequency. Always divide by the total: $\\dfrac{7}{25} = 28\\%$.' },
      ],
      lines: [
        { say: 'Here is a common mistake. Seven students chose hockey, so some people say the relative frequency is seven.', show: 'oops' },
        { say: 'But seven is the frequency: how many students. The relative frequency is a part of the whole, so always divide by the total.', focus: 'oops' },
        { say: 'Seven out of twenty-five is twenty-eight percent of the students.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a class of $20$ students, $13$ have a pet. Which shows the relative frequency of having a pet?',
          choices: ['$\\dfrac{13}{20} = 0.65 = 65\\%$', '$\\dfrac{13}{20} = 0.13 = 13\\%$', '$\\dfrac{13}{20} = 0.2 = 20\\%$', '$\\dfrac{13}{20} = 0.35 = 35\\%$'],
          answer: 0,
          working: '$20 \\times 5 = 100$, so $\\dfrac{13}{20} = \\dfrac{65}{100} = 0.65 = 65\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a class of twenty students, thirteen have a pet. Which shows the relative frequency of having a pet? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, sixty-five percent. Twenty times five is one hundred, so thirteen out of twenty is sixty-five out of one hundred. Choice B uses the frequency, thirteen, as the percentage.', show: 'q.answer' },
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
          items: ['A relative frequency can be a fraction, a decimal or a percentage.', 'When the total is a factor of $100$, make a fraction out of $100$.', 'Always divide by the total: the frequency is not the relative frequency.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A relative frequency can be written as a fraction, a decimal or a percentage.', show: 'sum.0' },
        { say: 'When the total is a factor of one hundred, make an equivalent fraction out of one hundred. Then read off the decimal and the percentage.', show: 'sum.1' },
        { say: 'And always divide by the total. In the next part, you will use relative frequency to compare groups of different sizes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
