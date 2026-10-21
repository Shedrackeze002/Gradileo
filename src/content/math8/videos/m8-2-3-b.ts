import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { numberLine } from '@/video/numbers.ts';

// 12.877% is between 12.8% and 12.9%, and nearer 12.9%.
const round = figure('nl', [
  numberLine({
    min: 12.8,
    max: 12.9,
    step: 0.01,
    every: 5,
    length: 12,
    points: [{ id: 'p', value: 12.8767, tex: '12.877\\%', tone: 'theta' }],
    spans: [{ id: 'near', from: 12.8767, to: 12.9, tone: 'good' }],
  }),
], 200);

const video: Explainer = {
  id: 'm8-2-3-b',
  lessonId: 'm8-2-3',
  title: 'Percent Change and Combined Percents, Part 2: Rounding a Percent Change',
  thumbnailTitle: 'Rounding a Percent Change',
  thumbnail: 'nl',
  summary:
    'A school website had 365 visits in September and 412 in October. The change is 412 − 365 = 47, and 47 ÷ 365 ≈ 0.128767, so the increase is about 12.88%, or 12.9% to the nearest tenth of a percent (a bit more than 10%, since 10% of 365 is 36.5). A bakery that sells 240 muffins on Saturday and 205 on Sunday has a decrease of 35 ÷ 240 ≈ 14.6%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Percents · Part 2', title: 'Rounding a Percent Change', subtitle: 'To the nearest tenth of a percent' }],
      lines: [
        { say: 'Real numbers do not often give a neat percent like twenty-five percent. Often the percent change is a long decimal.', show: 'title' },
        { say: 'In this part, you will find a percent change and round it to the nearest tenth of a percent.' },
      ],
    },
    {
      chapter: 'Website visits',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A school website had $365$ visits in September and $412$ visits in October. Find the percent increase to the nearest tenth of a percent.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{change: } 412 - 365 = 47', '\\text{Estimate: } 10\\% \\text{ of } 365 = 36.5, \\text{ and } 47 > 36.5'] },
      ],
      lines: [
        { say: 'A school website had three hundred sixty-five visits in September, and four hundred twelve visits in October. Find the percent increase to the nearest tenth of a percent.', show: 'q' },
        { say: 'The amount of change is four hundred twelve minus three hundred sixty-five, which is forty-seven visits.', show: 'm.0', focus: 'm.0' },
        { say: 'Estimate first. Ten percent of three hundred sixty-five is thirty-six point five. The change, forty-seven, is a bit more than that, so the increase should be a bit more than ten percent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Divide, then round',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{47}{365} \\approx 0.128767', '0.128767 \\times 100\\% \\approx 12.877\\%', '\\approx 12.9\\%'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The percent increase is about $12.9\\%$.' },
      ],
      lines: [
        { say: 'Divide by the original amount, September’s three hundred sixty-five. Forty-seven divided by three hundred sixty-five is about zero point one two eight seven six seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply by one hundred percent: about twelve point eight seven seven percent.', show: 'm.1', focus: 'm.1' },
        { say: 'Round to the nearest tenth of a percent. Look at the hundredths digit: it is seven, which is five or more, so round up. The answer is about twelve point nine percent.', show: ['m.2', 'a'], focus: 'm.2' },
        { say: 'That is a bit more than ten percent, just as the estimate said.' },
      ],
    },
    {
      chapter: 'On a number line',
      layout: 'center',
      main: [round, { kind: 'math', id: 'm', size: 'lg', lines: ['12.877\\% \\approx 12.9\\%'] }],
      lines: [
        { say: 'Here is twelve point eight seven seven percent on a number line, between twelve point eight and twelve point nine.', show: ['nl.axis', 'nl.p'] },
        { say: 'It is much closer to twelve point nine. So, to the nearest tenth of a percent, it rounds to twelve point nine percent.', show: ['nl.near', 'm'], focus: 'nl.near' },
        { say: 'Round only at the end. If you round the decimal before the last step, your answer can come out wrong.' },
      ],
    },
    {
      chapter: 'A decrease with rounding',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'A bakery sold $240$ muffins on Saturday and $205$ muffins on Sunday. Find the percent decrease to the nearest tenth of a percent.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{change: } 240 - 205 = 35', '\\dfrac{35}{240} \\approx 0.145833 \\approx 14.583\\%', '\\approx 14.6\\%'] },
      ],
      lines: [
        { say: 'Now a decrease. A bakery sold two hundred forty muffins on Saturday, and two hundred five muffins on Sunday. Find the percent decrease to the nearest tenth of a percent.', show: 'q' },
        { say: 'The change is two hundred forty minus two hundred five, which is thirty-five muffins.', show: 'm.0', focus: 'm.0' },
        { say: 'The original amount is Saturday’s two hundred forty. Thirty-five divided by two hundred forty is about zero point one four five eight three three, or fourteen point five eight three percent.', show: 'm.1', focus: 'm.1' },
        { say: 'The hundredths digit is eight, so round up: the percent decrease is about fourteen point six percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A video had $150$ views on Monday and $172$ views on Tuesday. What is the percent increase, to the nearest tenth of a percent?',
          choices: ['$14.7\\%$', '$12.8\\%$', '$22.0\\%$', '$14.6\\%$'],
          answer: 0,
          working: 'The change is $172 - 150 = 22$. Divide by the original amount: $\\dfrac{22}{150} \\approx 0.14667 \\approx 14.667\\%$, which rounds to $14.7\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A video had one hundred fifty views on Monday, and one hundred seventy-two views on Tuesday. What is the percent increase, to the nearest tenth of a percent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, fourteen point seven percent. The change is twenty-two, and twenty-two divided by one hundred fifty is about fourteen point six six seven percent, which rounds up to fourteen point seven. Choice B divides by the new amount, one hundred seventy-two, instead of the original amount.', show: 'q.answer' },
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
            'Find the change, divide by the original amount, then multiply by $100\\%$.',
            '$\\dfrac{47}{365} \\approx 12.877\\% \\approx 12.9\\%$',
            'Estimate first, and round only at the end.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Find the amount of change, divide by the original amount, then multiply by one hundred percent.', show: 'sum.0' },
        { say: 'To round to the nearest tenth of a percent, look at the hundredths digit.', show: 'sum.1' },
        { say: 'Estimate first, so you know about how big the answer is, and round only at the end. In the next part, you will take a discount off a price and then add sales tax. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
