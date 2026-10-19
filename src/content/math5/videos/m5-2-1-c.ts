import type { Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { figure } from '@/video/solids.ts';
import { columns } from './lib/m5-2-figures.ts';

// 12.500 + 3.875 = 16.375: the two zeros written onto 12.5 are yellow.
const add = figure('ad', [
  columns({
    top: '12.500',
    bottom: '3.875',
    answer: '16.375',
    op: '+',
    marks: [{ id: 'k0', place: 0, tex: '1' }],
    tones: { ad2: 'theta', ad3: 'theta' },
  }),
]);

// 8.000 − 3.465 = 4.535, regrouping from the ones across three zeros.
const sub = figure('sb', [
  columns({
    top: '8.000',
    bottom: '3.465',
    answer: '4.535',
    op: '-',
    cross: [0, -1, -2, -3],
    tones: { ad1: 'theta', ad2: 'theta', ad3: 'theta' },
    marks: [
      { id: 'n0', place: 0, tex: '7', tone: 'theta' },
      { id: 't1', place: -1, tex: '10', tone: 'theta' },
      { id: 'n1', place: -1, tex: '9', tone: 'theta' },
      { id: 't2', place: -2, tex: '10', tone: 'theta' },
      { id: 'n2', place: -2, tex: '9', tone: 'theta' },
      { id: 'n3', place: -3, tex: '10', tone: 'theta' },
    ],
  }),
]);

const caption = (id: string, at: [number, number], tex: string): Part => ({ points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place: 'below' }] });

// The same sum lined up on the right (wrong) and on the points (right).
const lineUp = figure('lu', [
  columns({ name: 'w', top: '12.5', bottom: '3.875', op: '+', align: 'right', tones: { ad1: 'bad', bd3: 'bad' } }),
  caption('w-cap', [-2.2, -0.6], '\\bad{\\text{last digits lined up}}'),
  columns({ name: 'r', top: '12.5', bottom: '3.875', answer: '16.375', op: '+', at: [9, 0], tones: { ad1: 'good', bd1: 'good' } }),
  caption('r-cap', [9.7, -0.6], '\\good{\\text{decimal points lined up}}'),
]);

