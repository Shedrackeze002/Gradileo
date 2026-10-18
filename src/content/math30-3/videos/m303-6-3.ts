import type { Explainer } from '@/video/script.ts';
import { marbles } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

// 100 welders in a wage survey: the top two rows (20) earn more than the welder at the 80th
// percentile, and the bottom eight rows (80) earn the same or less.
const survey = (id: string, more: number) =>
  figure(id, [marbles({ groups: [{ id: 'more', count: more, tone: 'opp' }, { id: 'less', count: 100 - more, tone: 'adj' }], perRow: 10 })], 460);

const video: Explainer = {
  id: 'm303-6-3',
  lessonId: 'm303-6-3',
  title: 'Percentiles, Part 1: What a Percentile Means',
  thumbnailTitle: 'What a Percentile Means',
  thumbnail: 'ws',
  summary: 'The Pth percentile is the value at or below which about P% of the data fall, and a percentile rank is the percent of the data at or below a value. A wage at the 80th percentile is the same as or more than about 80% of the wages; the 50th percentile is the median; a baby at the 85th percentile is heavier than about 85% of babies the same age; and a percentile rank is not a percent score.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics · Part 1', title: 'What a Percentile Means', subtitle: 'Comparing one value with the group' }],
      lines: [
        { say: 'A score report says you are at the 85th percentile on a trades entrance test. That does not mean you got 85 percent of the questions right.', show: 'title' },
        { say: 'Percentiles compare one value with everyone else in the group. They show up on test results, on growth charts for babies, and in wage surveys. In this video, you will learn what a percentile means.' },
      ],
    },
    {
      chapter: 'Percentiles',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percentile', md: 'The **$P$th percentile** is the value at or below which about $P\\%$ of the data fall.' },
        { kind: 'callout', id: 'pr', tone: 'definition', title: 'Percentile rank', md: 'A value’s **percentile rank** (PR) is the percent of the data at or below that value.' },
      ],
      lines: [
        { say: 'A percentile is a value in the data, named by a percent. The 80th percentile, for example, is the value at or below which about 80 percent of the data fall. The 90th percentile has about 90 percent of the data at or below it, and so on.', show: 'def' },
        { say: 'Going the other way, a value’s percentile rank, PR for short, is the percent of the data at or below that value.', show: 'pr' },
        { say: 'So a percentile is a value in the data, and a percentile rank is a number from zero to 100 that says where a value stands in its group.' },
      ],
    },
    {
      chapter: 'A wage survey',
      layout: 'split',
      leftWidth: 480,
      left: [survey('ws', 20)],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A welder’s hourly wage is at the $80$th percentile of a wage survey. Each dot is one welder in the survey.' },
        { kind: 'bullets', id: 'b', items: ['[[adj:Bottom eight rows]]: about $80\\%$ earn the same or less.', '[[opp:Top two rows]]: about $20\\%$ earn more.'] },
      ],
      lines: [
        { say: 'Suppose a welder’s hourly wage is at the 80th percentile of a wage survey. Picture the welders in the survey as 100 dots, from the lowest wage at the bottom to the highest at the top.', show: ['q', 'ws'] },
        { say: 'At the 80th percentile, about 80 percent of the welders in the survey earn the same wage or less. They are the bottom eight rows.', show: 'b.0', focus: 'ws.less' },
        { say: 'And about 20 percent earn more. They are the top two rows.', show: 'b.1', focus: 'ws.more' },
        { say: 'Notice that the percentile tells you nothing about the wage itself, in dollars. It only tells you where the wage stands compared with the others.', focus: 'ws' },
      ],
    },
    {
      chapter: 'From 0 to 100',
      layout: 'split',
      leftWidth: 480,
      left: [survey('md', 50)],
      right: [
        { kind: 'bullets', id: 'b', items: ['Percentile ranks go from $0$ to $100$.', 'The $50$th percentile is the **median**: half the data are at or below it.', 'A high percentile rank means near the top of the group.'] },
      ],
      lines: [
        { say: 'Percentile ranks go from zero to 100.', show: 'b.0' },
        { say: 'The 50th percentile is the value with half the data at or below it, and half above. That is the median, the middle value.', show: ['md', 'b.1'] },
        { say: 'A high percentile rank, like 90, means near the top of the group. A low one, like ten, means near the bottom.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A growth chart',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'At a check-up, a baby’s mass is at the $85$th percentile for babies of the same age. What does this mean?' },
        { kind: 'bullets', id: 'b', items: ['About $85\\%$ of babies the same age have a mass at or below this baby’s.', 'About $15\\%$ are heavier.', 'It does **not** mean the baby is $85\\%$ of some ideal mass.'] },
      ],
      lines: [
        { say: 'Growth charts for babies use percentiles. At a check-up, a baby’s mass is at the 85th percentile for babies of the same age. What does this mean?', show: 'q' },
        { say: 'A percentile compares the baby with other babies of the same age. About 85 percent of them have a mass at or below this baby’s.', show: 'b.0' },
        { say: 'And about 15 percent are heavier.', show: 'b.1' },
        { say: 'It does not mean that the baby is 85 percent of some ideal mass. In other words, the baby is heavier than about 85 percent of babies the same age.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A percentile is not a percent score', md: 'A percentile rank of $85$ on a test says nothing about how many questions you got right. On a very hard test, you might score $60\\%$ and still be at the $85$th percentile.' },
        { kind: 'table', id: 't', head: ['Measure', 'Value', 'Compares you with'], rows: [['Percent score', '60%', 'the questions on the test'], ['Percentile rank', '85', 'the other people who wrote it']] },
      ],
      lines: [
        { say: 'The most common mistake is to treat a percentile as a percent score.', show: 'oops' },
        { say: 'A percent score compares you with the questions: how many of them you got right. Suppose a test was very hard, and you scored 60 percent.', show: 't.0', focus: 't.0' },
        { say: 'A percentile rank compares you with the other people. If most people scored lower than you on that hard test, you could still be at the 85th percentile.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a wage survey, a carpenter’s wage is at the $70$th percentile. What does this mean?',
          choices: ['It is $70\\%$ of the highest wage', 'About $70\\%$ of carpenters earn more', 'About $30\\%$ earn the same or less', 'About $70\\%$ earn the same or less'],
          answer: 3,
          working: 'At the $70$th percentile, about $70\\%$ of the carpenters in the survey earn the same or less, and about $30\\%$ earn more.',
        },
      ],
      lines: [
        { say: 'Your turn. In a wage survey, a carpenter’s wage is at the 70th percentile. What does this mean? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. At the 70th percentile, about 70 percent of the carpenters in the survey earn the same wage or less, and about 30 percent earn more. Choice A treats the percentile as a percent of a wage, but a percentile compares one wage with the rest of the group.', show: 'q.answer' },
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
          items: ['The $P$th percentile is the value at or below which about $P\\%$ of the data fall.', 'The $50$th percentile is the median.', 'A percentile rank compares you with the group; it is not a percent score.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A percentile is the value at or below which a given percent of the data fall: about 80 percent of the data for the 80th percentile.', show: 'sum.0' },
        { say: 'The 50th percentile is the median.', show: 'sum.1' },
        { say: 'And a percentile rank compares a value with the rest of the group. It is not a percent score. In the next part, we calculate percentile ranks with a formula. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
