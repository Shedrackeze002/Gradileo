import type { Explainer } from '@/video/script.ts';
import { circleGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';
import { headedTree } from './lib/m303-7-figures.ts';

/** Rain on Saturday (40%) and Sunday (30%), assumed independent. */
const rainTree = (id: string) =>
  figure(
    id,
    [
      headedTree({
        first: [
          { name: '\\text{Rain}', p: '0.4', tone: 'adj' },
          { name: '\\text{Dry}', p: '0.6', tone: 'theta' },
        ],
        second: [
          [
            { name: '\\text{Rain}', p: '0.3', tone: 'adj' },
            { name: '\\text{Dry}', p: '0.7', tone: 'theta' },
          ],
          [
            { name: '\\text{Rain}', p: '0.3', tone: 'adj' },
            { name: '\\text{Dry}', p: '0.7', tone: 'theta' },
          ],
        ],
        ends: ['0.4 \\times 0.3 = 0.12', '0.4 \\times 0.7 = 0.28', '0.6 \\times 0.3 = 0.18', '0.6 \\times 0.7 = 0.42'],
        heads: ['\\text{Saturday}', '\\text{Sunday}'],
        groupGap: 0.8,
        room: 2.6,
      }),
    ],
    360,
  );

const video: Explainer = {
  id: 'm303-7-2-b',
  lessonId: 'm303-7-2',
  title: 'Probability of Combined Events, Part 2: Independent Events',
  thumbnailTitle: 'Independent Events',
  thumbnail: 'tree',
  summary: 'Events are independent when one does not change the probability of the other, and then P(A and B) = P(A) × P(B): spinning a 4 on a four-section spinner and flipping heads has probability 1/4 × 1/2 = 1/8, and rain on both days of a weekend with 40% and 30% forecasts has probability 0.40 × 0.30 = 0.12. Adding for "and" gives 70%, far too high.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 2', title: 'Independent Events', subtitle: '$P(A \\text{ and } B) = P(A) \\times P(B)$' }],
      lines: [
        { say: 'A coin cannot know what a spinner landed on, and the weather on Saturday may tell you nothing about Sunday. When one event does not affect another, there is a simple rule for the chance that both happen.', show: 'title' },
        { say: 'In this video, you will learn what independent events are, and multiply their probabilities to find the probability that both happen.' },
      ],
    },
    {
      chapter: 'Independent events',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Independent events', md: 'Two events are **independent** if one happening does not change the probability of the other.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(A \\text{ and } B) = P(A) \\times P(B)'] },
      ],
      lines: [
        { say: 'Two events are independent if one happening does not change the probability of the other.', show: 'def' },
        { say: 'Flipping a coin and spinning a spinner are independent: the coin has no effect on the spinner. The weather on two days can be treated as independent too, if a question tells you to assume it.' },
        { say: 'For independent events, the probability that both happen is the product of their probabilities: P of A and B equals P of A times P of B.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A game at a fair',
      layout: 'split',
      leftWidth: 460,
      left: [figure('sp', [circleGraph({ slices: [1, 2, 3, 4].map((k) => ({ label: String(k), value: 1 })), namesOnly: true, r: 2.6 })], 330)],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'At a summer fair, Wyatt spins this spinner and flips a coin. Wyatt wins a prize for spinning a 4 **and** flipping heads. What is the probability of winning?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(4) = \\dfrac{1}{4}, \\quad P(\\text{heads}) = \\dfrac{1}{2}', 'P(4 \\text{ and heads}) = \\dfrac{1}{4} \\times \\dfrac{1}{2} = \\dfrac{1}{8}'] },
      ],
      lines: [
        { say: 'At a summer fair, Wyatt spins a spinner with four equal sections, and flips a coin. Wyatt wins a prize for spinning a four and flipping heads. What is the probability of winning?', show: ['sp', 'p'] },
        { say: 'The spinner has four equal sections, so P of spinning a four is one quarter. The coin has two sides, so P of heads is one half.', show: 'm.0', focus: ['m.0', 'sp.s3'] },
        { say: 'The spinner and the coin are independent, so multiply: one quarter times one half is one eighth.', show: 'm.1', focus: 'm.1' },
        { say: 'So Wyatt wins with a probability of one eighth: about one game in every eight.' },
      ],
    },
    {
      chapter: 'Why multiplying works',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Spin 1', 'Spin 2', 'Spin 3', 'Spin 4'],
          rows: [
            ['Heads', 'H1', 'H2', 'H3', '$\\good{\\text{H4}}$'],
            ['Tails', 'T1', 'T2', 'T3', 'T4'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 4 = 8 \\text{ equally likely outcomes, and } 1 \\text{ wins: } \\dfrac{1}{8}'] },
      ],
      lines: [
        { say: 'Why does multiplying work? List every outcome. The coin can land heads or tails, and the spinner can land on one, two, three or four.', show: 't' },
        { say: 'Two outcomes for the coin, times four for the spinner, make eight equally likely outcomes in all. Exactly one of them, heads and a four, wins the prize.', show: 'm', focus: ['t.0', 'm'] },
        { say: 'So the probability is one out of eight, the same answer as one half times one quarter.' },
      ],
    },
    {
      chapter: 'Two days of rain',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'The forecast gives a 40% probability of rain on Saturday and a 30% probability on Sunday. Assume the days are independent. What is the probability of rain on both days?' },
        rainTree('tree'),
      ],
      lines: [
        { say: 'The forecast for a town gives a forty percent probability of rain on Saturday, and a thirty percent probability on Sunday. Assume the days are independent. What is the probability of rain on both days?', show: 'p' },
        { say: 'A tree diagram shows every possibility. The first branches are Saturday: rain with probability 0.4, or dry with probability 0.6.', show: ['tree.start', 'tree.heads', 'tree.s1'] },
        { say: 'From each of those, the next branches are Sunday: rain with probability 0.3, or dry with probability 0.7.', show: ['tree.s2-0', 'tree.s2-1'] },
        { say: 'Rain on both days is the top path. Multiply along it: 0.4 times 0.3 is 0.12. So the probability of rain on both days is twelve percent.', show: 'tree.e0-0', focus: ['tree.b0', 'tree.b0-0', 'tree.e0-0'] },
        { say: 'The other paths multiply the same way. Together, the four paths cover every possibility, so they add to one.', show: 'tree.ends', focus: 'tree.ends' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding for “and”', md: 'For “and”, multiply. Adding gives $40\\% + 30\\% = 70\\%$, which is far too high: rain on **both** days must be less likely than rain on either day alone.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{0.40 + 0.30 = 0.70} \\qquad \\good{0.40 \\times 0.30 = 0.12}'] },
      ],
      lines: [
        { say: 'A common mistake is to add for “and”. Forty percent plus thirty percent is seventy percent, which is far too high.', show: 'oops' },
        { say: 'Think about it: rain on both days needs rain on Saturday, and that alone has only a forty percent chance. Rain on both days must be less likely than rain on either day alone.' },
        { say: 'So for independent events, “and” means multiply: 0.4 times 0.3 is 0.12.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'One machine makes bolts, and 10% of them are too short. Another machine makes nuts, and 5% of them are cracked. One bolt and one nut are picked at random. What is the probability that the bolt is too short **and** the nut is cracked?',
          choices: ['$15\\%$', '$5\\%$', '$0.5\\%$', '$50\\%$'],
          answer: 2,
          working: 'The machines are independent, so $0.10 \\times 0.05 = 0.005 = 0.5\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. One machine makes bolts, and ten percent of them are too short. Another machine makes nuts, and five percent of them are cracked. One bolt and one nut are picked at random. What is the probability that the bolt is too short and the nut is cracked? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, half of one percent. The machines are independent, so multiply: 0.10 times 0.05 is 0.005, which is 0.5 percent. Choice A, fifteen percent, adds the probabilities instead of multiplying them.', show: 'q.answer' },
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
            'Independent events: one does not change the probability of the other.',
            'For them, $P(A \\text{ and } B) = P(A) \\times P(B)$.',
            'A tree diagram multiplies along each path; “and” is never more likely than either event alone.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two events are independent when one happening does not change the probability of the other.', show: 'sum.0' },
        { say: 'For independent events, the probability that both happen is the product of their probabilities.', show: 'sum.1' },
        { say: 'A tree diagram multiplies along each path, and “both” is never more likely than either event alone. In part three, we look at events that do change each other’s chances. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
