import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { doubleLine, ratioTable } from './lib/m6-5-figures.ts';

// 30 out of 100 is 3 out of 10 (÷ 10), which is 18 out of 60 (× 6).
const table = (id: string) =>
  figure(id, [
    ratioTable({
      rows: ['\\text{Part}', '\\text{Whole}'],
      cols: [['30', '100'], ['3', '10'], ['\\thc{x}', '60']],
      titleWidth: 3.4,
      colWidth: 2.4,
      arrows: [
        { id: 'd10', from: 0, to: 1, label: '\\div 10', tone: 'hyp' },
        { id: 'x6', from: 1, to: 2, label: '\\times 6' },
      ],
    }),
  ]);

// Percents of 60: each 10% is 6.
const line = (id: string) =>
  figure(id, [
    doubleLine({
      top: Array.from({ length: 11 }, (_, i) => `\\small ${10 * i}\\%`),
      bottom: Array.from({ length: 11 }, (_, i) => `${6 * i}`),
      titles: ['\\text{Percent}', '\\text{Number}'],
      length: 14,
      titleRoom: 2.6,
      tones: ['theta', 'adj'],
    }),
  ], 260);

const video: Explainer = {
  id: 'm6-5-3-b',
  lessonId: 'm6-5-3',
  title: 'Percent of a Number, Part 2: Percent as a Proportion',
  thumbnailTitle: 'Percent as a Proportion',
  thumbnail: 'pl',
  summary:
    'A percent is a ratio with 100, so 30% of 60 is the x in the proportion 30/100 = x/60: 30/100 = 3/10, and 3 × 6 = 18. A double number line shows each 10% of 60 is 6, so 30% is 18. The quick rule multiplies by the percent and divides by 100 (30 × 60 = 1,800, 1,800 ÷ 100 = 18); dividing 60 by 30 is wrong.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios, Rates and Percents · Part 2', title: 'Percent as a Proportion', subtitle: 'Thirty percent of sixty' }],
      lines: [
        { say: 'Twenty-five percent of a number is easy: it is one quarter. But what about thirty percent of sixty?', show: 'title' },
        { say: 'In this part, you will use a proportion to find any percent of a number, and learn two quick ways as well.' },
      ],
    },
    {
      chapter: 'A percent is a ratio',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Find $30\\%$ of $60$.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['30\\% = \\dfrac{30}{100}', '\\dfrac{30}{100} = \\dfrac{x}{60}'] },
      ],
      lines: [
        { say: 'Find thirty percent of sixty.', show: 't' },
        { say: 'Thirty percent means thirty out of one hundred. So a percent is a ratio with one hundred.', show: 'm.0', focus: 'm.0' },
        { say: 'Thirty percent of sixty is the part of sixty that has the same ratio. Call the answer x. Then x out of sixty must equal thirty out of one hundred.', show: 'm.1', focus: 'm.1' },
        { say: 'That is a proportion: thirty over one hundred equals x over sixty. Now we can solve it.' },
      ],
    },
    {
      chapter: 'Solve the proportion',
      layout: 'split',
      leftWidth: 620,
      left: [table('tb')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{30}{100} = \\dfrac{3}{10}', '10 \\times 6 = 60', '3 \\times 6 = 18', '30\\% \\text{ of } 60 = 18'] }],
      lines: [
        { say: 'Here is the proportion as a ratio table: thirty out of one hundred, and x out of sixty.', show: ['tb.frame', 'tb.c0', 'tb.c2'] },
        { say: 'First, simplify thirty over one hundred. Divide both terms by ten: three over ten.', show: ['tb.c1', 'tb.d10', 'm.0'], focus: ['tb.d10', 'm.0'] },
        { say: 'Now look at the wholes. Ten times six is sixty.', show: 'm.1', focus: 'm.1' },
        { say: 'So multiply the part by six as well. Three times six is eighteen. So x is eighteen.', show: ['tb.x6', 'm.2'], focus: ['tb.x6', 'm.2'] },
        { say: 'Thirty percent of sixty is eighteen.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'On a double number line',
      layout: 'center',
      main: [line('pl'), { kind: 'text', id: 't', size: 'md', md: '$10\\%$ of $60$ is $6$, so $30\\%$ of $60$ is $3 \\times 6 = 18$.' }],
      lines: [
        { say: 'A double number line shows the same thing. The top line goes from zero percent to one hundred percent. The bottom line goes from zero to sixty, because sixty is the whole.', show: ['pl.lines', 'pl.v0', 'pl.v10'] },
        { say: 'Cut both lines into ten equal steps. Each step on the top is ten percent. Each step on the bottom is sixty divided by ten, which is six.', show: ['pl.v1', 'pl.v2', 'pl.v3', 'pl.v4', 'pl.v5', 'pl.v6', 'pl.v7', 'pl.v8', 'pl.v9'] },
        { say: 'Thirty percent is three steps. Three steps of six is eighteen.', show: ['pl.link3', 't'], focus: 'pl.v3' },
      ],
    },
    {
      chapter: 'The 10% trick',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The 10% trick', md: '$10\\%$ of a number is the number divided by $10$. $10\\%$ of $60$ is $6$. Then $30\\%$ is $3 \\times 6 = 18$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['10\\% \\text{ of } 60 = 60 \\div 10 = 6', '30\\% = 3 \\times 10\\% = 3 \\times 6 = 18'] },
      ],
      lines: [
        { say: 'That gives a handy trick. Ten percent of a number is the number divided by ten.', show: 'tip' },
        { say: 'Ten percent of sixty is sixty divided by ten, which is six.', show: 'm.0', focus: 'm.0' },
        { say: 'Thirty percent is three times ten percent. So thirty percent of sixty is three times six, which is eighteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A quick rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A quick rule', md: 'Multiply the number by the percent, then divide by $100$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['30 \\times 60 = 1{,}800', '1{,}800 \\div 100 = 18'] },
      ],
      lines: [
        { say: 'There is also a quick rule that always works. Multiply the number by the percent, then divide by one hundred.', show: 'key' },
        { say: 'Thirty times sixty is one thousand eight hundred.', show: 'm.0', focus: 'm.0' },
        { say: 'One thousand eight hundred divided by one hundred is eighteen. The same answer again!', show: 'm.1', focus: 'm.1' },
        { say: 'Dividing by one hundred takes care of the out of one hundred in a percent.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by the percent', md: '$30\\%$ of $60$ is **not** $60 \\div 30 = 2$. A percent is “out of $100$”. Multiply by $30$, then divide by $100$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{60 \\div 30 = 2}', '\\good{60 \\times 30 \\div 100 = 18} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Thirty percent of sixty is not sixty divided by thirty, which is two.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Two is far too small. Thirty percent is a little less than one third, and one third of sixty is twenty.' },
        { say: 'A percent means out of one hundred. So multiply by thirty, then divide by one hundred, to get eighteen.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $40\\%$ of $80$.',
          choices: ['$2$', '$32$', '$40$', '$320$'],
          answer: 1,
          working: '$10\\%$ of $80$ is $8$, so $40\\%$ is $4 \\times 8 = 32$. Or: $40 \\times 80 = 3{,}200$ and $3{,}200 \\div 100 = 32$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find forty percent of eighty. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, thirty-two. Ten percent of eighty is eight, so forty percent is four times eight, which is thirty-two. Choice A, two, divides eighty by forty, but a percent means out of one hundred.', show: 'q.answer' },
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
            'A percent is a ratio with $100$. Find a percent of a number with a proportion: $\\dfrac{30}{100} = \\dfrac{x}{60}$.',
            '$10\\%$ of a number is the number divided by $10$.',
            'Quick rule: multiply the number by the percent, then divide by $100$.',
            'Never divide the number by the percent.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A percent is a ratio with one hundred, so you can find a percent of a number with a proportion.', show: 'sum.0' },
        { say: 'Ten percent of a number is the number divided by ten.', show: 'sum.1' },
        { say: 'Or use the quick rule: multiply the number by the percent, then divide by one hundred.', show: 'sum.2' },
        { say: 'And never divide the number by the percent. In the next part, you will solve percent problems, like sales. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
