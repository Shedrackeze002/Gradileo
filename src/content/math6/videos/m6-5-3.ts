import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hundredGrid } from '@/content/math5/videos/lib/m5-6-figures.ts';
import { dotGroups } from './lib/m6-4-figures.ts';

// A hundred grid with 25 squares shaded.
const grid25 = (id: string) => figure(id, [hundredGrid({ shaded: 25, tone: 'theta' })]);

// The hundred grid in four blocks of 25: one block is a quarter.
const quarters = (id: string) => figure(id, [hundredGrid({ block: [5, 5], shaded: 1, tone: 'theta' })]);

// 32 in 4 equal groups of 8, and 40 in 4 equal groups of 10.
const thirtyTwo = (id: string) => figure(id, [dotGroups({ groups: 4, size: 8, cols: 4, perRow: 2, tones: ['good', 'muted', 'muted', 'muted'], labels: ['8', '8', '8', '8'] })]);
const forty = (id: string) => figure(id, [dotGroups({ groups: 4, size: 10, cols: 5, perRow: 2, tones: ['good', 'good', 'good', 'muted'], labels: ['10', '10', '10', '10'] })]);

const video: Explainer = {
  id: 'm6-5-3',
  lessonId: 'm6-5-3',
  title: 'Percent of a Number, Part 1: Percent Means Out of 100',
  thumbnailTitle: 'Percent Means Out of 100',
  thumbnail: 'hg',
  summary:
    'A percentage compares a quantity to 100: 25% means 25 out of 100, 25/100 = 1/4 of a hundred grid. Friendly percents are friendly fractions: 10% = 1/10, 20% = 1/5, 25% = 1/4, 50% = 1/2 and 75% = 3/4. So 25% of 32 is 32 ÷ 4 = 8, and 75% of 40 is 3 × 10 = 30.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Percents · Part 1', title: 'Percent Means Out of 100', subtitle: 'Friendly percents' }],
      lines: [
        { say: 'Everything is twenty-five percent off! Forty percent of our class walks to school. Percents are everywhere.', show: 'title' },
        { say: 'In this part, you will see what a percent means, and find friendly percents of a number.' },
      ],
    },
    {
      chapter: 'Out of 100',
      layout: 'split',
      leftWidth: 460,
      left: [grid25('g')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percentage', md: 'A **percentage** (or **percent**) compares a quantity to $100$. The symbol $\\%$ means “out of $100$”. $25\\%$ means $25$ out of $100$, or $\\dfrac{25}{100}$.' },
      ],
      lines: [
        { say: 'Here is a hundred grid. It has one hundred small squares: ten rows of ten.', show: ['g.grid', 'g.outline'] },
        { say: 'Twenty-five of the squares are shaded. That is twenty-five out of one hundred.', show: 'g.shade', focus: 'g.shade' },
        { say: 'A percentage compares a quantity to one hundred. The word percent means out of one hundred, and its symbol looks like this: a slash with a small circle on each side.', show: 'def' },
        { say: 'So twenty-five out of one hundred is twenty-five percent. As a fraction, it is twenty-five over one hundred.' },
      ],
    },
    {
      chapter: 'A quarter of the grid',
      layout: 'split',
      leftWidth: 460,
      left: [quarters('q')],
      right: [{ kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['4 \\times 25 = 100', '25\\% = \\dfrac{25}{100} = \\dfrac{1}{4}'] }],
      lines: [
        { say: 'Now cut the grid into four equal blocks. Each block has twenty-five squares, because four times twenty-five is one hundred.', show: ['q.grid', 'q.blocks', 'q.outline', 'm.0'], focus: 'm.0' },
        { say: 'So one block is twenty-five percent of the grid. And one block out of four is one quarter.', show: 'q.shade', focus: 'q.shade' },
        { say: 'Twenty-five percent equals twenty-five over one hundred, which simplifies to one quarter. Dividing the top and the bottom by twenty-five gives one over four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Friendly percents',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Percent', 'Out of 100', 'Fraction'],
          rows: [
            ['$10\\%$', '$\\dfrac{10}{100}$', '$\\dfrac{1}{10}$'],
            ['$20\\%$', '$\\dfrac{20}{100}$', '$\\dfrac{1}{5}$'],
            ['$25\\%$', '$\\dfrac{25}{100}$', '$\\dfrac{1}{4}$'],
            ['$50\\%$', '$\\dfrac{50}{100}$', '$\\dfrac{1}{2}$'],
            ['$75\\%$', '$\\dfrac{75}{100}$', '$\\dfrac{3}{4}$'],
          ],
        },
      ],
      lines: [
        { say: 'Some percents are friendly fractions. They are worth knowing by heart.' },
        { say: 'Ten percent is ten out of one hundred, which is one tenth.', show: 't.0', focus: 't.0' },
        { say: 'Twenty percent is twenty out of one hundred, which is one fifth.', show: 't.1', focus: 't.1' },
        { say: 'Twenty-five percent is one quarter, as we saw on the grid.', show: 't.2', focus: 't.2' },
        { say: 'Fifty percent is fifty out of one hundred, which is one half.', show: 't.3', focus: 't.3' },
        { say: 'And seventy-five percent is three quarters.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: '25% of 32',
      layout: 'split',
      leftWidth: 500,
      left: [thirtyTwo('tt')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $25\\%$ of $32$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['25\\% = \\dfrac14', '32 \\div 4 = 8'] },
      ],
      lines: [
        { say: 'Let’s use friendly percents. Find twenty-five percent of thirty-two.', show: 't' },
        { say: 'Twenty-five percent is one quarter. So we need one quarter of thirty-two.', show: 'm.0', focus: 'm.0' },
        { say: 'Split thirty-two into four equal groups. Thirty-two divided by four is eight in each group.', show: ['tt.g0', 'tt.g1', 'tt.g2', 'tt.g3', 'tt.labels', 'm.1'], focus: 'm.1' },
        { say: 'One quarter is one group: eight. So twenty-five percent of thirty-two is eight.', focus: 'tt.g0' },
      ],
    },
    {
      chapter: '75% of 40',
      layout: 'split',
      leftWidth: 500,
      left: [forty('ft')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $75\\%$ of $40$.' },
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['75\\% = \\dfrac34', '40 \\div 4 = 10', '3 \\times 10 = 30'] },
      ],
      lines: [
        { say: 'Now find seventy-five percent of forty.', show: 't' },
        { say: 'Seventy-five percent is three quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'One quarter of forty is forty divided by four, which is ten.', show: ['ft.g0', 'ft.g1', 'ft.g2', 'ft.g3', 'ft.labels', 'm.1'], focus: 'm.1' },
        { say: 'Three quarters is three groups: three times ten is thirty. So seventy-five percent of forty is thirty.', show: 'm.2', focus: ['m.2', 'ft.g0', 'ft.g1', 'ft.g2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $20\\%$ of $45$.',
          choices: ['$25$', '$900$', '$9$', '$4.5$'],
          answer: 2,
          working: '$20\\% = \\tfrac{1}{5}$, and $\\tfrac15$ of $45$ is $45 \\div 5 = 9$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find twenty percent of forty-five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, nine. Twenty percent is one fifth, and one fifth of forty-five is forty-five divided by five, which is nine. Choice D, four point five, is ten percent of forty-five, not twenty percent.', show: 'q.answer' },
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
            'A **percent** compares a quantity to $100$: $25\\%$ means $25$ out of $100$.',
            'Friendly percents: $10\\% = \\dfrac{1}{10}$, $20\\% = \\dfrac15$, $25\\% = \\dfrac14$, $50\\% = \\dfrac12$, $75\\% = \\dfrac34$.',
            'Use the fraction to find a friendly percent of a number: $25\\%$ of $32$ is $32 \\div 4 = 8$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A percent compares a quantity to one hundred. Twenty-five percent means twenty-five out of one hundred.', show: 'sum.0' },
        { say: 'Some percents are friendly fractions, like twenty-five percent, which is one quarter.', show: 'sum.1' },
        { say: 'Use the fraction to find a friendly percent of a number. In the next part, you will find any percent of a number. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
