import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columns } from '@/content/math5/videos/lib/m5-2-figures.ts';
import { columnMultiply, heightFor } from '@/content/math5/videos/lib/m5-4-figures.ts';
import { decimalDivision } from './lib/m6-2-figures.ts';

// 315 × 17: 315 × 7 = 2205 (carry 3, then 1), 315 × 10 = 3150, 2205 + 3150 = 5355.
const multiply = (() => {
  const part = columnMultiply({ top: '315', bottom: '17', rows: ['2205', '3150'], answer: '5355', carries: [{ 1: '3', 2: '1' }], notes: ['\\leftarrow 315 \\times 7', '\\leftarrow 315 \\times 10'] });
  return figure('cm', [part], heightFor(part, 46));
})();

// 100.00 − 53.55 = 46.45: 100.00 regrouped as 9 tens, 9 ones, 9 tenths and 10 hundredths.
const change = figure('ch', [
  columns({
    top: '100.00',
    bottom: '53.55',
    answer: '46.45',
    op: '-',
    cross: [2, 1, 0, -1, -2],
    marks: [
      { id: 'n1', place: 1, tex: '9', tone: 'theta' },
      { id: 'n0', place: 0, tex: '9', tone: 'theta' },
      { id: 'nd1', place: -1, tex: '9', tone: 'theta' },
      { id: 'nd2', place: -2, tex: '10', tone: 'theta' },
    ],
  }),
]);

// 78.700 ÷ 21 = 3.747…: 78 − 63 = 15, 157 − 147 = 10, 100 − 84 = 16, 160 − 147 = 13.
const share = (() => {
  const part = decimalDivision({
    divisor: '21',
    dividend: '78.700',
    quotient: ' 3747',
    zerosFrom: 4,
    steps: [
      { prod: '63', at: 1, diff: '15', down: true },
      { prod: '147', at: 2, diff: '10', down: true },
      { prod: '84', at: 3, diff: '16', down: true },
      { prod: '147', at: 4, diff: '13' },
    ],
  });
  return figure('sh', [part], heightFor(part, 40));
})();

