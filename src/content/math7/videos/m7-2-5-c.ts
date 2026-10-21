import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';
import { shift } from '@/content/math6/videos/lib/m6-11-figures.ts';
import { tag } from './lib/m7-2-figures.ts';

// Marks out of 40 above, and the matching percents below: 34 marks lines up with 85%.
const scale = figure('sc', [
  numberLine({ name: 'mk', min: 0, max: 40, step: 2, every: 5, length: 13, points: [{ id: 'p', value: 34, tex: '34', tone: 'opp' }] }),
  shift(numberLine({ name: 'pc', min: 0, max: 100, step: 5, every: 5, length: 13, points: [{ id: 'p', value: 85, tex: '85\\%', tone: 'good', below: true }] }), 0, -2.4),
  tag('mk-title', [-0.6, 0], '\\text{marks}', { place: 'left', tone: 'adj' }),
  tag('pc-title', [-0.6, -2.4], '\\text{percent}', { place: 'left', tone: 'adj' }),
], 300);

const video: Explainer = {
  id: 'm7-2-5-c',
  lessonId: 'm7-2-5',
  title: 'Solving Percent Problems, Part 3: Test Scores',
  thumbnailTitle: 'Test Scores as Percents',
  thumbnail: 'sc',
  summary:
    'A test score as a percent is the marks earned divided by the total marks, times 100. 34 out of 40 is 34 ÷ 40 = 0.85, which is 85% (more than 3/4, so more than 75%). When the total is a factor of 100, make it out of 100: 18 out of 25 = 72 out of 100 = 72%. Percents make it easy to compare tests with different totals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Decimals and Percents · Part 3', title: 'Test Scores', subtitle: 'Marks as a percent' }],
      lines: [
        { say: 'You get thirty-four out of forty on one test, and eighteen out of twenty-five on another. Which did you do better on? The totals are different, so it is hard to tell.', show: 'title' },
        { say: 'In this part, you will turn test marks into percents, so every score is out of one hundred and easy to compare.' },
      ],
    },
    {
      chapter: 'A score as a percent',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A test score as a percent', md: 'Divide the marks you earned by the total marks. Then multiply by $100$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{score} = \\dfrac{\\text{marks earned}}{\\text{total marks}} \\times 100\\%'] },
      ],
      lines: [
        { say: 'A test score as a percent tells you how many marks you would have earned if the test were out of one hundred.', show: 'm' },
        { say: 'To find it, divide the marks you earned by the total marks. That gives a decimal. Then multiply by one hundred to change the decimal to a percent.', show: 'key' },
      ],
    },
    {
      chapter: 'A science test',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Maya got $34$ out of $40$ on a science test. What is her score as a percent?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Estimate: } 30 \\text{ out of } 40 \\text{ is } \\tfrac34 = 75\\%', '34 \\div 40 = 0.85', '0.85 \\times 100 = 85, \\text{ so } 85\\%'] },
      ],
      lines: [
        { say: 'Maya got thirty-four out of forty on a science test. What is the score as a percent?', show: 'q' },
        { say: 'Estimate first. Thirty out of forty would be three quarters, which is seventy-five percent. Thirty-four is more than thirty, so the score is more than seventy-five percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Now divide the marks by the total: thirty-four divided by forty is zero point eight five.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply by one hundred: eighty-five. Maya scored eighty-five percent, which is more than seventy-five, as the estimate said.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Marks and percents side by side',
      layout: 'center',
      main: [scale, { kind: 'math', id: 'm', size: 'lg', lines: ['34 \\text{ out of } 40 = 85\\%'] }],
      lines: [
        { say: 'Two number lines show why. The top one counts marks, from zero to forty.', show: ['sc.mk-axis', 'sc.mk-title'] },
        { say: 'The bottom one counts percent, from zero to one hundred. Forty marks is the whole test, so it lines up with one hundred percent. Thirty marks lines up with seventy-five percent.', show: ['sc.pc-axis', 'sc.pc-title'] },
        { say: 'Thirty-four marks sits right above eighty-five percent.', show: ['sc.mk-p', 'sc.pc-p', 'm'], focus: ['sc.mk-p', 'sc.pc-p'] },
      ],
    },
    {
      chapter: 'Making it out of 100',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Write $18$ out of $25$ as a percent.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['25 \\times 4 = 100', '\\dfrac{18}{25} = \\dfrac{18 \\times 4}{25 \\times 4} = \\dfrac{72}{100} = 72\\%'] },
      ],
      lines: [
        { say: 'Sometimes there is a shortcut. Write eighteen out of twenty-five as a percent.', show: 'q' },
        { say: 'Twenty-five is a factor of one hundred: twenty-five times four is one hundred.', show: 'm.0', focus: 'm.0' },
        { say: 'So multiply the marks and the total by four. Eighteen out of twenty-five is seventy-two out of one hundred, which is seventy-two percent. No division needed!', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Comparing two tests',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Test', 'Marks', 'Percent'],
          rows: [
            ['Science', '$34$ out of $40$', '$85\\%$'],
            ['Spelling', '$18$ out of $25$', '$72\\%$'],
          ],
        },
      ],
      lines: [
        { say: 'Now back to the question at the start. Thirty-four out of forty, or eighteen out of twenty-five: which is better?', show: ['t.0', 't.1'] },
        { say: 'As percents, the scores are eighty-five percent and seventy-two percent. Both are out of one hundred now, so they are easy to compare. The science test was better.', focus: 't.0' },
        { say: 'That is why scores are often given as percents. A percent puts every test on the same scale.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Theo got $21$ out of $25$ on a quiz. What is the score as a percent?',
          choices: ['$21\\%$', '$84\\%$', '$0.84\\%$', '$75\\%$'],
          answer: 1,
          working: '$25 \\times 4 = 100$, so $\\dfrac{21}{25} = \\dfrac{84}{100} = 84\\%$. Or divide: $21 \\div 25 = 0.84$, and $0.84 \\times 100 = 84$.',
        },
      ],
      lines: [
        { say: 'Your turn. Theo got twenty-one out of twenty-five on a quiz. What is the score as a percent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, eighty-four percent. Twenty-five times four is one hundred, so twenty-one out of twenty-five is eighty-four out of one hundred. Choice A just uses the marks earned, without comparing them to the total.', show: 'q.answer' },
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
          items: ['Test score: marks earned $\\div$ total marks, then multiply by $100$.', 'When the total is a factor of $100$, make it out of $100$: $\\dfrac{18}{25} = \\dfrac{72}{100} = 72\\%$.', 'Percents make it easy to compare tests with different totals.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To write a test score as a percent, divide the marks earned by the total marks, then multiply by one hundred.', show: 'sum.0' },
        { say: 'When the total is a factor of one hundred, you can make it out of one hundred instead.', show: 'sum.1' },
        { say: 'Percents put every test on the same scale, so they are easy to compare. In the next part, you will solve problems with two percents. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
