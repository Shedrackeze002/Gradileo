import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { placeChart } from './lib/m5-1-figures.ts';

const PLACES = ['Millions', 'Hundred thousands', 'Ten thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
const DIGITS = ['4', '5', '7', '2', '3', '0', '6'];

// 4 572 306 in a place value chart; the 7 (ten thousands) and the 5 (hundred thousands) are worth 70 000 and 500 000.
const chart = (id: string, notes = false) =>
  figure(id, [
    placeChart({
      places: PLACES,
      rows: [DIGITS],
      tones: notes ? { 'r0-2': 'good', 'r0-1': 'opp' } : {},
      notes: notes
        ? [
            { id: 'n7', col: 2, tex: '70\\,000', tone: 'good' },
            { id: 'n5', col: 1, tex: '500\\,000', tone: 'opp' },
          ]
        : [],
    }),
  ]);

// A one, a ten (a row of ten ones) and a hundred (ten rows of ten), side by side.
const blocks = figure('bl', [
  tiles({ name: 'one', cols: 1, rows: 1, at: [0, 0], size: 0.5 }),
  tiles({ name: 'ten', cols: 10, rows: 1, at: [1.6, 0], size: 0.5 }),
  tiles({ name: 'hun', cols: 10, rows: 10, at: [8.2, 0], size: 0.5 }),
  {
    points: { l1: [0.25, -0.2], l10: [4.1, -0.2], l100: [10.7, -0.2] },
    items: [
      { kind: 'label', id: 'one-name', at: 'l1', tex: '1', place: 'below', tone: 'adj' },
      { kind: 'label', id: 'ten-name', at: 'l10', tex: '10', place: 'below', tone: 'opp' },
      { kind: 'label', id: 'hun-name', at: 'l100', tex: '100', place: 'below', tone: 'good' },
    ],
  },
]);

const video: Explainer = {
  id: 'm5-1-1',
  lessonId: 'm5-1-1',
  title: 'Place Value to Millions and Thousandths, Part 1: Place Value to the Millions',
  thumbnailTitle: 'Place Value to the Millions',
  thumbnail: 'pv',
  summary: 'Digits, and why each place is worth ten times the place to its right (ones, tens and hundreds drawn as blocks), the place value chart up to the millions, and the value of a digit: the 7 in 4 572 306 is worth 70 000.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Place Value · Part 1', title: 'Place Value to the Millions', subtitle: 'What is each digit worth?' }],
      lines: [
        { say: 'A big hockey arena can sell more than eight hundred thousand tickets in a year. That is a huge number! But you can read it, and every number like it, with one simple idea.', show: 'title' },
        { say: 'In this video, you will learn what each digit in a number is worth, all the way up to the millions.' },
      ],
    },
    {
      chapter: 'Digits',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Digit', md: 'A **digit** is one of the ten symbols we use to write numbers: $0, 1, 2, 3, 4, 5, 6, 7, 8, 9$.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['\\good{2}5 \\qquad 5\\good{2}'] },
      ],
      lines: [
        { say: 'We write every number using just ten symbols: zero, one, two, three, four, five, six, seven, eight and nine. Each of these symbols is called a digit.', show: 'def' },
        { say: 'With only ten digits, we can write any number at all, even a huge one. The secret is where we put each digit.' },
        { say: 'Look at 25 and 52. They use the same two digits, but they are different numbers.', show: 'm.0' },
        { say: 'In 25, the two means two tens, which is twenty. In 52, the two means just two ones. Same digit, different place, different value.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Ten times as much',
      layout: 'center',
      main: [blocks, { kind: 'callout', id: 'key', tone: 'key', title: 'Ten times', md: 'Ten of one place make one of the next place to the left. So each place is worth $10$ times the place to its right.' }],
      lines: [
        { say: 'Let’s picture it with blocks. Here is one small square. It stands for one.', show: ['bl.one-outline', 'bl.one-name'] },
        { say: 'Put ten of them in a row, and you get a ten. Ten ones make one ten.', show: ['bl.ten-outline', 'bl.ten-grid', 'bl.ten-name'] },
        { say: 'Now put ten of those rows together, and you get a hundred. Ten tens make one hundred.', show: ['bl.hun-outline', 'bl.hun-grid', 'bl.hun-name'] },
        { say: 'Each time, ten of one place make one of the next place to the left. So each place is worth ten times the place to its right.', show: 'key' },
        { say: 'This pattern keeps going. Ten hundreds make one thousand. Ten thousands make one ten thousand. And it goes on, all the way up to the millions.' },
      ],
    },
    {
      chapter: 'The place value chart',
      layout: 'center',
      main: [
        chart('pv'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Place value', md: 'The **place value** of a digit is what the digit is worth because of where it sits in the number.' },
      ],
      lines: [
        { say: 'Now we can name the places. This is a place value chart. Starting from the right, the places are ones, tens, hundreds, thousands, ten thousands, hundred thousands and millions.', show: ['pv.frame', 'pv.head'] },
        { say: 'The chart shows the number four million, five hundred seventy-two thousand, three hundred six.', show: 'pv.row0' },
        { say: 'The place value of a digit is what the digit is worth, because of where it sits in the number.', show: 'def' },
      ],
    },
    {
      chapter: 'Groups of three',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['4\\,572\\,306'] },
        { kind: 'text', id: 't', size: 'md', md: 'We leave a small space between groups of three digits, counting from the right.' },
      ],
      lines: [
        { say: 'When we write a big number, we leave a small space between each group of three digits. We count the groups from the right.', show: ['m.0', 't'] },
        { say: 'The spaces make big numbers much easier to read. You can see at a glance that this number is in the millions.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The value of a digit',
      layout: 'center',
      main: [chart('val', true), { kind: 'math', id: 'm', size: 'md', lines: ['7 \\times 10\\,000 = 70\\,000', '5 \\times 100\\,000 = 500\\,000'] }],
      lines: [
        { say: 'What is the value of the seven in this number?', show: ['val.frame', 'val.head', 'val.row0'] },
        { say: 'Find the place of the seven. Count from the ones: ones, tens, hundreds, thousands, ten thousands. The seven is in the ten thousands place.', show: 'val.col2', focus: 'val.col2' },
        { say: 'So the seven is worth seven ten thousands. Seven times ten thousand is seventy thousand.', show: ['m.0', 'val.n7'], focus: 'm.0' },
        { say: 'Let’s try one more. The five is one place further left, in the hundred thousands place. So it is worth five hundred thousand.', show: ['val.col1', 'm.1', 'val.n5'], focus: ['m.1', 'val.col1'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The digit is not the value', md: 'The digit is $7$, but it is **worth** $70\\,000$. Always ask, “Which place is this digit in?”' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{In } 457\\colon \\quad 7 \\text{ is worth } 7', '\\text{In } 4\\,572\\,306\\colon \\quad 7 \\text{ is worth } 70\\,000'] },
      ],
      lines: [
        { say: 'Be careful not to mix up a digit and its value. The digit is seven, but it is worth seventy thousand.', show: 'oops' },
        { say: 'The same digit can be worth very different amounts. In 457, the seven is in the ones place, so it is worth just seven.', show: 'm.0', focus: 'm.0' },
        { say: 'In our big number, the seven is in the ten thousands place, so it is worth seventy thousand. So always ask yourself: which place is this digit in?', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the value of the $3$ in $6\\,831\\,425$?',
          choices: ['$3000$', '$30\\,000$', '$300\\,000$', '$3$'],
          answer: 1,
          working: 'Count from the ones: ones, tens, hundreds, thousands, ten thousands. The $3$ is in the ten thousands place, so it is worth $3 \\times 10\\,000 = 30\\,000$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the value of the three in six million, eight hundred thirty-one thousand, four hundred twenty-five? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Count from the ones: ones, tens, hundreds, thousands, ten thousands. The three is in the ten thousands place, so it is worth thirty thousand. Choice D is just the digit, not its value.', show: 'q.answer' },
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
          items: ['We write every number with ten digits, $0$ to $9$.', 'Each place is worth $10$ times the place to its right.', 'The value of a digit depends on its place: the $7$ in $4\\,572\\,306$ is worth $70\\,000$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. We write every number with just ten digits, zero to nine.', show: 'sum.0' },
        { say: 'Each place is worth ten times the place to its right: ones, tens, hundreds, and all the way up to millions.', show: 'sum.1' },
        { say: 'And the value of a digit depends on its place. In the next part, we go to the right of the ones, to tenths, hundredths and thousandths. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
