import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { heightFor } from '@/content/math5/videos/lib/m5-4-figures.ts';
import { decimalDivision } from '@/content/math6/videos/lib/m6-2-figures.ts';

// Exam question for Math 7 lesson 2.2 (multiplying and dividing decimals). The question is an
// exercise from OpenStax Prealgebra 2e, word for word (section 5.2, Decimal Operations, CC BY-NC-SA
// 4.0). Pay per hour = 362.50 ÷ 25 = 14.50: 36 − 25 = 11, 112 − 100 = 12, 125 − 125 = 0.

const QUESTION = 'Hourly Wage Maria got her first paycheck from her new job. She worked 25 hours and earned $362.50. How much does she earn per hour?';

/** 362.50 ÷ 25 = 14.50 as long division. */
const work = (() => {
  const part = decimalDivision({
    divisor: '25',
    dividend: '362.50',
    quotient: ' 1450',
    steps: [
      { prod: '25', at: 1, diff: '11', down: true },
      { prod: '100', at: 2, diff: '12', down: true },
      { prod: '125', at: 3, diff: '0', down: true },
      { prod: '0', at: 4, diff: '0' },
    ],
  });
  return figure('ld', [part], heightFor(part, 40));
})();

const video: Explainer = {
  id: 'xq-m7-2-2',
  lessonId: '',
  exam: {
    lesson: 'm7-2-2',
    source: 'OpenStax, Prealgebra 2e, Exercise in section 5.2, Decimal Operations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/5-2-decimal-operations',
    question: QUESTION,
  },
  title: 'Exam Question: Maria\'s Pay per Hour (Multiplying and Dividing Decimals)',
  thumbnailTitle: 'Maria\'s Pay per Hour',
  thumbnail: 'ld',
  summary:
    'A real test question, solved one small step at a time: Maria worked 25 hours and earned $362.50. How much does she earn per hour? Per hour means for each one hour, so we share the pay equally between the 25 hours: 362.50 ÷ 25 = 14.50 by long division, with the decimal point in the answer straight above the point in 362.50. Maria earns $14.50 per hour. Then we check by multiplying and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Maria\'s Pay per Hour', subtitle: 'Multiplying and dividing decimals, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about dividing a decimal. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: '**Hourly Wage** Maria got her first paycheck from her new job. She worked $25$ hours and earned \\$362.50. How much does she earn per hour?',
          answer: '\\$14.50 per hour',
          working: '362.50 ÷ 25 = 14.50',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Maria got her first paycheque from her new job. She worked 25 hours and earned 362 dollars and 50 cents. How much does she earn per hour?', caption: 'Maria got her first paycheck from her new job. She worked 25 hours and earned $362.50. How much does she earn per hour?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Per hour', md: '**Per hour** means **for each one hour**. Maria is paid the **same amount** for every hour, and \\$362.50 is the total for all $25$ hours. So we **share** the total equally between the hours: we **divide**.' }],
      lines: [
        { say: 'Per hour means for each one hour. Maria is paid the same amount for every hour she works.', show: 'c' },
        { say: '362 dollars and 50 cents is her pay for all 25 hours, so we share it equally between the hours. That is a division.', caption: '$362.50 is her pay for all 25 hours, so we share it equally between the hours. That is a division.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'key', title: 'Dividing a decimal by a whole number', md: 'Divide as with whole numbers. Put the **decimal point** in the answer **straight above** the point in the number being divided, and keep the digits in their columns.' }],
      lines: [
        { say: 'Here is what we need. To divide a decimal by a whole number, divide as you would with whole numbers.', show: 'c' },
        { say: 'Put the decimal point in the answer straight above the decimal point in the number being divided.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Set up $362.50 \\div 25$', 'Put the **point** in the answer first', 'Divide digit by digit'] }],
      lines: [
        { say: 'Here is the plan. Set up 362.50 divided by 25.', show: 'plan.0' },
        { say: 'Put the decimal point in the answer first.', show: 'plan.1' },
        { say: 'Then divide digit by digit.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Long division',
      layout: 'split',
      leftWidth: 540,
      left: [work],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['25 \\times 1 = 25', '25 \\times 4 = 100', '25 \\times 5 = 125', '\\text{pay: } \\good{\\$14.50 \\text{ per hour}}'] }],
      lines: [
        { say: 'Step one. Write 362.50 inside the bracket and 25 outside. Put the decimal point in the answer, straight above the point in 362.50.', show: ['ld.bracket', 'ld.dividend', 'ld.dv', 'ld.qp'], focus: ['ld.dp', 'ld.qp'] },
        { say: 'Step two. 25 does not go into 3, so look at 36. 25 goes into 36 once. Write 1, subtract 25, and 11 is left. Bring down the 2 to make 112.', show: ['ld.q1', 'ld.s0-prod', 'ld.s0-rule', 'ld.s0-diff', 'ld.s0-arrow', 'ld.s0-down', 'm.0'], focus: 'ld.s0-down' },
        { say: '25 goes into 112 four times. 4 times 25 is 100, and 12 is left. Bring down the 5 to make 125.', show: ['ld.q2', 'ld.s1-prod', 'ld.s1-rule', 'ld.s1-diff', 'ld.s1-arrow', 'ld.s1-down', 'm.1'], hide: 'ld.s0-arrow', focus: 'ld.s1-down' },
        { say: '25 goes into 125 exactly five times. Nothing is left, and the last 0 gives a 0. The answer is 14.50.', show: ['ld.q3', 'ld.s2-prod', 'ld.s2-rule', 'ld.s2-diff', 'ld.s2-arrow', 'ld.s2-down', 'ld.q4', 'ld.s3-prod', 'ld.s3-rule', 'ld.s3-diff', 'm.2'], hide: 'ld.s1-arrow', focus: 'ld.quotient' },
        { say: 'Step three. Maria earns 14 dollars and 50 cents per hour.', caption: 'Step three. Maria earns $14.50 per hour.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['25 \\times 14.50 = 362.50 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by multiplying. 25 hours at 14 dollars 50 an hour: 25 times 14 is 350, and 25 times 50 cents is 12 dollars 50. Together that is 362 dollars and 50 cents. It checks out.', caption: 'Let us check by multiplying. 25 × $14 = $350, and 25 × $0.50 = $12.50. Together that is $362.50. It checks out.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['\\$1.45', 'put the point in the wrong place: line it up **above** the point'],
            ['\\$9062.50', 'multiplied: **per hour** means share it out, so **divide**'],
            ['\\$337.50', 'subtracted $25$: the $25$ is **hours**, not dollars'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '1 dollar and 45 cents puts the decimal point in the wrong place. Line it up straight above the point in 362.50. A quick estimate helps: 25 hours at about 15 dollars is about 375 dollars, so the answer must be near 15.', caption: '$1.45 puts the point in the wrong place. Line it up above the point in 362.50. Estimate: 25 hours at about $15 is about $375, so the answer must be near $15.' },
        { say: 'A huge answer like 9 thousand 62 dollars comes from multiplying. Per hour means share it out, so divide.', caption: 'A huge answer like $9062.50 comes from multiplying. Per hour means share it out, so divide.' },
        { say: 'And 337 dollars and 50 cents subtracts 25. The 25 is a number of hours, not dollars.', caption: '$337.50 subtracts 25. The 25 is a number of hours, not dollars.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Five friends share a bill of \\$63.75 equally. How much does each friend pay?',
          choices: ['\\$12.75', '\\$1.275', '\\$58.75', '\\$12.57'],
          answer: 0,
          working: '63.75 ÷ 5 = 12.75.',
        },
      ],
      lines: [
        { say: 'Your turn. Five friends share a bill of 63 dollars and 75 cents equally. How much does each friend pay? Pause the video and try it.', caption: 'Your turn. Five friends share a bill of $63.75 equally. How much does each friend pay? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '63.75 divided by 5 is 12.75, with the point straight above. Each pays 12 dollars and 75 cents. Choice "A".', caption: '63.75 ÷ 5 = 12.75, with the point straight above. Each pays $12.75. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Per** hour means **divide**', 'Put the **point** in the answer first', 'Divide as with whole numbers', 'Check by **multiplying** back'] }],
      lines: [
        { say: 'Here is what to remember. Per hour means share it out: divide.', show: 'sum.0' },
        { say: 'Put the decimal point in the answer first, straight above.', show: 'sum.1' },
        { say: 'Divide as you would with whole numbers.', show: 'sum.2' },
        { say: 'And check by multiplying back. For more on multiplying and dividing decimals, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
