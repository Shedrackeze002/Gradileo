import type { Explainer } from '@/video/script.ts';
import { tally } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';
import { coin } from './lib/m6-12-figures.ts';

// Hamid's 50 tosses: 23 heads and 27 tails.
const marks = (id: string) =>
  figure(
    id,
    [
      coin('h', [-2.2, 2.6], '\\text{H}'),
      tally({ name: 'th', count: 23, at: [0, 2.1] }),
      coin('t', [-2.2, 0], '\\text{T}', 'muted'),
      tally({ name: 'tt', count: 27, at: [0, -0.5] }),
    ],
    300,
  );

const video: Explainer = {
  id: 'm6-12-2-c',
  lessonId: 'm6-12-2',
  title: 'Experiments and Likelihood, Part 3: Relative Frequency from an Experiment',
  thumbnailTitle: 'Relative Frequency from an Experiment',
  thumbnail: 'tl',
  summary: 'Each time you do an experiment once is a trial. The relative frequency of an outcome is the number of times it happened divided by the number of trials: Hamid tossed a coin 50 times and got 23 heads, so 23/50 = 46/100 = 46%, close to the half we predicted. Results vary by chance, so 46% does not mean the coin is unfair.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Relative Frequency and Probability · Part 3', title: 'Relative Frequency from an Experiment', subtitle: 'What really happens when you try it?' }],
      lines: [
        { say: 'A coin should land on heads about half of the time. That is a prediction. But what really happens when you toss a coin again and again?', show: 'title' },
        { say: 'In this video, you will find the relative frequency of an outcome from an experiment, and compare it with the prediction.' },
      ],
    },
    {
      chapter: 'Trials',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Trial', md: 'Each time you do an experiment once, it is called a **trial**. Tossing a coin $50$ times is $50$ trials.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{relative frequency} = \\dfrac{\\text{number of times it happened}}{\\text{total number of trials}}'] },
      ],
      lines: [
        { say: 'Each time you do an experiment once, it is called a trial. If you toss a coin fifty times, that is fifty trials.', show: 'def' },
        { say: 'Record how often each outcome happens. A tally is a good way to keep count.' },
        { say: 'Then find the relative frequency, just like before: the number of times the outcome happened, divided by the total number of trials.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Tossing a coin',
      layout: 'split',
      leftWidth: 620,
      left: [marks('tl')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{heads: } \\dfrac{23}{50}', '\\dfrac{23 \\times 2}{50 \\times 2} = \\dfrac{46}{100}', '\\text{heads: } 46\\%'] }],
      lines: [
        { say: 'Hamid tossed a coin fifty times. Each toss got one tally mark: heads in the top row, and tails in the bottom row.', show: ['tl.h', 'tl.t'] },
        { say: 'Hamid got heads twenty-three times, and tails twenty-seven times. Twenty-three plus twenty-seven is fifty, one mark for every trial.', show: ['tl.th-t0', 'tl.th-t1', 'tl.th-t2', 'tl.th-t3', 'tl.th-t4', 'tl.tt-t0', 'tl.tt-t1', 'tl.tt-t2', 'tl.tt-t3', 'tl.tt-t4', 'tl.tt-t5'] },
        { say: 'The relative frequency of heads is twenty-three out of fifty.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifty times two is one hundred, so multiply the top and the bottom by two: forty-six out of one hundred.', show: 'm.1', focus: 'm.1' },
        { say: 'So the relative frequency of heads is forty-six percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Close to the prediction',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{predicted: } 50\\%', '\\text{experiment: } 46\\%'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Expecting an exact match', md: 'Relative frequency changes from one experiment to the next, just by **chance**. Getting $46\\%$ heads instead of $50\\%$ does **not** mean the coin is unfair, or that you made a mistake.' },
      ],
      lines: [
        { say: 'Heads is one of two equally likely outcomes, so we predicted heads about half of the time: fifty percent. Hamid got forty-six percent. That is close to half!', show: ['m.0', 'm.1'] },
        { say: 'Some people expect an experiment to match the prediction exactly. But relative frequency changes from one experiment to the next, just by chance.', show: 'oops' },
        { say: 'Getting forty-six percent heads instead of fifty percent does not mean the coin is unfair, or that you made a mistake. If Hamid tossed the coin fifty more times, the result would probably be a little different again.', focus: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Maya rolled a six-sided die $50$ times and got a six on $9$ of the rolls. What is the relative frequency of rolling a six, as a percentage?',
          choices: ['$9\\%$', '$50\\%$', '$18\\%$', '$41\\%$'],
          answer: 2,
          working: '$\\dfrac{9}{50} = \\dfrac{9 \\times 2}{50 \\times 2} = \\dfrac{18}{100} = 18\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. Maya rolled a six-sided die fifty times, and got a six on nine of the rolls. What is the relative frequency of rolling a six, as a percentage? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C, eighteen percent. Nine out of fifty is eighteen out of one hundred. Choice A uses the frequency, nine, without dividing by the number of trials.', show: 'q.answer' },
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
          items: ['Each time you do an experiment once is a trial.', 'Relative frequency $=$ times it happened $\\div$ number of trials.', 'Results vary by chance, so they are close to the prediction, not exactly equal.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Each time you do an experiment once, it is called a trial.', show: 'sum.0' },
        { say: 'The relative frequency of an outcome is the number of times it happened, divided by the number of trials.', show: 'sum.1' },
        { say: 'And results vary just by chance, so they are usually close to the prediction, but not exactly equal. In the next part, you will see what happens with more and more trials. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
