import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { hundredGrid } from './lib/m5-6-figures.ts';

// 7 of 10 free throws: each throw is a column of 10 squares, so 7 columns are 70 squares.
const throws = (id: string) => figure(id, [hundredGrid({ block: [1, 10], shaded: 7, tone: 'good' })]);

// 9 of 20 students: first as 20 squares, then each student as a strip of 5 squares.
const twenty = (id: string) => figure(id, [hundredGrid({ rows: 2, shaded: 9, tone: 'opp' })], 160);
const strips = (id: string) => figure(id, [hundredGrid({ block: [5, 1], shaded: 9, tone: 'opp' })]);

// Quarters: 3 of 4 blocks of 25 squares.
const quarters = (id: string) => figure(id, [hundredGrid({ block: [5, 5], shaded: 3, tone: 'hyp' })]);

const video: Explainer = {
  id: 'm5-6-2-b',
  lessonId: 'm5-6-2',
  title: 'Ratios, Fractions, Decimals and Percentages, Part 2: Making the Whole 100',
  thumbnailTitle: 'Making the Whole 100',
  thumbnail: 'ft',
  summary: 'Changing a part of a whole to a percentage by multiplying the part and the whole by the same number to make the whole 100: 7 of 10 free throws is 70/100 = 0.7 = 70% (not 7%), 9 of 20 students is 45/100 = 0.45 = 45%, and the friendly wholes 10, 20, 25 and 50, with quarters as 25%, 50% and 75%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios and Percentages · Part 2', title: 'Making the Whole 100', subtitle: 'When the whole is not one hundred' }],
      lines: [
        { say: 'Most of the time, the whole is not one hundred. A player takes ten shots, or a class has twenty students.', show: 'title' },
        { say: 'In this video, you will change a part of a whole into a percentage, by making the whole one hundred.' },
      ],
    },
    {
      chapter: 'Four ways to show the same thing',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Ratio', 'Fraction', 'Decimal', 'Percentage'],
          rows: [
            ['$35 : 100$', '$\\dfrac{35}{100}$', '$0.35$', '$35\\%$'],
            ['$7 : 10$', '$\\dfrac{7}{10}$', '$0.7$', '$70\\%$'],
            ['$9 : 20$', '$\\dfrac{9}{20}$', '$0.45$', '$45\\%$'],
          ],
        },
      ],
      lines: [
        { say: 'Ratios, fractions, decimals and percentages can all show the same part of a whole. Each row of this table shows one part of a whole, written four ways.', show: 't.0', focus: 't.0' },
        { say: 'In the first row, the whole is one hundred, so the percentage is easy: thirty-five to one hundred is thirty-five percent.' },
        { say: 'But look at the next rows. Seven to ten is seventy percent, and nine to twenty is forty-five percent. Let’s see why.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
      ],
    },
    {
      chapter: 'Seven out of ten',
      layout: 'split',
      leftWidth: 480,
      left: [throws('ft')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Maya made $7$ of $10$ free throws. What percentage did Maya make?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{7}{10} = \\dfrac{7 \\times 10}{10 \\times 10} = \\dfrac{70}{100}', '\\dfrac{70}{100} = 0.7 = 70\\%'] },
      ],
      lines: [
        { say: 'Maya made seven of ten free throws. What percentage did Maya make?', show: 'q' },
        { say: 'The part-whole ratio is seven to ten, or seven over ten. But a percentage needs a whole of one hundred.' },
        { say: 'Ten times ten is one hundred, so multiply the whole by ten. To keep the same ratio, multiply the part by ten as well. Seven times ten is seventy.', show: 'm.0', focus: 'm.0' },
        { say: 'Look at the grid. Each free throw is one column of ten squares. Seven columns make seventy squares out of one hundred.', show: ['ft.grid', 'ft.blocks', 'ft.outline', 'ft.shade'], focus: 'ft.shade' },
        { say: 'So seven over ten equals seventy over one hundred, which is 0.7. Maya made seventy percent of the free throws.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Percent is out of 100', md: '$7$ out of $10$ is **not** $7\\%$. $7\\%$ means $7$ out of $100$. Change the whole to $100$ first: $7$ out of $10$ is $70$ out of $100$, which is $70\\%$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{7}{10} = \\bad{7\\%} \\quad \\text{\\bad{wrong}}', '\\dfrac{7}{10} = \\dfrac{70}{100} = \\good{70\\%} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out. Seven over ten is not seven percent.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Seven percent means seven out of one hundred. That would be only seven squares of the grid, a much smaller part.' },
        { say: 'Always change the whole to one hundred first. Seven over ten equals seventy over one hundred, which is seventy percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Friendly wholes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Making the whole 100', md: 'Multiply the part **and** the whole by the same number, so that the whole becomes $100$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['10 \\times 10 = 100 \\qquad 20 \\times 5 = 100', '25 \\times 4 = 100 \\qquad 50 \\times 2 = 100', '4 \\times 25 = 100 \\qquad 5 \\times 20 = 100'] },
      ],
      lines: [
        { say: 'Here is the rule. When the whole is not one hundred, multiply the part and the whole by the same number, so that the whole becomes one hundred.', show: 'key' },
        { say: 'Some wholes are friendly, because they multiply to make one hundred. Ten times ten is one hundred, and twenty times five is one hundred.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty-five times four is one hundred, and fifty times two is one hundred.', show: 'm.1', focus: 'm.1' },
        { say: 'And four times twenty-five, and five times twenty, make one hundred as well.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A class survey',
      layout: 'split',
      leftWidth: 480,
      left: [twenty('tw'), strips('st')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'In a class of $20$ students, $9$ have a pet. Write this part-whole ratio as a fraction, a decimal and a percentage.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{9}{20} = \\dfrac{9 \\times 5}{20 \\times 5} = \\dfrac{45}{100}', '\\dfrac{45}{100} = 0.45 = 45\\%'] },
      ],
      lines: [
        { say: 'In a class of twenty students, nine have a pet. Write the part-whole ratio of students with a pet to all the students as a fraction, a decimal number and a percentage.', show: ['q', 'tw'] },
        { say: 'Each square is one student. Nine of the twenty squares are shaded. As a fraction, that is nine over twenty.' },
        { say: 'Now make the whole one hundred. Twenty times five is one hundred, so multiply the part by five as well. Nine times five is forty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'In the big grid, each student is a strip of five squares. Nine strips make forty-five squares out of one hundred.', show: ['st.grid', 'st.blocks', 'st.outline', 'st.shade'], focus: 'st.shade' },
        { say: 'Forty-five out of one hundred is 0.45 as a decimal number, and forty-five percent as a percentage.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Quarters',
      layout: 'split',
      leftWidth: 480,
      left: [quarters('qt')],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Quarters', md: '$\\dfrac{1}{4} = 25\\%$, $\\dfrac{2}{4} = 50\\%$ and $\\dfrac{3}{4} = 75\\%$, because $4 \\times 25 = 100$.' },
      ],
      lines: [
        { say: 'Here is a tip about quarters. This grid is cut into four equal blocks. Each block is a quarter of the grid.', show: ['qt.grid', 'qt.blocks', 'qt.outline'] },
        { say: 'Four times twenty-five is one hundred, so each quarter is twenty-five squares. One quarter is twenty-five percent.', show: 'tip' },
        { say: 'Two quarters are fifty percent, and three quarters, like the shaded blocks, are seventy-five percent.', show: 'qt.shade', focus: 'qt.shade' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A spelling test has $25$ words. Sam spells $21$ of them correctly. What percentage of the words does Sam spell correctly?',
          choices: ['$21\\%$', '$84\\%$', '$42\\%$', '$16\\%$'],
          answer: 1,
          working: '$25 \\times 4 = 100$, so multiply the part by $4$ as well: $\\dfrac{21}{25} = \\dfrac{84}{100} = 84\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A spelling test has twenty-five words. Sam spells twenty-one of them correctly. What percentage of the words does Sam spell correctly? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, eighty-four percent. Twenty-five times four is one hundred, so multiply twenty-one by four as well, to get eighty-four over one hundred. Choice A forgets to make the whole one hundred.', show: 'q.answer' },
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
          items: ['To change a fraction to a percentage, make the whole $100$.', 'Multiply the part and the whole by the same number: $\\dfrac{9}{20} = \\dfrac{45}{100} = 45\\%$.', '$\\dfrac{7}{10}$ is $70\\%$, not $7\\%$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To change a fraction to a percentage, make the whole one hundred.', show: 'sum.0' },
        { say: 'Multiply the part and the whole by the same number. Nine over twenty is forty-five over one hundred, which is forty-five percent.', show: 'sum.1' },
        { say: 'And seven over ten is seventy percent, not seven percent. In the next part, you will find the rest of a whole. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
