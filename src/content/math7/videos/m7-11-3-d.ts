import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barGraph } from '@/video/charts.ts';
import { join, note, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';

// HH with 20 trials (8 times: 40%) and 400 trials (103 times: 25.75%), against the theoretical
// 25% (a dashed line). The scale is 4 units for 45%.
const K = 4 / 45;
const W = 0.4 + 2 * 1.6;
const trials = (id: string) =>
  figure(
    id,
    [
      barGraph({ categories: ['20', '400'], values: [40, 25.75], max: 45, step: 5, height: 4, titles: { x: 'Number of trials', y: 'P(HH) in \\%' } }),
      join(
        seg('theory-line', [0, 25 * K], [W + 0.2, 25 * K], { tone: 'good', dashed: true, weight: 3, group: 'theory' }),
        note('theory-label', [W + 0.3, 25 * K], '\\text{theory: } 25\\%', 'right', 'good', 'theory'),
        note('room', [W + 3.6, 25 * K], '', 'center'),
      ),
    ],
    440,
  );

const video: Explainer = {
  id: 'm7-11-3-d',
  lessonId: 'm7-11-3',
  title: 'Theoretical and Experimental Probability, Part 4: More Trials and Predictions',
  thumbnailTitle: 'More Trials and Predictions',
  thumbnail: 'mt',
  summary:
    'Chance makes results jump around, so in a small experiment the experimental probability can be far from the theoretical probability; as the number of trials grows, it usually gets closer. Kiona got HH in 8 of 20 trials (40%), but her class got it in 103 of 400 (25.75%), close to the theoretical 25%. Expected number = theoretical probability × number of trials: in 120 rolls of two dice, expect a sum of 7 about 1/6 × 120 = 20 times.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 4', title: 'More Trials and Predictions', subtitle: 'Getting closer to the theory' }],
      lines: [
        { say: 'Flip two coins just a few times, and the results can be surprising. Flip them hundreds of times, and something interesting happens.', show: 'title' },
        { say: 'In this video, you will see why more trials give a better result, and use probability to predict what will happen.' },
      ],
    },
    {
      chapter: 'Why results differ',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Chance jumps around', md: 'In a **small** experiment, the experimental probability can be far from the theoretical probability. As the number of trials **grows**, the experimental probability usually gets **closer** to the theoretical probability.' }],
      lines: [
        { say: 'Chance means results jump around. Two heads might come up three times in a row, and then not for a long while.', show: 'key' },
        { say: 'In a small experiment, these jumps can make the experimental probability far from the theoretical probability.' },
        { say: 'But as the number of trials grows, the jumps even out. The experimental probability usually gets closer to the theoretical probability.' },
      ],
    },
    {
      chapter: 'More trials',
      layout: 'split',
      leftWidth: 620,
      left: [trials('mt')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Kiona: } \\dfrac{8}{20} = 40\\%', '\\text{The class: } \\dfrac{103}{400} = 25.75\\%', '\\text{Theory: } 25\\%'] }],
      lines: [
        { say: 'Kiona’s class wants to know the probability of two heads. In a new experiment, Kiona did twenty trials, and got two heads eight times. Eight out of twenty is forty percent.', show: ['mt.scale', 'mt.b0', 'mt.v0', 'm.0'], focus: ['mt.b0', 'm.0'] },
        { say: 'The whole class put their results together: four hundred trials. They got two heads one hundred three times. That is twenty-five point seven five percent.', show: ['mt.b1', 'mt.v1', 'm.1'], focus: ['mt.b1', 'm.1'] },
        { say: 'The theoretical probability is twenty-five percent.', show: ['mt.theory', 'm.2'], focus: ['mt.theory', 'm.2'] },
        { say: 'The class result is much closer to twenty-five percent, because it uses many more trials.', focus: ['mt.b1', 'mt.theory'] },
      ],
    },
    {
      chapter: 'Predicting results',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Expected number', md: 'expected number $=$ theoretical probability $\\times$ number of trials' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(\\text{sum of } 7) = \\dfrac{1}{6}', '\\dfrac{1}{6} \\times 120 = 20 \\text{ times}'] },
      ],
      lines: [
        { say: 'You can also use the theoretical probability to predict results. The expected number is the theoretical probability, times the number of trials.', show: 'key' },
        { say: 'For example, if you roll two dice one hundred twenty times, how many times should you expect a sum of seven? The probability of a sum of seven is one sixth.', show: 'm.0', focus: 'm.0' },
        { say: 'One sixth of one hundred twenty is twenty. So expect a sum of seven about twenty times.', show: 'm.1', focus: 'm.1' },
        { say: 'Notice the word about. Rolling a sum of seven seventeen times, or twenty-three times, would be perfectly normal.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: '“The experiment went wrong”', md: 'An experimental probability that does not match the theoretical probability does **not** mean the coins are unfair or the maths is wrong. Small differences are normal. Do **more trials** before you decide.' }],
      lines: [
        { say: 'Watch out. When an experiment does not match the theory, it is tempting to think something went wrong.', show: 'oops' },
        { say: 'But a difference does not mean the coins are unfair, or that the maths is wrong. Small differences are normal, because of chance.' },
        { say: 'If you want to be sure, do more trials. The more trials you do, the closer the results usually get to the theory.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You roll one six-sided die $60$ times. About how many times should you expect to roll a $5$?',
          choices: ['$5$', '$6$', '$12$', '$10$'],
          answer: 3,
          working: '$P(5) = \\dfrac{1}{6}$, so expect about $\\dfrac{1}{6} \\times 60 = 10$ fives.',
        },
      ],
      lines: [
        { say: 'Your turn. You roll one six-sided die sixty times. About how many times should you expect to roll a five? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is D: about ten times. The probability of rolling a five is one sixth, and one sixth of sixty is ten. Choice A uses the number on the die, five, instead of the probability.', show: 'q.answer' },
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
          items: ['Experimental results vary. With more trials, they usually get closer to the theoretical probability.', 'Expected number $=$ theoretical probability $\\times$ number of trials.', 'Small differences from the theory are normal.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Experimental results vary. With more trials, they usually get closer to the theoretical probability.', show: 'sum.0' },
        { say: 'The expected number is the theoretical probability times the number of trials.', show: 'sum.1' },
        { say: 'And small differences from the theory are normal. Well done! You can now find, compare and test probabilities.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