const video: Explainer = {
  id: 'm6-2-4-c',
  lessonId: 'm6-2-4',
  title: 'Multiplication and Division Problems, Part 3: Two-Step Problems',
  thumbnailTitle: 'Two-Step Money Problems',
  thumbnail: 'cm',
  summary: 'Problems that take two steps: 17 packs of markers at $3.15 cost 3.15 × 17 = $53.55, so the change from $100 is $46.45. Sharing a $78.70 gift among 21 friends: divide to the thousandths (3.747…) and round to the nearest cent, $3.75 each.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 3', title: 'Two-Step Problems', subtitle: 'Make a plan before you calculate' }],
      lines: [
        { say: 'Some money problems take more than one step. You might multiply, and then subtract. Or you might divide, and then round to the nearest cent.', show: 'title' },
        { say: 'In this video, you will make a plan for a problem with two steps, and solve it.' },
      ],
    },
    {
      chapter: 'Make a plan',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Simran buys $17$ packs of markers at \\$3.15 each. Simran pays with a \\$100 bill. How much change does Simran get?' },
        { kind: 'bullets', id: 'b', items: ['**Step 1:** Multiply to find the total cost: $3.15 \\times 17$.', '**Step 2:** Subtract the total from \\$100.00.'] },
      ],
      lines: [
        { say: 'Simran buys seventeen packs of markers at 3 dollars and 15 cents each. Simran pays with a hundred-dollar bill. How much change does Simran get?', show: 'q' },
        { say: 'Make a plan before you calculate. To find the change, we first need the total cost. Seventeen equal packs, so step one is to multiply: 3.15 times 17.', show: 'b.0' },
        { say: 'Step two is to subtract the total from 100 dollars.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Step 1: multiply',
      layout: 'split',
      leftWidth: 540,
      left: [multiply],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['315 \\times 17 = 5355', '3.15 \\times 17 = 53.55', '\\text{Estimate: } 3 \\times 17 = 51'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Total cost: **\\$53.55**' },
      ],
      lines: [
        { say: 'Multiply as whole numbers: 315 times 17.', show: ['cm.top', 'cm.bottom', 'cm.rule'] },
        { say: 'Seven times 315: seven times five is 35, write five and carry three. Seven times one is seven, plus three is ten, write zero and carry one. Seven times three is 21, plus one is 22. That makes 2,205.', show: ['cm.r0', 'cm.k0', 'cm.note0'], focus: 'cm.r0' },
        { say: 'Ten times 315 is 3,150. Add: 2,205 plus 3,150 is 5,355.', hide: 'cm.k0', show: ['cm.r1', 'cm.note1', 'cm.rule2', 'cm.ans', 'm.0'], focus: ['cm.ans', 'm.0'] },
        { say: '3.15 has two decimal places, so the total is 53.55. Check: three times 17 is 51, which is close. The total cost is 53 dollars and 55 cents.', show: ['m.1', 'm.2', 'a'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Step 2: subtract',
      layout: 'split',
      leftWidth: 560,
      left: [change],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Hundredths: } 10 - 5 = 5', '\\text{Tenths: } 9 - 5 = 4', '\\text{Ones: } 9 - 3 = 6', '\\text{Tens: } 9 - 5 = 4'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Simran gets **\\$46.45** in change.' },
      ],
      lines: [
        { say: 'Step two: subtract the total from 100 dollars. Write 100 as 100.00, and line up the decimal points.', show: ['ch.top', 'ch.bottom', 'ch.bar'] },
        { say: 'All the digits on the right are zeros, so regroup the one hundred. 100.00 is 9 tens, 9 ones, 9 tenths and 10 hundredths.', show: ['ch.xp2', 'ch.xp1', 'ch.xp0', 'ch.xd1', 'ch.xd2', 'ch.n1', 'ch.n0', 'ch.nd1', 'ch.nd2'], focus: ['ch.n1', 'ch.n0', 'ch.nd1', 'ch.nd2'] },
        { say: 'Hundredths: ten minus five is five. Tenths: nine minus five is four.', show: ['ch.sd2', 'ch.sd1', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Ones: nine minus three is six. Tens: nine minus five is four.', show: ['ch.sp0', 'ch.sp1', 'm.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'So Simran gets 46 dollars and 45 cents in change.', show: ['ch.ps', 'a'], focus: 'ch.sum' },
      ],
    },
    {
      chapter: 'Sharing a cost',
      layout: 'split',
      leftWidth: 500,
      left: [share],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$21$ friends share the cost of a \\$78.70 gift equally. How much does each friend pay, to the nearest cent?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['78.70 \\div 21 = 3.747\\ldots', '3.74\\thc{7} \\to \\thc{7} \\ge 5 \\to \\text{round up}', '\\approx 3.75'] },
      ],
      lines: [
        { say: 'Here is a different kind of two-step problem. Twenty-one friends share the cost of a gift equally. The gift costs 78 dollars and 70 cents. How much does each friend pay, to the nearest cent?', show: 'q' },
        { say: 'Sharing equally means divide: 78.70 divided by 21. A cent is one hundredth of a dollar, so we round to the hundredths. That means we divide one place further, to the thousandths. Write one more zero.', show: ['sh.bracket', 'sh.dividend', 'sh.dv', 'sh.zeros', 'sh.qp'], focus: 'sh.zeros' },
        { say: 'Twenty-one goes into 78 three times, which is 63, leaving 15. Bring down the seven to make 157. Twenty-one goes into 157 seven times, which is 147, leaving ten.', show: ['sh.q1', 'sh.q2', 'sh.s0-prod', 'sh.s0-rule', 'sh.s0-diff', 'sh.s0-arrow', 'sh.s0-down', 'sh.s1-prod', 'sh.s1-rule', 'sh.s1-diff'], focus: ['sh.q1', 'sh.q2'] },
        { say: 'Bring down a zero to make 100. Twenty-one goes into 100 four times, which is 84, leaving 16. Bring down the last zero to make 160. Twenty-one goes into 160 seven times, which is 147.', hide: 'sh.s0-arrow', show: ['sh.s1-arrow', 'sh.s1-down', 'sh.q3', 'sh.s2-prod', 'sh.s2-rule', 'sh.s2-diff', 'sh.s2-arrow', 'sh.s2-down', 'sh.q4', 'sh.s3-prod', 'sh.s3-rule', 'sh.s3-diff', 'm.0'], focus: ['sh.q3', 'sh.q4', 'm.0'] },
        { say: 'So far the quotient is 3.747, and it would keep going. Now round to the nearest cent. The thousandths digit is seven, which is five or more, so round up.', hide: ['sh.s1-arrow', 'sh.s2-arrow'], show: 'm.1', focus: 'm.1' },
        { say: 'Each friend pays about 3 dollars and 75 cents.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Four friends share a \\$25.90 bill equally. How much does each friend pay, to the nearest cent?',
          choices: ['\\$6.48', '\\$6.47', '\\$6.40', '\\$103.60'],
          answer: 0,
          working: 'Divide to the thousandths: $25.90 \\div 4 = 6.475$. The thousandths digit is $5$, so round up: \\$6.48.',
        },
      ],
      lines: [
        { say: 'Your turn. Four friends share a bill of 25 dollars and 90 cents equally. How much does each friend pay, to the nearest cent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 6 dollars and 48 cents. 25.90 divided by four is 6.475. The thousandths digit is five, so round up. Choice B just drops the five instead of rounding.', show: 'q.answer' },
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
          items: ['Make a plan: what do you find first?', 'Change: multiply to find the total, then subtract it from the money paid.', 'To the nearest cent: divide to the thousandths, then round to the hundredths.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a problem with two steps, make a plan before you calculate.', show: 'sum.0' },
        { say: 'To find the change for many equal items, multiply to find the total, then subtract it from the money paid.', show: 'sum.1' },
        { say: 'And to share a cost to the nearest cent, divide to the thousandths, then round to the hundredths. In the next part, we find the better buy. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
