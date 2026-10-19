import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columns } from './lib/m5-2-figures.ts';

// 12.45 + 8.79 = 21.24: carries into the tenths, the ones and the tens.
const total = figure('tt', [
  columns({
    top: '12.45',
    bottom: '8.79',
    answer: '21.24',
    op: '+',
    marks: [
      { id: 'k1', place: -1, tex: '1' },
      { id: 'k2', place: 0, tex: '1' },
      { id: 'k3', place: 1, tex: '1' },
    ],
  }),
]);

// 50.00 − 21.24 = 28.76: regroup a ten, then a one, then a tenth.
const change = figure('ch', [
  columns({
    top: '50.00',
    bottom: '21.24',
    answer: '28.76',
    op: '-',
    cross: [1, 0, -1, -2],
    marks: [
      { id: 'n1', place: 1, tex: '4', tone: 'theta' },
      { id: 't0', place: 0, tex: '10', tone: 'theta' },
      { id: 'n0', place: 0, tex: '9', tone: 'theta' },
      { id: 'td1', place: -1, tex: '10', tone: 'theta' },
      { id: 'nd1', place: -1, tex: '9', tone: 'theta' },
      { id: 'nd2', place: -2, tex: '10', tone: 'theta' },
    ],
  }),
]);

const video: Explainer = {
  id: 'm5-2-2-c',
  lessonId: 'm5-2-2',
  title: 'Estimating and Solving Problems, Part 3: Problems with Money',
  thumbnailTitle: 'Problems with Money',
  thumbnail: 'ch',
  summary: 'Money has two decimal places for the cents. Hana buys a sketchbook for $12.45 and markers for $8.79 and pays with $50: the total is $21.24 and the change is $28.76, checked with an estimate. Key words that often mean add or subtract.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting · Part 3', title: 'Problems with Money', subtitle: 'Dollars, cents and change' }],
      lines: [
        { say: 'You buy two things and pay with a fifty-dollar bill. How much change should you get back? Let’s work it out, step by step.', show: 'title' },
        { say: 'In this video, you will add and subtract money, and check your answer with an estimate.' },
      ],
    },
    {
      chapter: 'Dollars and cents',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'xl', md: '\\$12.45 = 12 dollars and 45 cents' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Money', md: 'Money has **two** decimal places. The digits after the point are cents. One cent is one hundredth of a dollar, because $100$ cents make one dollar.' },
      ],
      lines: [
        { say: 'Money has two decimal places. The digits before the point are dollars, and the two digits after the point are cents. So 12.45 dollars is twelve dollars and forty-five cents.', show: 't' },
        { say: 'One hundred cents make one dollar. So one cent is one hundredth of a dollar, and ten cents is one tenth of a dollar.', show: 'key' },
        { say: 'To add or subtract money, line up the decimal points, just like any other decimals.' },
      ],
    },
    {
      chapter: 'Key words',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Key words', md: '“Total”, “in all” and “altogether” often mean **add**. “How much more”, “how much is left” and “change” often mean **subtract**. Always think about what is happening in the story.' },
      ],
      lines: [
        { say: 'Some words in a problem give you a clue. Total, in all, and altogether often mean add.', show: 'tip' },
        { say: 'How much more, how much is left, and change often mean subtract.' },
        { say: 'But always think about what is really happening in the story. The words are only clues.' },
      ],
    },
    {
      chapter: 'The total cost',
      layout: 'split',
      leftWidth: 500,
      left: [total],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Hana buys a sketchbook for \\$12.45 and markers for \\$8.79. She pays with \\$50.00. How much change does she get?' },
        { kind: 'text', id: 'a', size: 'md', md: 'Total cost: **\\$21.24**' },
      ],
      lines: [
        { say: 'Hana buys a sketchbook for 12 dollars and 45 cents, and markers for 8 dollars and 79 cents. Hana pays with 50 dollars. How much change does Hana get?', show: 'q' },
        { say: 'This problem has two steps. First, find the total cost. Total means add. Line up the decimal points.', show: ['tt.top', 'tt.bottom', 'tt.bar'] },
        { say: 'Hundredths: five plus nine is fourteen. Write the four, and carry one. Tenths: one plus four plus seven is twelve. Write the two, and carry one.', show: ['tt.sd2', 'tt.k1', 'tt.sd1', 'tt.k2'], focus: ['tt.k1', 'tt.k2'] },
        { say: 'Ones: one plus two plus eight is eleven. Write the one, and carry one. Tens: one plus one is two.', show: ['tt.sp0', 'tt.k3', 'tt.sp1', 'tt.ps'], focus: 'tt.k3' },
        { say: 'The total cost is 21 dollars and 24 cents.', show: 'a', focus: 'tt.sum' },
      ],
    },
    {
      chapter: 'The change',
      layout: 'split',
      leftWidth: 500,
      left: [change],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Change: \\$50.00 − \\$21.24' },
        { kind: 'text', id: 'a', size: 'md', md: 'Hana gets **\\$28.76** in change.' },
      ],
      lines: [
        { say: 'Second, find the change. Change means subtract the total from the money Hana paid: 50 dollars minus 21 dollars and 24 cents. Write 50 as 50.00.', show: ['q', 'ch.top', 'ch.bottom', 'ch.bar'] },
        { say: 'The hundredths, tenths and ones are all zero, so regroup from the tens. The five tens become four, and the ones get ten.', show: ['ch.xp1', 'ch.n1', 'ch.xp0', 'ch.t0'], focus: ['ch.n1', 'ch.t0'] },
        { say: 'Then keep regrouping to the right. The ones become nine, the tenths become nine, and the hundredths become ten.', show: ['ch.n0', 'ch.xd1', 'ch.nd1', 'ch.xd2', 'ch.nd2'], hide: 'ch.t0', focus: ['ch.n0', 'ch.nd1', 'ch.nd2'] },
        { say: 'Now subtract. Hundredths: ten minus four is six. Tenths: nine minus two is seven. Ones: nine minus one is eight. Tens: four minus two is two.', show: ['ch.sd2', 'ch.sd1', 'ch.sp0', 'ch.sp1', 'ch.ps'], focus: 'ch.sum' },
        { say: 'Hana gets 28 dollars and 76 cents in change.', show: 'a' },
      ],
    },
    {
      chapter: 'Check with an estimate',
      layout: 'center',
      main: [
        { kind: 'text', id: 't1', size: 'lg', md: 'Spent: about \\$12 + \\$9 = \\$21' },
        { kind: 'text', id: 't2', size: 'lg', md: 'Change: about \\$50 − \\$21 = \\$29' },
        { kind: 'text', id: 't3', size: 'lg', md: '\\$28.76 is close to \\$29, so the answer is **reasonable**.' },
      ],
      lines: [
        { say: 'Check with an estimate. Round each price to the nearest dollar. Hana spent about 12 dollars plus 9 dollars, which is 21 dollars.', show: 't1' },
        { say: 'So the change should be about 50 dollars minus 21 dollars, which is 29 dollars.', show: 't2' },
        { say: '28 dollars and 76 cents is close to 29 dollars, so the answer is reasonable.', show: 't3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Leo buys a book for \\$7.85 and a pen for \\$2.39. Leo pays with \\$20.00. How much change does Leo get?',
          choices: ['\\$10.24', '\\$10.76', '\\$12.15', '\\$9.76'],
          answer: 3,
          working: 'Total: \\$7.85 + \\$2.39 = \\$10.24. Change: \\$20.00 − \\$10.24 = \\$9.76. Estimate: about \\$20 − \\$10 = \\$10, which is close.',
        },
      ],
      lines: [
        { say: 'Your turn. Leo buys a book for 7 dollars and 85 cents, and a pen for 2 dollars and 39 cents. Leo pays with 20 dollars. How much change does Leo get? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The total is 10 dollars and 24 cents. Then 20 dollars minus 10 dollars and 24 cents is 9 dollars and 76 cents. Choice A is the total cost: you still need to subtract it from 20 dollars.', show: 'q.answer' },
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
          items: ['Money has two decimal places: dollars, then cents.', 'Line up the decimal points to add or subtract money.', 'Change is the money paid minus the total. Check with an estimate.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Money has two decimal places: dollars before the point, and cents after it.', show: 'sum.0' },
        { say: 'Line up the decimal points to add or subtract money.', show: 'sum.1' },
        { say: 'Change is the money you pay, minus the total cost. And check with an estimate. In the next part, we solve problems with measurements. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
