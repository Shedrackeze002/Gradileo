import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { columns, partWhole } from '@/content/math5/videos/lib/m5-2-figures.ts';

// 20.00 − 13.45 = 6.55: 20.00 regrouped as 1 ten, 9 ones, 9 tenths and 10 hundredths.
const change = figure('ch', [
  columns({
    top: '20.00',
    bottom: '13.45',
    answer: '6.55',
    op: '-',
    cross: [1, 0, -1, -2],
    tones: { ad1: 'theta', ad2: 'theta' },
    marks: [
      { id: 'n1', place: 1, tex: '1', tone: 'theta' },
      { id: 'n0', place: 0, tex: '9', tone: 'theta' },
      { id: 'nd1', place: -1, tex: '9', tone: 'theta' },
      { id: 'nd2', place: -2, tex: '10', tone: 'theta' },
    ],
  }),
]);

// The board: 5.4 m in all, 4.18 m cut off, and the piece that is left.
const board = figure('bd', [partWhole({ total: '5.4\\text{ m}', parts: [{ tex: '4.18\\text{ m}', share: 4.18 }, { tex: '?', share: 1.22, tone: 'theta' }], width: 11 })], 260);

// 5.40 − 4.18 = 1.22: one tenth regrouped as ten hundredths.
const cut = figure('ct', [
  columns({
    top: '5.40',
    bottom: '4.18',
    answer: '1.22',
    op: '-',
    cross: [-1, -2],
    tones: { ad2: 'theta' },
    marks: [
      { id: 'nd1', place: -1, tex: '3', tone: 'theta' },
      { id: 'nd2', place: -2, tex: '10', tone: 'theta' },
    ],
  }),
]);

