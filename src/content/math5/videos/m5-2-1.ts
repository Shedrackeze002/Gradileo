import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columns, onesToTen } from './lib/m5-2-figures.ts';

// 45 678 + 23 457 = 69 135, carrying into the tens, hundreds and thousands.
const cans = figure('ad', [
  columns({
    top: '45678',
    bottom: '23457',
    answer: '69135',
    op: '+',
    marks: [
      { id: 'k1', place: 1, tex: '1' },
      { id: 'k2', place: 2, tex: '1' },
      { id: 'k3', place: 3, tex: '1' },
    ],
  }),
]);

const video: Explainer = {
  id: 'm5-2-1',
  lessonId: 'm5-2-1',
  title: 'Adding and Subtracting with Standard Algorithms, Part 1: Adding with the Standard Algorithm',
  thumbnailTitle: 'Adding Big Numbers',
  thumbnail: 'ad',
  summary: 'What a standard algorithm is, regrouping 13 ones as 1 ten and 3 ones, and adding in columns from right to left with carries: 45 678 + 23 457 = 69 135, and what goes wrong when a carry is forgotten.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Adding and Subtracting · Part 1', title: 'Adding with the Standard Algorithm', subtitle: 'Line up, add, and carry' }],
      lines: [
        { say: 'A school collected 45,678 cans in the fall, and 23,457 cans in the spring. How many cans is that in all?', show: 'title' },
        { say: 'Numbers this big are hard to add in your head. In this video, you will learn a set of steps that always works.' },
      ],
    },
    {
      chapter: 'The standard algorithm',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Standard algorithm', md: 'A **standard algorithm** is a set of steps that always works for a type of calculation. For adding and subtracting, you write the numbers in columns by place value and work from right to left.' }],
      lines: [
        { say: 'A set of steps that always works for a type of calculation is called a standard algorithm.', show: 'def' },
        { say: 'For adding and subtracting, you write the numbers in columns, by place value. Then you work from right to left, one column at a time.' },
      ],
    },
    {
      chapter: 'Regrouping',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Regroup', md: 'To **regroup** is to trade $10$ of one place for $1$ of the next place to the left, or $1$ of a place for $10$ of the place to its right.' },
        figure('rg', [onesToTen({ count: 13 })], 200),
      ],
      lines: [
        { say: 'Sometimes a column adds up to ten or more. Then you need to regroup.', show: 'def' },
        { say: 'To regroup is to trade ten of one place for one of the next place to the left. Here are thirteen ones.', show: 'rg.ones' },
        { say: 'Ten of them can be traded for one ten. So thirteen ones is the same as one ten and three ones.', show: ['rg.ten', 'rg.left'], focus: 'rg.ten' },
        { say: 'You can also trade the other way: one ten for ten ones. We will need that when we subtract.' },
      ],
    },
    {
      chapter: 'The steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Line up the digits by place value: ones under ones, tens under tens.', 'Add each column, starting on the **right**.', 'If a column adds to $10$ or more, write the ones digit and **carry** $1$ to the next column.'],
        },
      ],
      lines: [
        { say: 'Here are the steps for adding. First, line up the digits by place value: ones under ones, and tens under tens.', show: 'b.0' },
        { say: 'Next, add each column, starting on the right.', show: 'b.1' },
        { say: 'If a column adds up to ten or more, write the ones digit, and carry one to the next column on the left. Carrying is regrouping ten of one place as one of the next place.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Adding cans',
      layout: 'split',
      leftWidth: 560,
      left: [cans],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{Ones: } 8 + 7 = 15', '\\text{Tens: } 1 + 7 + 5 = 13', '\\text{Hundreds: } 1 + 6 + 4 = 11', '\\text{Thousands: } 1 + 5 + 3 = 9', '\\text{Ten thousands: } 4 + 2 = 6'],
        },
      ],
      lines: [
        { say: 'Let’s add the cans: 45,678 plus 23,457. Write the numbers in columns, with ones under ones, tens under tens, and so on.', show: ['ad.top', 'ad.bottom', 'ad.bar'] },
        { say: 'Start on the right, with the ones. Eight plus seven is fifteen. That is one ten and five ones. Write the five, and carry the one ten to the tens column.', show: ['ad.cp0', 'ad.sp0', 'ad.k1', 'm.0'], focus: ['m.0', 'ad.cp0', 'ad.k1'] },
        { say: 'Now the tens. One plus seven plus five is thirteen. Write the three, and carry one to the hundreds.', show: ['ad.cp1', 'ad.sp1', 'ad.k2', 'm.1'], hide: 'ad.cp0', focus: ['m.1', 'ad.cp1', 'ad.k2'] },
        { say: 'Hundreds: one plus six plus four is eleven. Write the one, and carry one to the thousands.', show: ['ad.cp2', 'ad.sp2', 'ad.k3', 'm.2'], hide: 'ad.cp1', focus: ['m.2', 'ad.cp2', 'ad.k3'] },
        { say: 'Thousands: one plus five plus three is nine. Nine is less than ten, so there is nothing to carry.', show: ['ad.cp3', 'ad.sp3', 'm.3'], hide: 'ad.cp2', focus: ['m.3', 'ad.cp3'] },
        { say: 'Ten thousands: four plus two is six. So the school collected 69,135 cans in all.', show: ['ad.cp4', 'ad.sp4', 'm.4'], hide: 'ad.cp3', focus: ['m.4', 'ad.sum'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting a carry', md: 'The small $1$s are the carries. Each one reminds you to add $1$ more in that column. Forget one, and the answer is wrong.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{69\\,125} \\;\\;\\text{(the carry into the tens was forgotten)}', '\\good{69\\,135}'] },
      ],
      lines: [
        { say: 'The small ones at the top are the carries. Each one reminds you to add one more in that column.', show: 'oops' },
        { say: 'If you forget the carry in the tens column, the tens add up to twelve instead of thirteen, and you get 69,125. That answer is ten less than it should be.', show: 'm.0', focus: 'm.0' },
        { say: 'So every time you carry, write the small one at the top of the next column, right away. Then you will not forget it.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $38\\,546 + 27\\,689$.',
          choices: ['$55\\,125$', '$56\\,235$', '$66\\,135$', '$66\\,235$'],
          answer: 3,
          working: 'Ones: $6 + 9 = 15$, carry $1$. Tens: $1 + 4 + 8 = 13$, carry $1$. Hundreds: $1 + 5 + 6 = 12$, carry $1$. Thousands: $1 + 8 + 7 = 16$, carry $1$. Ten thousands: $1 + 3 + 2 = 6$. The sum is $66\\,235$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 38,546 plus 27,689. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Every column needs a carry. The ones make fifteen, the tens thirteen, the hundreds twelve, and the thousands sixteen. Then the ten thousands are one plus three plus two, which is six. Choice A forgets every carry.', show: 'q.answer' },
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
          items: ['Line up the places, then add each column from right to left.', 'When a column adds to $10$ or more, carry $1$ to the next column.', 'Add the carry in the next column.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To add with the standard algorithm, line up the places, then add each column from right to left.', show: 'sum.0' },
        { say: 'When a column adds up to ten or more, write the ones digit, and carry one to the next column.', show: 'sum.1' },
        { say: 'And always add the carry in the next column. In the next part, we subtract, and regroup across zeros. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
