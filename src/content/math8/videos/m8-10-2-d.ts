import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { headedTree } from '@/content/math30-3/videos/lib/m303-7-figures.ts';

const t = (s: string) => `\\text{${s}}`;

// A 30% chance of rain on Saturday and 40% on Sunday, independent. The paths: rain both days
// 0.3 × 0.4 = 0.12, rain then dry 0.3 × 0.6 = 0.18, dry then rain 0.7 × 0.4 = 0.28, and dry both
// days 0.7 × 0.6 = 0.42; together 1.
const sunday = [
  { name: t('Rain'), p: '0.4', tone: 'adj' as const },
  { name: t('Dry'), p: '0.6', tone: 'theta' as const },
];
const weekend = (id: string) =>
  figure(
    id,
    [
      headedTree({
        first: [
          { name: t('Rain'), p: '0.3', tone: 'adj' },
          { name: t('Dry'), p: '0.7', tone: 'theta' },
        ],
        second: [sunday, sunday],
        ends: ['0.12', '0.18', '0.28', '0.42'],
        heads: [t('Saturday'), t('Sunday')],
        gap: 1.6,
        groupGap: 1,
        room: 3,
      }),
    ],
    330,
  );
const branches = (id: string) => [`${id}.start`, `${id}.heads`, `${id}.s1`, `${id}.s2-0`, `${id}.s2-1`];

