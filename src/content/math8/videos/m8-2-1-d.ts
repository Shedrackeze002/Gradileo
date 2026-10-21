import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cellGrid } from './lib/m8-2-figures.ts';

// 125%: one full hundred grid and a quarter of another (25 squares).
const grids = figure('g', [
  cellGrid({ name: 'g1', blocks: [{ id: 'all', c0: 0, r0: 0, c1: 10, r1: 10 }], label: '100\\%' }),
  cellGrid({
    name: 'g2',
    at: [11.5, 0],
    blocks: [
      { id: 'q1', c0: 0, r0: 0, c1: 2, r1: 10, tone: 'opp' },
      { id: 'q2', c0: 2, r0: 0, c1: 3, r1: 5, tone: 'opp' },
    ],
    label: '25\\%',
    labelTone: 'opp',
  }),
], 300);

const video: Explainer = {
  id: 'm8-2-1-d',
  lessonId: 'm8-2-1',
  title: 'Percents Greater Than 100% and Less Than 1%, Part 4: Percents as Fractions',
  thumbnailTitle: 'Percents as Fractions',
  thumbnail: 'g',
  summary:
    'To write a percent as a fraction, write it over 100, clear any decimal, then simplify. 125% = 125/100 = 5/4 = 1¼. 0.5% = 0.5/100 = 5/1,000 = 1/200. ¼% = ¼ ÷ 100 = 1/400. A table shows 250%, 125%, 0.5%, 0.25% and 0.1% as decimals and fractions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 4', title: 'Percents as Fractions', subtitle: 'Over 100, then simplify' }],
      lines: [
        { say: 'A percent is a number out of one hundred, so any percent can be written as a fraction. That includes percents bigger than one hundred percent, and percents smaller than one percent.', show: 'title' },
        { say: 'In this part, you will write these percents as fractions in lowest terms.' },
      ],
    },
    {
      chapter: 'The steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**1.** Write the percent over $100$.',
            '**2.** If there is a decimal on top, clear it: multiply the top and the bottom by $10$.',
            '**3.** Simplify: divide the top and the bottom by the same number.',
          ],
        },
      ],
      lines: [
        { say: 'Here are the steps. One: write the percent over one hundred, because percent means out of one hundred.', show: 'b.0' },
        { say: 'Two: if there is a decimal on top, clear it. Multiply the top and the bottom by ten, so the top is a whole number. This does not change the value of the fraction.', show: 'b.1' },
        { say: 'Three: simplify. Divide the top and the bottom by the same number, until no number but one divides them both. That is lowest terms.', show: 'b.2' },
      ],
    },
    {
      chapter: 'More than 100%',
      layout: 'split',
      leftWidth: 560,
      left: [grids],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Write $125\\%$ as a fraction in lowest terms.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['125\\% = \\dfrac{125}{100}', '\\dfrac{125 \\div 25}{100 \\div 25} = \\dfrac{5}{4}', '\\dfrac{5}{4} = 1\\tfrac{1}{4}'] },
      ],
      lines: [
        { say: 'Write one hundred twenty-five percent as a fraction in lowest terms. In hundred grids, it is one whole grid and twenty-five squares of another.', show: ['q', 'g.g1-lines', 'g.g1-frame', 'g.g1-all', 'g.g1-label', 'g.g2-lines', 'g.g2-frame', 'g.g2-q1', 'g.g2-q2', 'g.g2-label'] },
        { say: 'First, write it over one hundred: one hundred twenty-five over one hundred.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty-five goes into both numbers. One hundred twenty-five divided by twenty-five is five, and one hundred divided by twenty-five is four. So the fraction is five over four.', show: 'm.1', focus: 'm.1' },
        { say: 'Five over four is one and one quarter. It makes sense: one hundred twenty-five percent is one whole grid, and a quarter of another.', show: 'm.2', focus: ['m.2', 'g.g2-q1', 'g.g2-q2'] },
      ],
    },
    {
      chapter: 'A decimal percent',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write $0.5\\%$ as a fraction in lowest terms.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.5\\% = \\dfrac{0.5}{100}', '\\dfrac{0.5 \\times 10}{100 \\times 10} = \\dfrac{5}{1{,}000}', '\\dfrac{5 \\div 5}{1{,}000 \\div 5} = \\dfrac{1}{200}'] },
      ],
      lines: [
        { say: 'Now write zero point five percent as a fraction. Write it over one hundred: zero point five over one hundred.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'A fraction should have whole numbers on the top and the bottom, so clear the decimal. Multiply the top and the bottom by ten: five over one thousand.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide both by five: one over two hundred. So zero point five percent is one over two hundred: one part in every two hundred.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A fraction of a percent',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write $\\tfrac{1}{4}\\%$ as a fraction in lowest terms.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{1}{4}\\% = \\tfrac{1}{4} \\div 100', '\\dfrac{1}{4} \\times \\dfrac{1}{100} = \\dfrac{1}{400}'] },
      ],
      lines: [
        { say: 'One quarter percent means one quarter out of one hundred. So it is one quarter divided by one hundred.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Dividing by one hundred is the same as multiplying by one over one hundred. One quarter times one over one hundred is one over four hundred.', show: 'm.1', focus: 'm.1' },
        { say: 'So one quarter percent is one over four hundred: one part in every four hundred. That is half of zero point five percent, as it should be.' },
      ],
    },
    {
      chapter: 'Three ways to write it',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tb',
          head: ['Percent', 'Decimal', 'Fraction'],
          rows: [
            ['$250\\%$', '$2.5$', '$\\dfrac{5}{2}$'],
            ['$125\\%$', '$1.25$', '$\\dfrac{5}{4}$'],
            ['$0.5\\%$', '$0.005$', '$\\dfrac{1}{200}$'],
            ['$0.25\\%$', '$0.0025$', '$\\dfrac{1}{400}$'],
            ['$0.1\\%$', '$0.001$', '$\\dfrac{1}{1{,}000}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are some percents written three ways. Two hundred fifty percent is two point five, or five over two.', show: 'tb.0' },
        { say: 'One hundred twenty-five percent is one point two five, or five over four. Both are more than one whole.', show: 'tb.1' },
        { say: 'Zero point five percent is zero point zero zero five, or one over two hundred.', show: 'tb.2' },
        { say: 'Zero point two five percent is zero point zero zero two five, or one over four hundred.', show: 'tb.3' },
        { say: 'And zero point one percent is zero point zero zero one, or one over one thousand. These are all less than one hundredth.', show: 'tb.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $0.2\\%$ as a fraction in lowest terms.',
          choices: ['$\\dfrac{1}{5}$', '$\\dfrac{1}{50}$', '$\\dfrac{2}{100}$', '$\\dfrac{1}{500}$'],
          answer: 3,
          working: '$0.2\\% = \\dfrac{0.2}{100} = \\dfrac{2}{1{,}000}$. Divide the top and the bottom by $2$: $\\dfrac{1}{500}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write zero point two percent as a fraction in lowest terms. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, one over five hundred. Zero point two over one hundred is two over one thousand, which simplifies to one over five hundred. Choice A, one fifth, is zero point two itself, and that is twenty percent.', show: 'q.answer' },
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
            'Write the percent over $100$, clear any decimal, then simplify.',
            '$125\\% = \\dfrac{125}{100} = \\dfrac{5}{4} = 1\\tfrac{1}{4}$',
            '$0.5\\% = \\dfrac{5}{1{,}000} = \\dfrac{1}{200}$ and $\\tfrac{1}{4}\\% = \\dfrac{1}{400}$',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To write a percent as a fraction, write it over one hundred, clear any decimal, then simplify.', show: 'sum.0' },
        { say: 'One hundred twenty-five percent is five over four, which is one and one quarter.', show: 'sum.1' },
        { say: 'Zero point five percent is one over two hundred, and one quarter percent is one over four hundred. In the next lesson, you will find a percent of a number. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
