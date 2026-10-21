import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { link, pieceBar } from './lib/m8-2-figures.ts';

// 1% of 2,000 is a thin sliver of the whole bar; drawn bigger, it is 20, cut into four 5s.
const zoom = figure('z', [
  pieceBar({
    name: 'all',
    at: [0, 2.4],
    pieces: [
      { w: 0.12, tone: 'opp' },
      { w: 11.88, tex: '2{,}000' },
    ],
    brackets: [{ id: 'one', from: 0, to: 0, tex: '1\\% = 20', tone: 'opp', lift: 0.3 }],
  }),
  pieceBar({
    name: 'one',
    at: [0, 0],
    pieces: [
      { w: 3, tex: '5', tone: 'opp', below: '0.25\\%' },
      { w: 3, tex: '5', tone: 'theta' },
      { w: 3, tex: '5', tone: 'theta' },
      { w: 3, tex: '5', tone: 'theta' },
    ],
  }),
  link('l0', [0, 2.4], [0, 1]),
  link('l1', [0.12, 2.4], [12, 1]),
], 300);

const video: Explainer = {
  id: 'm8-2-2-c',
  lessonId: 'm8-2-2',
  title: 'Percent of a Number, Part 3: Less Than 1% of a Number',
  thumbnailTitle: 'Less Than 1% of a Number',
  thumbnail: 'z',
  summary:
    'Less than 1% of a number is less than one hundredth of it. Find 1% first, then take part of it: 1% of 2,000 is 20, and 0.25% is a quarter of 1%, so 0.25% of 2,000 is 20 ÷ 4 = 5. Check with the decimal: 0.25% = 0.0025 and 0.0025 × 2,000 = 5. ½% of 600 is 0.005 × 600 = 3. Careful: 25% of 2,000 is 500, but 0.25% of 2,000 is only 5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 3', title: 'Less Than 1% of a Number', subtitle: 'Find 1% first' }],
      lines: [
        { say: 'Less than one percent of a number is a very small part of it: less than one hundredth.', show: 'title' },
        { say: 'In this part, you will find percents like zero point two five percent of a number, in two different ways.' },
      ],
    },
    {
      chapter: 'Find 1% first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $0.25\\%$ of $2{,}000$.' },
        zoom,
        { kind: 'math', id: 'm', size: 'lg', lines: ['1\\% \\text{ of } 2{,}000 = 2{,}000 \\div 100 = 20', '0.25\\% = \\tfrac{1}{4} \\text{ of } 1\\%: \\quad 20 \\div 4 = 5'] },
      ],
      lines: [
        { say: 'Find zero point two five percent of two thousand.', show: 'q' },
        { say: 'Start with one percent. One percent is one hundredth, so divide by one hundred. Two thousand divided by one hundred is twenty.', show: ['z.all-p0', 'z.all-p1', 'z.all-one', 'm.0'], focus: ['m.0', 'z.all-p0'] },
        { say: 'One percent is just a thin sliver of the whole bar. Let’s draw it bigger: it is twenty.', show: ['z.l0', 'z.l1', 'z.one-p0', 'z.one-p1', 'z.one-p2', 'z.one-p3'] },
        { say: 'Zero point two five percent is one quarter of one percent. So cut the twenty into four equal pieces: each piece is five.', show: ['m.1', 'z.one-below0'], focus: ['m.1', 'z.one-p0'] },
        { say: 'So zero point two five percent of two thousand is five.' },
      ],
    },
    {
      chapter: 'Check with a decimal',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.25\\% = 0.25 \\div 100 = 0.0025', '0.0025 \\times 2{,}000 = 5 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Now check with the decimal method. Zero point two five percent is zero point two five divided by one hundred, which is zero point zero zero two five.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero point zero zero two five times two thousand is five. Both methods agree.', show: 'm.1', focus: 'm.1' },
        { say: 'Five is less than twenty, which is one percent of two thousand. That makes sense, because zero point two five percent is less than one percent.' },
      ],
    },
    {
      chapter: 'A fraction of a percent',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $\\tfrac{1}{2}\\%$ of $600$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\tfrac{1}{2}\\% = 0.5\\% = 0.005', '0.005 \\times 600 = 3', '\\text{Check: } 1\\% \\text{ of } 600 = 6, \\text{ and half of } 6 = 3'] },
      ],
      lines: [
        { say: 'Find one half percent of six hundred.', show: 'q' },
        { say: 'One half percent is zero point five percent. Divide by one hundred: zero point zero zero five.', show: 'm.0', focus: 'm.0' },
        { say: 'Zero point zero zero five times six hundred is three.', show: 'm.1', focus: 'm.1' },
        { say: 'Check by finding one percent first. One percent of six hundred is six, and half of six is three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: '0.25% is not 25%',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '0.25% is not 25%', md: '$25\\%$ of $2{,}000$ is $500$. But $0.25\\%$ of $2{,}000$ is only $5$. Divide the percent by $100$ carefully: $0.25\\% = 0.0025$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['25\\% \\text{ of } 2{,}000 = 0.25 \\times 2{,}000 = 500', '0.25\\% \\text{ of } 2{,}000 = 0.0025 \\times 2{,}000 = 5'] },
      ],
      lines: [
        { say: 'Be careful with the decimal point. Twenty-five percent of two thousand is a quarter of it: five hundred.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But zero point two five percent of two thousand is only five. That is one hundred times smaller.', show: 'm.1', focus: 'm.1' },
        { say: 'So divide the percent by one hundred carefully. Zero point two five percent is zero point zero zero two five, not zero point two five.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $0.5\\%$ of $800$.',
          choices: ['$4$', '$400$', '$40$', '$0.4$'],
          answer: 0,
          working: '$1\\%$ of $800$ is $8$, and $0.5\\%$ is half of that: $4$. Or: $0.5\\% = 0.005$, and $0.005 \\times 800 = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find zero point five percent of eight hundred. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One percent of eight hundred is eight, and half of that is four. Choice B, four hundred, is fifty percent of eight hundred, not zero point five percent.', show: 'q.answer' },
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
            'Less than $1\\%$ of a number is less than one hundredth of it.',
            'Find $1\\%$ first, then take part of it: $0.25\\%$ of $2{,}000$ is $20 \\div 4 = 5$.',
            'Or use the decimal: $0.25\\% = 0.0025$, and $0.0025 \\times 2{,}000 = 5$.',
            '$0.25\\%$ is not $25\\%$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Less than one percent of a number is less than one hundredth of it.', show: 'sum.0' },
        { say: 'You can find one percent first, then take part of it.', show: 'sum.1' },
        { say: 'Or change the percent to a decimal and multiply.', show: 'sum.2' },
        { say: 'And remember that zero point two five percent is not twenty-five percent. In the next part, you will solve problems with savings and fundraising. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
