import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columns } from './lib/m5-2-figures.ts';

// 52 − 27: regroup one ten as ten ones.
const simple = figure('sm', [
  columns({
    top: '52',
    bottom: '27',
    answer: '25',
    op: '-',
    cross: [1, 0],
    marks: [
      { id: 'n1', place: 1, tex: '4', tone: 'theta' },
      { id: 'n0', place: 0, tex: '12', tone: 'theta' },
    ],
  }),
]);

// 5003 − 1278 = 3725, regrouping across two zeros: the 10s are replaced by 9s as each is regrouped again.
const zeros = figure('zr', [
  columns({
    top: '5003',
    bottom: '1278',
    answer: '3725',
    op: '-',
    cross: [3, 2, 1, 0],
    marks: [
      { id: 'n3', place: 3, tex: '4', tone: 'theta' },
      { id: 't2', place: 2, tex: '10', tone: 'theta' },
      { id: 'n2', place: 2, tex: '9', tone: 'theta' },
      { id: 't1', place: 1, tex: '10', tone: 'theta' },
      { id: 'n1', place: 1, tex: '9', tone: 'theta' },
      { id: 'n0', place: 0, tex: '13', tone: 'theta' },
    ],
  }),
]);

const video: Explainer = {
  id: 'm5-2-1-b',
  lessonId: 'm5-2-1',
  title: 'Adding and Subtracting with Standard Algorithms, Part 2: Subtracting with the Standard Algorithm',
  thumbnailTitle: 'Subtracting Across Zeros',
  thumbnail: 'zr',
  summary: 'Subtracting in columns from right to left, regrouping when a top digit is too small: 52 − 27 = 25, then 5003 − 1278 = 3725, regrouping across zeros. Why you never take the smaller digit from the bigger one, and checking with addition.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting · Part 2', title: 'Subtracting with the Standard Algorithm', subtitle: 'Regrouping, even across zeros' }],
      lines: [
        { say: 'A store had 5,003 stickers, and sold 1,278 of them. How many are left? Subtracting can be tricky, especially when there are zeros in the way.', show: 'title' },
        { say: 'In this video, you will subtract with the standard algorithm, and learn how to regroup across zeros.' },
      ],
    },
    {
      chapter: 'The steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Line up the places, and start on the **right**.', 'In each column, subtract the **bottom** digit from the **top** digit.', 'If the top digit is too small, **regroup** $1$ from the place to the left.'],
        },
      ],
      lines: [
        { say: 'Here are the steps for subtracting. Line up the places, just as you do for adding, and start on the right.', show: 'b.0' },
        { say: 'In each column, subtract the bottom digit from the top digit.', show: 'b.1' },
        { say: 'If the top digit is too small, regroup. Take one from the place to the left, and trade it for ten of this place.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A simple regroup',
      layout: 'split',
      leftWidth: 480,
      left: [simple],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Ones: } 12 - 7 = 5', '\\text{Tens: } 4 - 2 = 2', '52 - 27 = 25'] }],
      lines: [
        { say: 'Let’s start with 52 minus 27. Start with the ones: two minus seven. Two is less than seven, so we cannot take seven away.', show: ['sm.top', 'sm.bottom', 'sm.bar', 'sm.cp0'], focus: 'sm.cp0' },
        { say: 'So regroup one ten from the tens column as ten ones. The five tens become four tens, and the two ones become twelve ones.', show: ['sm.xp1', 'sm.n1', 'sm.xp0', 'sm.n0'], focus: ['sm.n1', 'sm.n0'] },
        { say: 'Now, twelve minus seven is five.', show: ['sm.sp0', 'm.0'], focus: 'm.0' },
        { say: 'In the tens, four minus two is two. So 52 minus 27 is 25.', show: ['sm.sp1', 'sm.cp1', 'm.1', 'm.2'], hide: 'sm.cp0', focus: ['m.2', 'sm.sum'] },
      ],
    },
    {
      chapter: 'Regrouping across zeros',
      layout: 'split',
      leftWidth: 520,
      left: [zeros],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{Ones: } 13 - 8 = 5', '\\text{Tens: } 9 - 7 = 2', '\\text{Hundreds: } 9 - 2 = 7', '\\text{Thousands: } 4 - 1 = 3'],
        },
      ],
      lines: [
        { say: 'Now find 5,003 minus 1,278. In the ones, three is less than eight, so we need to regroup.', show: ['zr.top', 'zr.bottom', 'zr.bar', 'zr.cp0'], focus: 'zr.cp0' },
        { say: 'But the tens digit is zero, and so is the hundreds digit. There is nothing there to take! So go all the way to the thousands.', focus: ['zr.ap1', 'zr.ap2'] },
        { say: 'Regroup one thousand as ten hundreds. The five thousands become four, and the hundreds column now has ten.', show: ['zr.xp3', 'zr.n3', 'zr.xp2', 'zr.t2'], focus: ['zr.n3', 'zr.t2'] },
        { say: 'Next, regroup one of those hundreds as ten tens. The hundreds become nine, and the tens column now has ten.', show: ['zr.n2', 'zr.xp1', 'zr.t1'], hide: 'zr.t2', focus: ['zr.n2', 'zr.t1'] },
        { say: 'Then regroup one ten as ten ones. The tens become nine, and the ones become thirteen. Now the top digits are four, nine, nine and thirteen.', show: ['zr.n1', 'zr.xp0', 'zr.n0'], hide: 'zr.t1', focus: ['zr.n1', 'zr.n0'] },
        { say: 'Now subtract each column. Ones: thirteen minus eight is five. Tens: nine minus seven is two.', show: ['zr.sp0', 'zr.sp1', 'm.0', 'm.1'], hide: 'zr.cp0', focus: ['m.0', 'm.1'] },
        { say: 'Hundreds: nine minus two is seven. Thousands: four minus one is three. So 5,003 minus 1,278 is 3,725. The store has 3,725 stickers left.', show: ['zr.sp2', 'zr.sp3', 'm.2', 'm.3'], focus: ['m.2', 'm.3', 'zr.sum'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Taking the smaller digit from the bigger one', md: 'In the ones column, $3 - 8$ is **not** $8 - 3$. When the top digit is smaller, regroup first. Always subtract the bottom digit from the top digit.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{4275} \\;\\;\\text{(smaller from bigger)}', '\\good{3725}'] },
      ],
      lines: [
        { say: 'A common mistake is to flip the digits. In the ones column, three minus eight is not the same as eight minus three.', show: 'oops' },
        { say: 'If you take the smaller digit from the bigger one in every column, you get 4,275. That is wrong, by a lot!', show: 'm.0', focus: 'm.0' },
        { say: 'When the top digit is smaller, regroup first. Always subtract the bottom digit from the top digit.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Check with addition',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with addition', md: 'Add your answer to the number you subtracted. You should get the top number.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3725 + 1278 = 5003 \\;\\;\\checkmark'] },
      ],
      lines: [
        { say: 'Here is a great way to check a subtraction. Add your answer to the number you subtracted. You should get the top number.', show: 'tip' },
        { say: '3,725 plus 1,278 is 5,003. That is the number we started with, so the answer is right.', show: 'm.0', focus: 'm.0' },
        { say: 'This works because addition and subtraction undo each other.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $6002 - 2457$.',
          choices: ['$3545$', '$4455$', '$3645$', '$4545$'],
          answer: 0,
          working: 'Regroup across the zeros: the top digits become $5$, $9$, $9$ and $12$. Ones: $12 - 7 = 5$. Tens: $9 - 5 = 4$. Hundreds: $9 - 4 = 5$. Thousands: $5 - 2 = 3$. Check: $3545 + 2457 = 6002$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 6,002 minus 2,457. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Regroup across the zeros, so the top digits become five, nine, nine and twelve. Then subtract each column to get 3,545. Choice B takes the smaller digit from the bigger one in every column.', show: 'q.answer' },
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
          items: ['Subtract each column from right to left: the bottom digit from the top digit.', 'If a top digit is too small, regroup $1$ from the place to the left. Across zeros, go further left.', 'Check by adding your answer to the number you subtracted.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Subtract each column from right to left, always the bottom digit from the top digit.', show: 'sum.0' },
        { say: 'If a top digit is too small, regroup one from the place to the left. If that place is zero, keep going left until you find a digit to regroup.', show: 'sum.1' },
        { say: 'And check by adding your answer to the number you subtracted. In the next part, we add and subtract decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