const video: Explainer = {
  id: 'm8-10-2-d',
  lessonId: 'm8-10-2',
  title: 'Probability of Independent Events, Part 4: Both, Neither and At Least One',
  thumbnailTitle: 'Both, Neither, At Least One',
  thumbnail: 'al',
  summary:
    'With a 30% chance of rain on Saturday and 40% on Sunday, and the days independent, change the percents to decimals and multiply. Rain on both days: 0.3 × 0.4 = 0.12, or 12%, not 30% + 40% = 70%. Rain on neither day: 0.7 × 0.6 = 0.42, or 42%, using 100% minus each percent first. Rain on at least one day is the opposite of neither: 100% − 42% = 58%, which the tree diagram confirms: 12% + 18% + 28% = 58%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability · Part 4', title: 'Both, Neither and At Least One', subtitle: 'Probabilities as percents' }],
      lines: [
        { say: 'Weather forecasts give the chance of rain as a percent. So how do you find the chance that it rains on both days of a weekend? Or on neither day?', show: 'title' },
        { say: 'In this video, you will multiply percents to answer both questions, and one more: the chance of rain on at least one day.' },
      ],
    },
    {
      chapter: 'Rain on both days',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A $30\\%$ chance of rain on Saturday and a $40\\%$ chance on Sunday. The days are independent.' },
        weekend('bo'),
        { kind: 'math', id: 'm', size: 'md', lines: ['30\\% = 0.3 \\quad \\text{and} \\quad 40\\% = 0.4', '0.3 \\times 0.4 = 0.12 = 12\\%'] },
      ],
      lines: [
        { say: 'The forecast for a camping weekend gives a thirty percent chance of rain on Saturday, and a forty percent chance on Sunday.', show: 'q' },
        { say: 'Assume the two days are independent: rain on Saturday does not change the chance of rain on Sunday. Here is the tree diagram for the weekend.', show: branches('bo') },
        { say: 'To multiply percents, change them to decimals first. Thirty percent is zero point three, and forty percent is zero point four.', show: 'm.0', focus: 'm.0' },
        { say: 'Rain on both days is the top path. Multiply: zero point three times zero point four is zero point one two.', show: 'bo.e0-0', focus: ['bo.b0', 'bo.b0-0', 'bo.e0-0'] },
        { say: 'Change it back to a percent: zero point one two is twelve percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding instead of multiplying', md: 'The chance of rain on **both** days is **not** $30\\% + 40\\% = 70\\%$. Both days must be rainy, which is **less** likely than either day alone. Multiply: $12\\%$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{30\\% + 40\\% = 70\\%} \\quad \\text{wrong}', '\\good{0.3 \\times 0.4 = 12\\%} \\quad \\text{right}'] },
      ],
      lines: [
        { say: 'Watch out. It is tempting to add: thirty percent plus forty percent is seventy percent. But that is wrong.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'For rain on both days, Saturday must be rainy, and Sunday must be rainy as well. That is less likely than rain on just one of the days, so the answer must be less than thirty percent.' },
        { say: 'Multiplying gives twelve percent, which makes sense. Adding gives seventy percent, which is far too big.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Neither day',
      layout: 'center',
      main: [weekend('ne'), { kind: 'math', id: 'm', size: 'md', lines: ['100\\% - 30\\% = 70\\% \\quad \\text{and} \\quad 100\\% - 40\\% = 60\\%', '0.7 \\times 0.6 = 0.42 = 42\\%'] }],
      lines: [
        { say: 'Now the chance of no rain on either day. For an event that does not happen, subtract its percent from one hundred percent first.', show: branches('ne') },
        { say: 'No rain on Saturday is one hundred minus thirty, which is seventy percent. No rain on Sunday is one hundred minus forty, which is sixty percent. The tree calls these dry.', show: 'm.0', focus: ['m.0', 'ne.b1', 'ne.b1-1'] },
        { say: 'Multiply along the bottom path: zero point seven times zero point six is zero point four two. So the chance of rain on neither day is forty-two percent.', show: ['m.1', 'ne.e1-1'], focus: ['m.1', 'ne.b1', 'ne.b1-1', 'ne.e1-1'] },
      ],
    },
    {
      chapter: 'At least one day',
      layout: 'center',
      main: [weekend('al'), { kind: 'math', id: 'm', size: 'md', lines: ['100\\% - 42\\% = 58\\%', '\\text{check: } 12\\% + 18\\% + 28\\% = 58\\%'] }],
      lines: [
        { say: 'What about rain on at least one day? That means rain on Saturday, or on Sunday, or on both. It is the opposite of no rain at all.', show: [...branches('al'), 'al.e1-1'] },
        { say: 'So subtract from one hundred percent: one hundred minus forty-two is fifty-eight percent.', show: 'm.0', focus: 'm.0' },
        { say: 'The tree diagram checks it. The four paths give twelve, eighteen, twenty-eight and forty-two percent. The three paths with some rain add to twelve plus eighteen plus twenty-eight, which is fifty-eight percent.', show: ['al.ends', 'm.1'], focus: ['al.e0-0', 'al.e0-1', 'al.e1-0', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'There is a $20\\%$ chance of snow on Monday and a $50\\%$ chance on Tuesday. The days are independent. What is the probability of snow on **neither** day?',
          choices: ['$10\\%$', '$40\\%$', '$70\\%$', '$60\\%$'],
          answer: 1,
          working: 'No snow on Monday: $80\\%$. No snow on Tuesday: $50\\%$. $0.8 \\times 0.5 = 0.4$, so $40\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. There is a twenty percent chance of snow on Monday, and a fifty percent chance on Tuesday. The days are independent. What is the probability of snow on neither day? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is B: forty percent. No snow on Monday is eighty percent, and no snow on Tuesday is fifty percent. Zero point eight times zero point five is zero point four. Choice A, ten percent, is the chance of snow on both days.', show: 'q.answer' },
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
          items: ['Change percents to decimals, multiply, then change back to a percent.', 'For an event that does not happen, subtract from $100\\%$ first.', 'At least one $=$ $100\\%$ minus neither.', 'Never add the percents to find both.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To combine percents for independent events, change them to decimals, multiply, then change back to a percent.', show: 'sum.0' },
        { say: 'For an event that does not happen, subtract from one hundred percent first.', show: 'sum.1' },
        { say: 'The chance of at least one is one hundred percent, minus the chance of neither.', show: 'sum.2' },
        { say: 'And never add the percents to find the chance of both. In the next part, you will find the chance of two in a row, and use probability to make predictions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
