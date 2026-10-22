import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieceBar } from './lib/m8-2-figures.ts';

// 100% of 80 is 80; 150% of 80 is 80 + 40 = 120.
const bars = figure('b', [
  pieceBar({ name: 'one', at: [0, 2.6], pieces: [{ w: 8, tex: '80' }], label: '100\\%' }),
  pieceBar({
    name: 'more',
    at: [0, 0],
    pieces: [
      { w: 8, tex: '100\\% = 80' },
      { w: 4, tex: '50\\% = 40', tone: 'opp' },
    ],
    label: '150\\%',
    brackets: [{ id: 'all', from: 0, to: 1, tex: '80 + 40 = 120', tone: 'good' }],
  }),
], 330);

const video: Explainer = {
  id: 'm8-2-2-b',
  lessonId: 'm8-2-2',
  title: 'Percent of a Number, Part 2: More Than 100% of a Number',
  thumbnailTitle: 'More Than 100% of a Number',
  thumbnail: 'b',
  summary:
    '100% of a number is the number itself, so more than 100% of a number is more than the number. 150% of 80 is 1.5 × 80 = 120; check with mental math: 100% of 80 is 80 and 50% is 40, and 80 + 40 = 120. If the answer is less than 80, something went wrong: a common slip is to use 0.15 instead of 1.5. In the same way, 250% of 12 is 2.5 × 12 = 30.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 2', title: 'More Than 100% of a Number', subtitle: 'The answer is bigger than the number' }],
      lines: [
        { say: 'One hundred percent of a number is the number itself. So what happens when you take more than one hundred percent of a number?', show: 'title' },
        { say: 'In this part, you will find percents like one hundred fifty percent of a number, and see why the answer is bigger than the number.' },
      ],
    },
    {
      chapter: '100% is the number itself',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['100\\% = 1', '100\\% \\text{ of } 80 = 1 \\times 80 = 80'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'More than 100%', md: '$100\\%$ of a number is the number itself. So **more than $100\\%$** of a number is **more than the number**.' },
      ],
      lines: [
        { say: 'One hundred percent is one hundred out of one hundred, which is one whole. As a decimal, it is just one.', show: 'm.0', focus: 'm.0' },
        { say: 'So one hundred percent of eighty is one times eighty, which is eighty itself.', show: 'm.1', focus: 'm.1' },
        { say: 'That means more than one hundred percent of a number is more than the number.', show: 'key' },
      ],
    },
    {
      chapter: '150% of 80',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $150\\%$ of $80$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['150\\% = 1.5', '1.5 \\times 80 = 120'] },
      ],
      lines: [
        { say: 'Find one hundred fifty percent of the number eighty.', show: 'q' },
        { say: 'Change the percent to a decimal. One hundred fifty percent is one hundred fifty divided by one hundred, which is one point five.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply: one point five times eighty is one hundred twenty. One times eighty is eighty, and a half of eighty is forty, so that makes one hundred twenty.', show: 'm.1', focus: 'm.1' },
        { say: 'One hundred twenty is more than eighty, just as it should be.' },
      ],
    },
    {
      chapter: 'Check with mental math',
      layout: 'center',
      main: [bars, { kind: 'math', id: 'm', size: 'lg', lines: ['150\\% = 100\\% + 50\\%'] }],
      lines: [
        { say: 'You can check with mental math. One hundred fifty percent is one hundred percent plus fifty percent.', show: 'm', focus: 'm' },
        { say: 'One hundred percent of eighty is eighty, the whole bar.', show: ['b.one-p0', 'b.one-label'] },
        { say: 'Fifty percent of eighty is half of eighty, which is forty. So one hundred fifty percent is eighty and forty more.', show: ['b.more-p0', 'b.more-p1', 'b.more-label'], focus: 'b.more-p1' },
        { say: 'Eighty plus forty is one hundred twenty. It matches!', show: 'b.more-all', focus: 'b.more-all' },
      ],
    },
    {
      chapter: 'Too small to be right',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Too small to be right', md: 'If you find $150\\%$ of $80$ and get a number less than $80$, something went wrong. A common slip is to use $0.15$ instead of $1.5$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{0.15 \\times 80 = 12}', '150 \\div 100 = 1.5 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'If you find one hundred fifty percent of eighty and get a number less than eighty, something went wrong.', show: 'oops' },
        { say: 'A common slip is to use zero point one five instead of one point five. That gives twelve, which is only fifteen percent of eighty.', show: 'm.0', focus: 'm.0' },
        { say: 'Remember to divide the percent by one hundred. One hundred fifty divided by one hundred is one point five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: '250% of 12',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $250\\%$ of $12$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['250\\% = 2.5', '2.5 \\times 12 = 30', '\\text{Check: } 200\\% \\text{ of } 12 = 24, \\quad 50\\% \\text{ of } 12 = 6', '24 + 6 = 30 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Let’s try one more. Find two hundred fifty percent of twelve.', show: 'q' },
        { say: 'Two hundred fifty percent is two point five.', show: 'm.0', focus: 'm.0' },
        { say: 'Two point five times twelve is thirty.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: two hundred percent of twelve is twice twelve, twenty-four. Fifty percent of twelve is six. Twenty-four plus six is thirty.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $120\\%$ of $45$.',
          choices: ['$5.4$', '$9$', '$540$', '$54$'],
          answer: 3,
          working: '$120\\% = 1.2$, and $1.2 \\times 45 = 54$. Check: $100\\%$ of $45$ is $45$ and $20\\%$ of $45$ is $9$, so $45 + 9 = 54$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find one hundred twenty percent of forty-five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. One hundred twenty percent is one point two, and one point two times forty-five is fifty-four. Or think of it as forty-five, plus twenty percent of forty-five, which is nine. Choice A, five point four, is less than forty-five, so it cannot be more than one hundred percent of it.', show: 'q.answer' },
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
          items: [
            '$100\\%$ of a number is the number itself.',
            'More than $100\\%$ of a number is more than the number: $150\\%$ of $80$ is $120$.',
            'Check with mental math: $150\\% = 100\\% + 50\\%$.',
            'Divide the percent by $100$: $150\\% = 1.5$, not $0.15$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. One hundred percent of a number is the number itself.', show: 'sum.0' },
        { say: 'So more than one hundred percent of a number is more than the number. One hundred fifty percent of eighty is one hundred twenty.', show: 'sum.1' },
        { say: 'You can check by splitting the percent into one hundred percent plus the rest.', show: 'sum.2' },
        { say: 'And divide the percent by one hundred carefully. In the next part, you will find less than one percent of a number. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
