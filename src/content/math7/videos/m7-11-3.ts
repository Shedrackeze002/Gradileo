import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { outcomeGrid, sumGrid } from './lib/m7-11-figures.ts';

const t = (s: string) => `\\text{${s}}`;

// A coin and a die: 12 outcomes, with heads and an even number (H2, H4, H6) marked.
const DIE = ['1', '2', '3', '4', '5', '6'];
const coinDie = (id: string) =>
  figure(
    id,
    [
      outcomeGrid({
        rows: [t('H'), t('T')],
        cols: DIE,
        cells: ['H', 'T'].map((c) => DIE.map((d) => t(`${c}${d}`))),
        corner: t('Coin'),
        marks: [{ id: 'even', cells: [[0, 1], [0, 3], [0, 5]] }],
      }),
    ],
    260,
  );

// Two dice: the six outcomes with a sum of 7 marked.
const sums = (id: string) => figure(id, [sumGrid({ marks: [{ id: 'seven', fits: (r, b) => r + b === 7 }] })], 560);
const table = (id: string) => [`${id}.frame`, ...[0, 1, 2, 3, 4, 5].map((r) => `${id}.row${r}`)];

const video: Explainer = {
  id: 'm7-11-3',
  lessonId: 'm7-11-3',
  title: 'Theoretical and Experimental Probability, Part 1: Theoretical Probability',
  thumbnailTitle: 'Theoretical Probability',
  thumbnail: 'sv',
  summary:
    'The theoretical probability of an event is what should happen, found from the sample space when every outcome is equally likely: favourable outcomes ÷ outcomes in the sample space. Flipping a coin and rolling a die gives 12 outcomes, 3 of them heads and an even number, so P = 3/12 = 1/4 = 25%. Rolling two dice gives 36 outcomes, 6 of them with a sum of 7, so P(sum of 7) = 6/36 = 1/6, about 17%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 1', title: 'Theoretical Probability', subtitle: 'What should happen' }],
      lines: [
        { say: 'If you flip a coin and roll a die, how often should you get heads and an even number? You can work it out without flipping anything at all.', show: 'title' },
        { say: 'In this video, you will find theoretical probabilities from a sample space.' },
      ],
    },
    {
      chapter: 'Theoretical probability',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Theoretical probability', md: 'The **theoretical probability** of an event is what **should** happen, found from the sample space when every outcome is equally likely.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(\\text{event}) = \\dfrac{\\text{favourable outcomes}}{\\text{total outcomes in the sample space}}'] },
      ],
      lines: [
        { say: 'The theoretical probability of an event is what should happen. You find it from the sample space, when every outcome is equally likely.', show: 'def' },
        { say: 'It is the number of favourable outcomes, divided by the total number of outcomes in the sample space.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Heads and an even number',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Noor flips a coin and rolls a six-sided die. What is the probability of heads and an even number?' },
        coinDie('cd'),
        { kind: 'math', id: 'm', size: 'md', lines: ['P(\\text{heads and even}) = \\dfrac{3}{12} = \\dfrac{1}{4} = 25\\%'] },
      ],
      lines: [
        { say: 'Noor flips a coin and rolls a six-sided die. What is the probability of heads and an even number?', show: 'q' },
        { say: 'The table shows the sample space: two times six, or twelve, equally likely outcomes.', show: ['cd.frame', 'cd.row0', 'cd.row1'] },
        { say: 'The favourable outcomes are in the heads row, under the even numbers: H two, H four and H six. That is three outcomes.', show: 'cd.even', focus: 'cd.even' },
        { say: 'So the probability is three out of twelve. In lowest terms, that is one quarter, or twenty-five percent.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A sum of 7',
      layout: 'split',
      leftWidth: 620,
      left: [sums('sv')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Lucas rolls two dice. What is the probability that the sum is $7$?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\text{ sevens out of } 36', 'P(\\text{sum of } 7) = \\dfrac{6}{36} = \\dfrac{1}{6}', '1 \\div 6 \\approx 0.1667 \\to \\approx 17\\%'] },
      ],
      lines: [
        { say: 'Lucas rolls two dice. What is the probability that the sum is seven?', show: [...table('sv'), 'q'] },
        { say: 'There are thirty-six equally likely outcomes. Count the sevens: one and six, two and five, three and four, four and three, five and two, and six and one. That is six outcomes.', show: ['sv.seven', 'm.0'], focus: ['sv.seven', 'm.0'] },
        { say: 'So the probability is six out of thirty-six, which is one sixth.', show: 'm.1', focus: 'm.1' },
        { say: 'As a percent, one divided by six is about zero point one six six seven, so the probability is about seventeen percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The most likely sum',
      layout: 'split',
      leftWidth: 620,
      left: [sums('ml')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Seven fills the longest slanted line in the table, so it is the **most likely** sum. Sums of $2$ and $12$ each fill just **one** cell.' }],
      lines: [
        { say: 'Look at the table again. The sevens make the longest slanted line, from corner to corner.', show: [...table('ml'), 'ml.seven'], focus: 'ml.seven' },
        { say: 'No other sum has as many cells. So seven is the most likely sum when you roll two dice.', show: 't' },
        { say: 'A sum of two and a sum of twelve each fill just one cell, so each has a probability of only one out of thirty-six.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two dice are rolled. What is the probability that the sum is $11$?',
          choices: ['$\\dfrac{1}{36}$', '$\\dfrac{1}{18}$', '$\\dfrac{1}{11}$', '$\\dfrac{2}{11}$'],
          answer: 1,
          working: 'A sum of $11$: $(5,\\ 6)$ and $(6,\\ 5)$, so $P = \\dfrac{2}{36} = \\dfrac{1}{18}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two dice are rolled. What is the probability that the sum is eleven? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is B: one eighteenth. A sum of eleven happens two ways, five and six, or six and five, out of thirty-six outcomes. Two thirty-sixths is one eighteenth. Choice C uses the eleven possible sums, but those sums are not equally likely.', show: 'q.answer' },
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
          items: ['Theoretical probability is what should happen.', 'It is the number of favourable outcomes over the number of outcomes in the sample space.', 'Use a table or tree diagram to list the equally likely outcomes first.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Theoretical probability is what should happen.', show: 'sum.0' },
        { say: 'It is the number of favourable outcomes over the number of outcomes in the sample space.', show: 'sum.1' },
        { say: 'So list the equally likely outcomes first, with a table or a tree diagram. In the next part, you will decide whether a game is fair. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