const video: Explainer = {
  id: 'm6-2-1-b',
  lessonId: 'm6-2-1',
  title: 'Solving Addition and Subtraction Problems, Part 2: Subtracting with the Standard Algorithm',
  thumbnailTitle: 'Subtracting Decimals',
  thumbnail: 'ch',
  summary: 'Subtracting decimal numbers in columns: line up the points, start on the right and regroup from the next place when a top digit is too small. Change from $20 for a $13.45 book is $6.55 (20.00 is 19 ones, 9 tenths and 10 hundredths), a 5.4 m board less 4.18 m leaves 1.22 m, and adding back checks a subtraction.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Operations and Problem Solving · Part 2', title: 'Subtracting with the Standard Algorithm', subtitle: 'Regroup when the top digit is too small' }],
      lines: [
        { say: 'Maya buys a book and pays with a twenty-dollar bill. How much change should Maya get back? To find out, we subtract.', show: 'title' },
        { say: 'In this video, you will subtract decimal numbers with the standard algorithm, regroup when you need to, and check your answer by adding.' },
      ],
    },
    {
      chapter: 'Subtracting in columns',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Subtracting with the standard algorithm', md: 'Line up the decimal points and start on the right. When a top digit is **smaller** than the digit below it, **regroup** from the next place to the left.' },
      ],
      lines: [
        { say: 'Subtracting works the same way as adding. Line up the decimal points, and start with the column on the right.', show: 'key' },
        { say: 'Sometimes a top digit is smaller than the digit below it. Then regroup: take one from the next place to the left, and turn it into ten of this place.' },
      ],
    },
    {
      chapter: 'Making change',
      layout: 'split',
      leftWidth: 540,
      left: [change],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Maya pays for a \\$13.45 book with a \\$20 bill. How much change does Maya get?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Hundredths: } 10 - 5 = 5', '\\text{Tenths: } 9 - 4 = 5', '\\text{Ones: } 9 - 3 = 6', '\\text{Tens: } 1 - 1 = 0'] },
        { kind: 'text', id: 'a', size: 'md', md: 'Maya gets **\\$6.55** in change.' },
      ],
      lines: [
        { say: 'Maya pays for a book that costs 13 dollars and 45 cents, with a twenty-dollar bill. How much change does Maya get?', show: 'q' },
        { say: 'Change means subtract: 20 dollars minus 13 dollars and 45 cents. Write 20 as 20.00, so both numbers have two decimal places.', show: ['ch.top', 'ch.bottom', 'ch.bar'], focus: ['ch.ad1', 'ch.ad2'] },
        { say: 'Start on the right, with the hundredths. Zero minus five? The top digit is too small. And the tenths and the ones are zero as well, so we regroup from the tens.' },
        { say: 'Think of 20.00 as 19 ones, 9 tenths and 10 hundredths. Cross out the top digits, and write the new ones above: one ten, nine ones, nine tenths and ten hundredths.', show: ['ch.xp1', 'ch.xp0', 'ch.xd1', 'ch.xd2', 'ch.n1', 'ch.n0', 'ch.nd1', 'ch.nd2'], focus: ['ch.n1', 'ch.n0', 'ch.nd1', 'ch.nd2'] },
        { say: 'Now subtract each column. Hundredths: ten minus five is five. Tenths: nine minus four is five.', show: ['ch.sd2', 'ch.sd1', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Ones: nine minus three is six. Tens: one minus one is zero, so we do not need to write anything there.', show: ['ch.sp0', 'm.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Put the decimal point in line. Maya gets 6 dollars and 55 cents in change.', show: ['ch.ps', 'a'], focus: 'ch.sum' },
      ],
    },
    {
      chapter: 'Check by adding',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check subtraction with addition', md: 'Add your answer to the number you subtracted. You should get the number you started with.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['6.55 + 13.45 = 20.00 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'How can Maya be sure the change is right? Adding and subtracting undo each other.', show: 'tip' },
        { say: 'So add the answer to the number you subtracted. 6.55 plus 13.45 is 20.00. That is the twenty dollars Maya started with, so the change is right.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Cutting a board',
      layout: 'center',
      main: [{ kind: 'text', id: 'q', size: 'md', md: 'A board is $5.4$ m long. Ben cuts off $4.18$ m. How long is the piece that is left?' }, board],
      lines: [
        { say: 'Here is a problem with measurements. A board is 5.4 metres long. Ben cuts off 4.18 metres. How long is the piece that is left?', show: ['q', 'bd.whole'] },
        { say: 'Picture the board. The whole board is 5.4 metres. One part is cut off, and the other part is left.', show: ['bd.part0', 'bd.part1'], focus: 'bd.part1' },
        { say: 'We know the whole and one part, so subtract to find the other part: 5.4 minus 4.18.' },
      ],
    },
    {
      chapter: 'Subtracting the lengths',
      layout: 'split',
      leftWidth: 520,
      left: [cut],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Hundredths: } 10 - 8 = 2', '\\text{Tenths: } 3 - 1 = 2', '\\text{Ones: } 5 - 4 = 1', '1.22 + 4.18 = 5.40 \\;\\good{\\checkmark}'] },
        { kind: 'text', id: 'a', size: 'md', md: 'The piece that is left is **1.22 m** long.' },
      ],
      lines: [
        { say: 'Write 5.4 as 5.40, and line up the decimal points.', show: ['ct.top', 'ct.bottom', 'ct.bar'], focus: 'ct.ad2' },
        { say: 'Hundredths: zero minus eight? Too small. Regroup one tenth as ten hundredths. The four tenths become three, and the hundredths become ten.', show: ['ct.xd1', 'ct.xd2', 'ct.nd1', 'ct.nd2'], focus: ['ct.nd1', 'ct.nd2'] },
        { say: 'Now subtract. Hundredths: ten minus eight is two. Tenths: three minus one is two. Ones: five minus four is one.', show: ['ct.sd2', 'ct.sd1', 'ct.sp0', 'ct.ps', 'm.0', 'm.1', 'm.2'], focus: ['m.0', 'm.1', 'm.2'] },
        { say: 'So the piece that is left is 1.22 metres long. Check by adding: 1.22 plus 4.18 is 5.40. It works!', show: ['m.3', 'a'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Nadia pays for a \\$7.36 lunch with a \\$10 bill. How much change does Nadia get?',
          choices: ['\\$3.64', '\\$2.64', '\\$2.74', '\\$17.36'],
          answer: 1,
          working: 'Write \\$10 as \\$10.00. Regroup: $10.00$ is $9$ ones, $9$ tenths and $10$ hundredths. $10.00 - 7.36 = 2.64$. Check: $2.64 + 7.36 = 10.00$.',
        },
      ],
      lines: [
        { say: 'Your turn. Nadia pays for a lunch that costs 7 dollars and 36 cents, with a ten-dollar bill. How much change does Nadia get? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 2 dollars and 64 cents. Write 10 as 10.00 and regroup. Check: 2.64 plus 7.36 is 10.00. Choice A forgets that one of the ones was regrouped into tenths and hundredths.', show: 'q.answer' },
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
          items: ['Line up the decimal points, write zeros, and subtract from the right.', 'When a top digit is too small, regroup from the next place to the left.', 'Check by adding your answer to the number you subtracted.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To subtract decimal numbers, line up the decimal points, write zeros so the places match, and subtract from the right.', show: 'sum.0' },
        { say: 'When a top digit is too small, regroup from the next place to the left. Twenty dollars is 19 ones, 9 tenths and 10 hundredths.', show: 'sum.1' },
        { say: 'And check by adding your answer to the number you subtracted. In the next part, we solve problems that take two steps. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