const video: Explainer = {
  id: 'm5-2-1-c',
  lessonId: 'm5-2-1',
  title: 'Adding and Subtracting with Standard Algorithms, Part 3: Adding and Subtracting Decimals',
  thumbnailTitle: 'Adding and Subtracting Decimals',
  thumbnail: 'ad',
  summary: 'Adding and subtracting decimals in columns: line up the decimal points and write zeros at the right end. 12.5 + 3.875 = 16.375 and 8 − 3.465 = 4.535, and why lining up the last digits gives an answer that cannot be right.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting · Part 3', title: 'Adding and Subtracting Decimals', subtitle: 'Line up the decimal points' }],
      lines: [
        { say: 'Decimals are everywhere: in race times, in measurements, and in prices. The good news is that you add and subtract them with the same steps as whole numbers.', show: 'title' },
        { say: 'In this video, you will add and subtract decimals, and learn the one thing you must always do first.' },
      ],
    },
    {
      chapter: 'Line up the points',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'key',
          tone: 'key',
          title: 'Line up the decimal points',
          md: 'Write the numbers so the decimal points are in a line. Then every digit is under a digit with the same place value. Add zeros at the right end so the numbers have the same number of decimal places.',
        },
      ],
      lines: [
        { say: 'With decimals, the one thing you must always do first is line up the decimal points, one under the other.', show: 'key' },
        { say: 'Then every digit sits under a digit with the same place value: tenths under tenths, and hundredths under hundredths.' },
        { say: 'You can also add zeros at the right end, so the numbers have the same number of decimal places. Remember, these zeros do not change the values. They just fill the empty places.' },
      ],
    },
    {
      chapter: 'Adding decimals',
      layout: 'split',
      leftWidth: 560,
      left: [add],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{Thousandths: } 0 + 5 = 5', '\\text{Hundredths: } 0 + 7 = 7', '\\text{Tenths: } 5 + 8 = 13', '\\text{Ones: } 1 + 2 + 3 = 6', '\\text{Tens: } 1'],
        },
      ],
      lines: [
        { say: 'Find 12.5 plus 3.875. Write the numbers so the decimal points line up.', show: ['ad.top', 'ad.bottom', 'ad.bar'] },
        { say: '3.875 has three decimal places, so write 12.5 as 12.500. The two zeros, in yellow, fill the empty places without changing the value.', focus: ['ad.ad2', 'ad.ad3'] },
        { say: 'Start on the right. Thousandths: zero plus five is five. Hundredths: zero plus seven is seven.', show: ['ad.sd3', 'ad.sd2', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Tenths: five plus eight is thirteen. Write the three, and carry one to the ones.', show: ['ad.sd1', 'ad.k0', 'm.2'], focus: ['m.2', 'ad.k0'] },
        { say: 'Ones: one plus two plus three is six. Tens: just bring down the one.', show: ['ad.sp0', 'ad.sp1', 'm.3', 'm.4'], focus: ['m.3', 'm.4'] },
        { say: 'Put the decimal point in the answer, right under the other points. 12.5 plus 3.875 is 16.375.', show: 'ad.ps', focus: 'ad.sum' },
      ],
    },
    {
      chapter: 'Subtracting from a whole number',
      layout: 'split',
      leftWidth: 560,
      left: [sub],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{Thousandths: } 10 - 5 = 5', '\\text{Hundredths: } 9 - 6 = 3', '\\text{Tenths: } 9 - 4 = 5', '\\text{Ones: } 7 - 3 = 4'],
        },
      ],
      lines: [
        { say: 'Now find 8 minus 3.465. Where is the decimal point in 8? A whole number has its decimal point right after the ones digit. So write 8 as 8.000.', show: ['sb.top', 'sb.bottom', 'sb.bar'], focus: ['sb.ad1', 'sb.ad2', 'sb.ad3'] },
        { say: 'In the thousandths, zero is less than five. The tenths and hundredths are zero as well, so regroup from the ones. One one becomes ten tenths, and the eight becomes seven.', show: ['sb.xp0', 'sb.n0', 'sb.xd1', 'sb.t1'], focus: ['sb.n0', 'sb.t1'] },
        { say: 'Then one tenth becomes ten hundredths, so the tenths become nine. And one hundredth becomes ten thousandths, so the hundredths become nine, and the thousandths become ten.', show: ['sb.n1', 'sb.xd2', 'sb.t2', 'sb.n2', 'sb.xd3', 'sb.n3'], hide: ['sb.t1', 'sb.t2'], focus: ['sb.n1', 'sb.n2', 'sb.n3'] },
        { say: 'Now subtract. Thousandths: ten minus five is five. Hundredths: nine minus six is three. Tenths: nine minus four is five.', show: ['sb.sd3', 'sb.sd2', 'sb.sd1', 'm.0', 'm.1', 'm.2'], focus: ['m.0', 'm.1', 'm.2'] },
        { say: 'Ones: seven minus three is four. Put the point in line. So 8 minus 3.465 is 4.535.', show: ['sb.sp0', 'sb.ps', 'm.3'], focus: ['m.3', 'sb.sum'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Lining up the last digits', md: 'Line up the **decimal points**, not the right ends. Lined up on the right, the $5$ tenths of $12.5$ sits over the $5$ thousandths of $3.875$.' },
        lineUp,
      ],
      lines: [
        { say: 'Here is the big mistake to avoid. Some people line up the last digits, as on the left.', show: ['oops', 'lu.w-top', 'lu.w-bottom', 'lu.w-bar', 'lu.w-cap'] },
        { say: 'Then the five tenths of 12.5 sits over the five thousandths of 3.875. The digits are added in the wrong places, and the sum comes out less than 12.5. That cannot be right, because we are adding!', focus: ['lu.w-ad1', 'lu.w-bd3'] },
        { say: 'On the right, the decimal points are lined up, and every digit is in its own place. Always line up the decimal points, not the right ends.', show: ['lu.r-top', 'lu.r-bottom', 'lu.r-bar', 'lu.r-sum', 'lu.r-cap'], focus: ['lu.r-ad1', 'lu.r-bd1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $7.2 - 3.46$.',
          choices: ['$4.26$', '$3.84$', '$3.74$', '$4.74$'],
          answer: 2,
          working: 'Write $7.2$ as $7.20$ and line up the points. Regroup: the top digits become $6$, $11$ and $10$. Hundredths: $10 - 6 = 4$. Tenths: $11 - 4 = 7$. Ones: $6 - 3 = 3$. The answer is $3.74$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 7.2 minus 3.46. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Write 7.2 as 7.20, and line up the points. After regrouping, the hundredths give ten minus six, which is four. The tenths give eleven minus four, which is seven, and the ones give six minus three, which is three. Choice A takes the smaller digit from the bigger one in each column.', show: 'q.answer' },
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
          items: ['Line up the decimal points, not the right ends.', 'Add zeros at the right end so the numbers have the same number of decimal places.', 'Then add or subtract as with whole numbers, and keep the point in line.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To add or subtract decimals, line up the decimal points, not the right ends.', show: 'sum.0' },
        { say: 'Add zeros at the right end, so the numbers have the same number of decimal places. A whole number has its point after the ones digit.', show: 'sum.1' },
        { say: 'Then add or subtract just like whole numbers, and put the point in the answer right under the others. In the next part, we find missing numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
