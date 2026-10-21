import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barGraph } from '@/video/charts.ts';

// Last year: 180 of 200 Brand A seeds sprouted (90%), and 255 of 300 Brand B seeds (85%).
const BRANDS = ['A', 'B'];
const counts = (id: string) => figure(id, [barGraph({ categories: BRANDS, values: [180, 255], max: 300, step: 50, height: 4.5, tone: 'opp', titles: { x: 'Brand', y: 'Seeds that sprouted' } })], 460);
const percents = (id: string) => figure(id, [barGraph({ categories: BRANDS, values: [90, 85], max: 100, step: 20, height: 4.5, tone: 'good', titles: { x: 'Brand', y: 'Percent that sprouted' } })], 460);
const BARS = (id: string) => [`${id}.scale`, `${id}.b0`, `${id}.b1`, `${id}.v0`, `${id}.v1`];

const video: Explainer = {
  id: 'm9-10-4-d',
  lessonId: 'm9-10-4',
  title: 'Probability in Society, Part 4: Comparing Probabilities',
  thumbnailTitle: 'Comparing Probabilities',
  thumbnail: 'pc',
  summary:
    'People use probability to choose between options, and they should compare probabilities, not raw counts. Last year, 180 of 200 Brand A seeds sprouted and 255 of 300 Brand B seeds sprouted. Brand B had more seeds sprout only because more were planted: Brand A sprouted with a probability of 180 ÷ 200 = 0.9, or 90%, and Brand B with 255 ÷ 300 = 0.85, or 85%. So a farmer should buy Brand A.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 4', title: 'Comparing Probabilities', subtitle: 'Compare rates, not raw counts' }],
      lines: [
        { say: 'Which seeds should a farmer buy? Which player should take the penalty shot? People use probability to choose between options.', show: 'title' },
        { say: 'In this video, you will learn the most important rule for comparing options: compare the probabilities, not the raw counts.' },
      ],
    },
    {
      chapter: 'Which brand?',
      layout: 'split',
      leftWidth: 540,
      left: [counts('ct')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Last year, $180$ of $200$ Brand A seeds sprouted, and $255$ of $300$ Brand B seeds sprouted. Which brand should a farmer buy?' }],
      lines: [
        { say: 'Last year, one hundred eighty of two hundred Brand A seeds sprouted. And two hundred fifty-five of three hundred Brand B seeds sprouted. Which brand should a farmer buy?', show: ['q', ...BARS('ct')] },
        { say: 'This bar graph shows the number of seeds that sprouted. Brand B’s bar is taller, so it is tempting to pick Brand B.', focus: 'ct.b1' },
        { say: 'But look again. More Brand B seeds were planted: three hundred, compared with two hundred. Of course more of them sprouted. The counts are not a fair comparison.' },
      ],
    },
    {
      chapter: 'Find each probability',
      layout: 'split',
      leftWidth: 540,
      left: [percents('pc')],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{A: } 180 \\div 200 = 0.9 = 90\\%', '\\text{B: } 255 \\div 300 = 0.85 = 85\\%'] }],
      lines: [
        { say: 'To compare fairly, find the probability that each kind of seed sprouts. That is the number that sprouted, divided by the number planted.', show: 'pc.scale' },
        { say: 'Brand A: one hundred eighty divided by two hundred is zero point nine, or ninety percent.', show: ['m.0', 'pc.b0', 'pc.v0'], focus: ['m.0', 'pc.b0'] },
        { say: 'Brand B: two hundred fifty-five divided by three hundred is zero point eight five, or eighty-five percent.', show: ['m.1', 'pc.b1', 'pc.v1'], focus: ['m.1', 'pc.b1'] },
        { say: 'Now the bars tell the true story. A Brand A seed has the higher probability of sprouting, so the farmer should buy Brand A.', focus: 'pc.b0' },
      ],
    },
    {
      chapter: 'Why counts mislead',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Compare probabilities', md: 'When the totals are different, compare **probabilities** (or percents), not raw counts.' },
        { kind: 'text', id: 't', size: 'md', md: 'If the farmer plants $100$ seeds of each: Brand A gives about $90$, and Brand B about $85$.' },
      ],
      lines: [
        { say: 'Here is the rule. When the totals are different, compare probabilities, or percents, not the raw counts.', show: 'key' },
        { say: 'One way to see it: imagine the farmer plants one hundred seeds of each brand. About ninety Brand A seeds would sprout, but only about eighty-five Brand B seeds.', show: 't' },
        { say: 'Brand B only looked better because more of its seeds were planted.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Last season, Player A scored on $45$ of $60$ shots, and Player B scored on $52$ of $80$ shots. Which player has the higher probability of scoring?',
          choices: ['Player B, because $52$ is more than $45$', 'Player B, with $65\\%$', 'They have the same probability.', 'Player A, with $75\\%$'],
          answer: 3,
          working: 'Player A: $45 \\div 60 = 0.75 = 75\\%$. Player B: $52 \\div 80 = 0.65 = 65\\%$. Player A has the higher probability.',
        },
      ],
      lines: [
        { say: 'Your turn. Last season, Player A scored on forty-five of sixty shots, and Player B scored on fifty-two of eighty shots. Which player has the higher probability of scoring? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D. Forty-five out of sixty is seventy-five percent, and fifty-two out of eighty is sixty-five percent. Choice A compares raw counts, but Player B took more shots.', show: 'q.answer' },
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
            'Use probabilities to choose between options.',
            'Probability from data: the number of times it happened $\\div$ the number of trials.',
            'Compare **probabilities** (percents), not raw counts, when the totals are different.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. You can use probabilities to choose between options.', show: 'sum.0' },
        { say: 'A probability from data is the number of times something happened, divided by the number of trials.', show: 'sum.1' },
        { say: 'And compare probabilities, or percents, not raw counts, when the totals are different. In the next part, you will use probability to decide whether a warranty is worth buying. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
