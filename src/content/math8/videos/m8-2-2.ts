import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pieceBar } from './lib/m8-2-figures.ts';

// 60 cut into ten pieces of 6 (10% each): 35% is three pieces and half of another, 18 + 3 = 21.
const tenth = { w: 1.2, tex: '6', below: '10\\%' };
const bar = figure('b', [
  pieceBar({
    pieces: [
      { ...tenth, tone: 'opp' },
      { ...tenth, tone: 'opp' },
      { ...tenth, tone: 'opp' },
      { w: 0.6, tex: '3', tone: 'opp' },
      { w: 0.6, tex: '3' },
      ...Array.from({ length: 6 }, () => tenth),
    ],
    brackets: [
      { id: 'part', from: 0, to: 3, tex: '35\\% = 18 + 3 = 21', tone: 'opp' },
      { id: 'whole', from: 0, to: 10, tex: '100\\% = 60', lift: 1.5 },
    ],
  }),
], 330);

const video: Explainer = {
  id: 'm8-2-2',
  lessonId: 'm8-2-2',
  title: 'Percent of a Number, Part 1: Change to a Decimal, Then Multiply',
  thumbnailTitle: 'Percent of a Number',
  thumbnail: 'b',
  summary:
    'To find a percent of a number, change the percent to a decimal, then multiply: 35% of 60 is 0.35 × 60 = 21. A bar of 60 cut into ten pieces of 6 shows the same thing: 35% is three pieces and half of another, 18 + 3 = 21. Estimate first: 50% is half and 100% is the whole number, so 35% of 60 should be less than 30.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 1', title: 'Change to a Decimal, Then Multiply', subtitle: 'Finding a percent of a number' }],
      lines: [
        { say: 'A class raises money for a trip. A bank pays interest on savings. A store has a sale. To work with percents like these, you need to find a percent of a number.', show: 'title' },
        { say: 'In this lesson, you will find a percent of a number, even when the percent is more than one hundred or less than one. This first part shows the method.' },
      ],
    },
    {
      chapter: 'Percent of a number',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Percent of a number', md: 'Change the percent to a **decimal**, then **multiply**.' },
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $35\\%$ of $60$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['35\\% = 0.35', '0.35 \\times 60 = 21'] },
      ],
      lines: [
        { say: 'To find a percent of a number, change the percent to a decimal, then multiply. In maths, the word of means multiply.', show: 'key' },
        { say: 'Find thirty-five percent of sixty.', show: 'q' },
        { say: 'Thirty-five percent is thirty-five hundredths, which is zero point three five as a decimal.', show: 'm.0', focus: 'm.0' },
        { say: 'Now multiply: zero point three five times sixty. Thirty-five times sixty is two thousand one hundred, and dividing by one hundred gives twenty-one.', show: 'm.1', focus: 'm.1' },
        { say: 'So thirty-five percent of sixty is twenty-one.' },
      ],
    },
    {
      chapter: 'A picture of 35% of 60',
      layout: 'center',
      main: [bar],
      lines: [
        { say: 'Here is a picture of the same problem. The bar is sixty: the whole, or one hundred percent.', show: ['b.p0', 'b.p1', 'b.p2', 'b.p3', 'b.p4', 'b.p5', 'b.p6', 'b.p7', 'b.p8', 'b.p9', 'b.p10', 'b.whole'] },
        { say: 'The bar is cut into ten equal pieces. Each piece is ten percent of sixty, which is six.', show: ['b.below0', 'b.below1', 'b.below2', 'b.below5', 'b.below6', 'b.below7', 'b.below8', 'b.below9', 'b.below10'] },
        { say: 'Thirty-five percent is three pieces, and half of another piece. Three pieces make eighteen, and half a piece is three.', focus: ['b.p0', 'b.p1', 'b.p2', 'b.p3'] },
        { say: 'Eighteen plus three is twenty-one. The picture agrees with the multiplication.', show: 'b.part', focus: 'b.part' },
      ],
    },
    {
      chapter: 'Estimate first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Estimate first', md: '$50\\%$ is half and $100\\%$ is the whole number. Use these to check that your answer is about the right size.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['35\\% < 50\\%, \\text{ so } 35\\% \\text{ of } 60 < 30', '21 < 30 \\ \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'It is smart to estimate first. Fifty percent is half, and one hundred percent is the whole number.', show: 'tip' },
        { say: 'Thirty-five percent is less than fifty percent. So thirty-five percent of sixty should be less than half of sixty, which is thirty.', show: 'm.0', focus: 'm.0' },
        { say: 'Twenty-one is less than thirty, so our answer is about the right size.', show: 'm.1', focus: 'm.1' },
        { say: 'If you had got two hundred ten, the estimate would warn you that something went wrong. That would come from using three point five instead of zero point three five.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $15\\%$ of $80$.',
          choices: ['$120$', '$12$', '$1.2$', '$65$'],
          answer: 1,
          working: '$15\\% = 0.15$, and $0.15 \\times 80 = 12$. Estimate: $10\\%$ of $80$ is $8$ and $20\\%$ is $16$, so $12$ is about right.',
        },
      ],
      lines: [
        { say: 'Your turn. Find fifteen percent of eighty. Estimate first! Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Fifteen percent is zero point one five, and zero point one five times eighty is twelve. Choice A, one hundred twenty, is more than eighty itself, but fifteen percent is much less than the whole.', show: 'q.answer' },
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
            'To find a percent of a number, change the percent to a decimal and multiply.',
            '$35\\%$ of $60$: $0.35 \\times 60 = 21$.',
            'Estimate first: $50\\%$ is half, and $100\\%$ is the whole number.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find a percent of a number, change the percent to a decimal, then multiply.', show: 'sum.0' },
        { say: 'Thirty-five percent of sixty is zero point three five times sixty, which is twenty-one.', show: 'sum.1' },
        { say: 'And estimate first, so you can tell if your answer is the right size. In the next part, you will find more than one hundred percent of a number. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
