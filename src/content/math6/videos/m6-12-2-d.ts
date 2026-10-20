import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';
import { note, seg } from './lib/m6-9-figures.ts';

// One class's coin tosses: 7 heads in 10 (70%), 46 in 100 (46%), 508 in 1000 (50.8%). The bar
// graph's scale is 6 units for 100%, so the expected 50% is 3 units up.
const graph = (id: string) =>
  figure(id, [
    barGraph({ categories: ['10', '100', '1000'], values: [70, 46, 50.8], max: 100, step: 10, tone: 'adj', titles: { x: 'Number of trials', y: 'Heads (\\%)' } }),
    seg('half', [0, 3], [5.2, 3], { tone: 'theta', dashed: true, weight: 3 }),
    note('half-label', [5.25, 3], '50\\%', 'right', 'theta'),
  ]);

const video: Explainer = {
  id: 'm6-12-2-d',
  lessonId: 'm6-12-2',
  title: 'Experiments and Likelihood, Part 4: The Law of Large Numbers',
  thumbnailTitle: 'The Law of Large Numbers',
  thumbnail: 'gr',
  summary: 'The law of large numbers: the more trials you do, the closer the relative frequency usually gets to the expected likelihood. One class’s coin tosses gave 70% heads in 10 trials, 46% in 100 and 50.8% in 1000, getting close to the expected 50%, so the row with 1000 trials is the best estimate. Combining every group’s results gives more trials and a better estimate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Relative Frequency and Probability · Part 4', title: 'The Law of Large Numbers', subtitle: 'More trials, better estimates' }],
      lines: [
        { say: 'Toss a coin just ten times, and you might get seven heads. Does that mean the coin lands on heads seventy percent of the time?', show: 'title' },
        { say: 'Probably not! In this video, you will see why more trials give a better estimate.' },
      ],
    },
    {
      chapter: 'More and more trials',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'table', id: 't', head: ['Trials', 'Heads', 'Relative frequency'], rows: [['$10$', '$7$', '$70\\%$'], ['$100$', '$46$', '$46\\%$'], ['$1000$', '$508$', '$50.8\\%$']] }],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'The expected likelihood of heads is $1$ out of $2$, or $50\\%$. Which row gives the **best estimate**?' }],
      lines: [
        { say: 'One class tossed a coin many times. After ten tosses, they had seven heads. That is a relative frequency of seventy percent.', show: 't.0', focus: 't.0' },
        { say: 'After one hundred tosses, they had forty-six heads: forty-six percent.', show: 't.1', focus: 't.1' },
        { say: 'After one thousand tosses, they had five hundred and eight heads. As a percentage, that is fifty point eight percent.', show: 't.2', focus: 't.2' },
        { say: 'Heads is one of two equally likely outcomes, so the expected likelihood is one out of two, or fifty percent. Which row gives the best estimate of how likely heads is?', show: 'q' },
      ],
    },
    {
      chapter: 'Getting closer',
      layout: 'split',
      leftWidth: 560,
      left: [graph('gr')],
      right: [{ kind: 'bullets', id: 'b', items: ['$10$ trials: $70\\%$, far from $50\\%$.', '$100$ trials: $46\\%$, closer.', '$1000$ trials: $50.8\\%$, very close.'] }],
      lines: [
        { say: 'Here are the three results as a bar graph. The dashed line shows the expected fifty percent.', show: ['gr.scale', 'gr.half', 'gr.half-label'] },
        { say: 'With ten trials, the result, seventy percent, is far from fifty percent.', show: ['gr.b0', 'b.0'], focus: 'gr.b0' },
        { say: 'With one hundred trials, forty-six percent is closer.', show: ['gr.b1', 'b.1'], focus: 'gr.b1' },
        { say: 'And with one thousand trials, fifty point eight percent is very close. So the row with one thousand trials gives the best estimate.', show: ['gr.b2', 'b.2'], focus: 'gr.b2' },
      ],
    },
    {
      chapter: 'The law of large numbers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Law of large numbers', md: 'The more trials you do, the closer the relative frequency **usually** gets to the expected likelihood. More trials give a **better estimate**.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Combine your results', md: 'If every group in a class does the same experiment, **add all the results together**. The combined result uses more trials, so it is usually a better estimate.' },
      ],
      lines: [
        { say: 'This pattern has a name: the law of large numbers. The more trials you do, the closer the relative frequency usually gets to the expected likelihood.', show: 'def' },
        { say: 'With only a few trials, chance can push the result far from the prediction. With many trials, the ups and downs even out.', focus: 'def' },
        { say: 'Here is a tip. If every group in a class does the same experiment, add all the results together. The combined result uses many more trials, so it is usually a better estimate.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two groups toss the same coin. Group P tosses it $20$ times and gets $14$ heads ($70\\%$). Group Q tosses it $400$ times and gets $196$ heads ($49\\%$). Which result is likely to be the better estimate of how likely heads is?',
          choices: ['Group P’s, because $70\\%$ is greater.', 'Group Q’s, because it used more trials.', 'Both are equally good.', 'Neither, because neither is exactly $50\\%$.'],
          answer: 1,
          working: 'By the law of large numbers, more trials usually give a better estimate: $400$ trials is far more than $20$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two groups toss the same coin. Group P tosses it twenty times and gets fourteen heads, seventy percent. Group Q tosses it four hundred times and gets one hundred and ninety-six heads, forty-nine percent. Which result is likely to be the better estimate? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is B. Group Q used many more trials, so its result is usually closer to the real likelihood. Choice D expects an exact match, but results vary by chance.', show: 'q.answer' },
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
          items: ['The more trials, the closer the relative frequency usually gets to the expected likelihood.', 'This is the law of large numbers.', 'Combine results to get more trials and a better estimate.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The more trials you do, the closer the relative frequency usually gets to the expected likelihood.', show: 'sum.0' },
        { say: 'This is called the law of large numbers.', show: 'sum.1' },
        { say: 'So combine results to get more trials, and a better estimate. Well done! You can now use relative frequency and probability to describe and test chance.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
