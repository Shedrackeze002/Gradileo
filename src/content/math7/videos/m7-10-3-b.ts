import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { stackBar } from '@/content/math6/videos/lib/m6-12-figures.ts';

// The whole survey as a bar of 100%, cut into five pieces of 20%: one piece is 30 students (the
// basketball sector), so each piece is 30 and the whole is 5 × 30 = 150.
const fifths = (id: string) =>
  figure(
    id,
    [
      stackBar({
        parts: [0, 1, 2, 3, 4].map((k) => ({ id: `p${k}`, value: 20, tone: k === 0 ? 'adj' : 'muted', label: '30', below: '20\\%' })),
        whole: '100\\% = 5 \\times 30 = 150',
        width: 14,
        height: 1.6,
      }),
    ],
    260,
  );

const video: Explainer = {
  id: 'm7-10-3-b',
  lessonId: 'm7-10-3',
  title: 'Circle Graphs, Part 2: Finding the Total',
  thumbnailTitle: 'Finding the Total',
  thumbnail: 'fv',
  summary:
    'If you know how many are in one sector and its percent, you can find the total: divide to find 1%, then multiply by 100. If 30 students are 20% of a survey, 1% is 30 ÷ 20 = 1.5 students and 100% is 1.5 × 100 = 150 students; check: 0.20 × 150 = 30. In the same way, 18 students as 15% of a survey means 1.2 students per 1%, or 120 students in all.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis · Part 2', title: 'Finding the Total', subtitle: 'Working backward from one sector' }],
      lines: [
        { say: 'A circle graph tells you the percent in each sector. But what if you know how many people are in one sector, and not the total?', show: 'title' },
        { say: 'In this video, you will work backward from one sector to find the total number of people surveyed.' },
      ],
    },
    {
      chapter: 'Working backward',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'At a school, $30$ students chose basketball. That is $20\\%$ of the students surveyed. How many students were surveyed?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['20\\% \\to 30 \\text{ students}', '1\\% \\to 30 \\div 20 = 1.5 \\text{ students}', '100\\% \\to 1.5 \\times 100 = 150 \\text{ students}'] },
      ],
      lines: [
        { say: 'At a school, thirty students chose basketball. That is twenty percent of the students surveyed. How many students were surveyed?', show: 'q' },
        { say: 'You know that twenty percent of the students is thirty students.', show: 'm.0', focus: 'm.0' },
        { say: 'First find one percent. One percent is twenty times smaller, so divide by twenty. Thirty divided by twenty is one point five students.', show: 'm.1', focus: 'm.1' },
        { say: 'The total is one hundred percent, so multiply by one hundred. One point five times one hundred is one hundred fifty. So one hundred fifty students were surveyed.', show: 'm.2', focus: 'm.2' },
        { say: 'Of course, there is no such thing as one point five students! One percent is just a step in the working. The total comes out as a whole number.' },
      ],
    },
    {
      chapter: 'A picture of the whole',
      layout: 'center',
      main: [
        fifths('fv'),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Check: } 0.20 \\times 150 = 30 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Here is another way to see it. Draw the whole survey as one bar: one hundred percent.', show: ['fv.p0', 'fv.p1', 'fv.p2', 'fv.p3', 'fv.p4'] },
        { say: 'Twenty percent is one fifth of the whole, so the bar is made of five pieces of twenty percent. The basketball piece is thirty students.', focus: 'fv.p0' },
        { say: 'Every piece is twenty percent, so every piece is thirty students. Five pieces of thirty make one hundred fifty, the same answer.', show: 'fv.whole', focus: 'fv.whole' },
        { say: 'Always check your answer. Twenty percent of one hundred fifty is zero point two zero times one hundred fifty, which is thirty. It works!', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Another example',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'At a third school, $18$ students chose volleyball. That is $15\\%$ of the students surveyed. How many students were surveyed?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1\\% \\to 18 \\div 15 = 1.2 \\text{ students}', '100\\% \\to 1.2 \\times 100 = 120 \\text{ students}', '\\text{Check: } 0.15 \\times 120 = 18 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Try another one. At a third school, eighteen students chose volleyball. That is fifteen percent of the students surveyed. How many were surveyed?', show: 'q' },
        { say: 'Find one percent: eighteen divided by fifteen is one point two students.', show: 'm.0', focus: 'm.0' },
        { say: 'Then find one hundred percent: one point two times one hundred is one hundred twenty students.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: fifteen percent of one hundred twenty is zero point one five times one hundred twenty, which is eighteen. So one hundred twenty students were surveyed.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying by the percent', md: '$30 \\times 20 = 600$ is **not** the total. Check it: $20\\%$ of $600$ is $120$, not $30$. Divide by the percent to find $1\\%$ first.' },
      ],
      lines: [
        { say: 'Watch out. It is tempting to multiply the two numbers you are given: thirty times twenty is six hundred.', show: 'oops' },
        { say: 'But check it. Twenty percent of six hundred is one hundred twenty, not thirty. So six hundred cannot be the total.' },
        { say: 'Divide by the percent to find one percent first, and then multiply by one hundred. And always check your answer at the end.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$24$ students chose swimming. That is $8\\%$ of the students surveyed. How many students were surveyed?',
          choices: ['$192$', '$300$', '$32$', '$3$'],
          answer: 1,
          working: '$1\\%$ is $24 \\div 8 = 3$ students, so $100\\%$ is $3 \\times 100 = 300$ students. Check: $0.08 \\times 300 = 24$.',
        },
      ],
      lines: [
        { say: 'Your turn. Twenty-four students chose swimming. That is eight percent of the students surveyed. How many students were surveyed? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is B: three hundred. One percent is twenty-four divided by eight, which is three students, so one hundred percent is three hundred. Choice D is only one percent of the students, not the whole survey.', show: 'q.answer' },
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
          items: ['If you know a part and its percent, divide to find $1\\%$.', 'Then multiply by $100$ to find the total, $100\\%$.', 'Check: the percent of your total should give the part.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. If you know a part and its percent, divide the part by the percent to find one percent.', show: 'sum.0' },
        { say: 'Then multiply by one hundred to find the total.', show: 'sum.1' },
        { say: 'And check: the percent of your total should give back the part. In the next part, you will find the angle of each sector. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
