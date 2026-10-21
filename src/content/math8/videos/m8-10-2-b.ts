import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { coin, spinner } from '@/content/math6/videos/lib/m6-12-figures.ts';
import { outcomeGrid } from '@/content/math7/videos/lib/m7-11-figures.ts';
import { fanTree, type Outcome } from './lib/m8-10-figures.ts';

const t = (s: string) => `\\text{${s}}`;

// Harpreet's coin, and a spinner with 4 equal sections: 2 red, 1 blue and 1 green.
const SECTIONS = ['R', 'R', 'B', 'G'];
const coinSpinner = (id: string) =>
  figure(id, [coin('coin', [-5.4, 0], t('H'), 'theta'), spinner({ name: 'sp', labels: SECTIONS, tones: ['bad', 'bad', 'adj', 'good'], r: 2.2 })], 380);

// The 2 × 4 = 8 equally likely outcomes; heads with a red section is 2 of them.
const table = (id: string) =>
  figure(
    id,
    [
      outcomeGrid({
        rows: [t('H'), t('T')],
        cols: SECTIONS.map(t),
        cells: ['H', 'T'].map((c) => SECTIONS.map((s) => t(c + s))),
        corner: '',
        w: 1.7,
        h: 1.2,
        marks: [{ id: 'hr', cells: [[0, 0], [0, 1]] }],
      }),
    ],
    300,
  );

// The tree: the coin (1/2 each), then the spinner (red 1/2, blue 1/4, green 1/4), each probability
// on its branch.
const spin: Outcome[] = [
  { name: t('R'), p: '\\tfrac{1}{2}', tone: 'bad' },
  { name: t('B'), p: '\\tfrac{1}{4}', tone: 'adj' },
  { name: t('G'), p: '\\tfrac{1}{4}', tone: 'good' },
];
const tree = (id: string) =>
  figure(
    id,
    [
      fanTree({
        first: [
          { name: t('H'), p: '\\tfrac{1}{2}', tone: 'theta' },
          { name: t('T'), p: '\\tfrac{1}{2}', tone: 'theta' },
        ],
        second: [spin, spin],
        ends: ['HR', 'HB', 'HG', 'TR', 'TB', 'TG'].map(t),
        gap: 2.1,
        groupGap: 0.9,
        labelAt: 0.8,
      }),
    ],
    560,
  );

const video: Explainer = {
  id: 'm8-10-2-b',
  lessonId: 'm8-10-2',
  title: 'Probability of Independent Events, Part 2: Tables and Tree Diagrams',
  thumbnailTitle: 'Tables and Tree Diagrams',
  thumbnail: 'tr',
  summary:
    'Harpreet flips a coin and spins a spinner with 4 equal sections: 2 red, 1 blue and 1 green. An outcome table shows 2 × 4 = 8 equally likely outcomes, and heads with red is 2 of them, so P(heads and red) = 2/8 = 1/4. A tree diagram shows each probability on its branch; follow the path heads then red and multiply: 1/2 × 1/2 = 1/4, the same answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability · Part 2', title: 'Tables and Tree Diagrams', subtitle: 'Count the outcomes, or follow a path' }],
      lines: [
        { say: 'When two independent events happen, how do you find the chance that both of them happen?', show: 'title' },
        { say: 'In this video, you will use two pictures that help: an outcome table, and a tree diagram.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'split',
      leftWidth: 640,
      left: [coinSpinner('cs')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Harpreet flips a coin and spins a spinner with $4$ equal sections: $2$ red, $1$ blue and $1$ green. What is the probability of **heads and red**?' }],
      lines: [
        { say: 'Harpreet flips a coin and spins a spinner. The spinner has four equal sections: two red, one blue and one green.', show: ['cs.coin', 'cs.sp-s0', 'cs.sp-s1', 'cs.sp-s2', 'cs.sp-s3', 'cs.sp-pointer', 'q'] },
        { say: 'What is the probability of getting heads and red?', focus: ['cs.coin', 'cs.sp-s0', 'cs.sp-s1'] },
        { say: 'The coin and the spinner do not affect each other, so these two events are independent.' },
      ],
    },
    {
      chapter: 'An outcome table',
      layout: 'split',
      leftWidth: 620,
      left: [table('tb')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\times 4 = 8 \\text{ outcomes}', '\\text{heads and red: } 2', 'P(\\text{heads and red}) = \\dfrac{2}{8}', '= \\dfrac{1}{4}'] }],
      lines: [
        { say: 'An outcome table lists every outcome. The coin goes down the side: heads or tails. The spinner goes across the top. It has two red sections, so red appears twice.', show: 'tb.frame' },
        { say: 'The coin has two outcomes, and the spinner has four equal sections. So there are two times four, which is eight equally likely outcomes.', show: ['tb.row0', 'tb.row1', 'm.0'], focus: 'm.0' },
        { say: 'Heads with a red section: there are two of them, shaded green.', show: ['tb.hr', 'm.1'], focus: ['tb.hr', 'm.1'] },
        { say: 'So the probability of heads and red is two out of eight, which is one quarter.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'A tree diagram',
      layout: 'split',
      leftWidth: 700,
      left: [tree('tr')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{H then R:}', '\\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1}{4}'] }],
      lines: [
        { say: 'A tree diagram shows the same outcomes as branches. The first branches are for the coin: heads or tails. Each has a probability of one half, written on its branch.', show: ['tr.start', 'tr.s1'], focus: 'tr.s1' },
        { say: 'From each of those, three branches are for the spinner. Red has a probability of one half, because two of the four sections are red. Blue and green have one quarter each.', show: ['tr.s2-0', 'tr.s2-1'], focus: ['tr.s2-0', 'tr.s2-1'] },
        { say: 'Follow one path from left to right for one outcome. The path heads, then red, gives the outcome heads and red.', show: 'tr.ends', focus: ['tr.b0', 'tr.b0-0', 'tr.e0-0'] },
        { say: 'Multiply the probabilities along the path: one half times one half is one quarter. That matches the table!', show: ['m.0', 'm.1'], focus: ['m.1', 'tr.b0', 'tr.b0-0'] },
        { say: 'Why multiply? Heads happens half of the time. And in half of those times, the spinner lands on red. Half of a half is one quarter.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Harpreet flips a coin and spins a spinner with $4$ equal sections: $2$ red, $1$ blue and $1$ green. What is the probability of **tails and blue**?',
          choices: ['$\\dfrac{1}{8}$', '$\\dfrac{1}{4}$', '$\\dfrac{3}{4}$', '$\\dfrac{1}{6}$'],
          answer: 0,
          working: 'Tails is $\\dfrac{1}{2}$ and blue is $\\dfrac{1}{4}$, so $\\dfrac{1}{2} \\times \\dfrac{1}{4} = \\dfrac{1}{8}$. In the table, tails with blue is $1$ of the $8$ outcomes.',
        },
      ],
      lines: [
        { say: 'Your turn. Harpreet uses the same coin and spinner. What is the probability of tails and blue? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is A: one eighth. Tails is one half and blue is one quarter, and one half times one quarter is one eighth. In the table, it is one outcome out of eight. Choice B, one quarter, is only the chance of blue, without the coin.', show: 'q.answer' },
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
          items: ['An outcome table shows every outcome: count the ones you want.', 'A tree diagram shows each probability on its branch.', 'Multiply along a path of the tree for the probability of that outcome.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An outcome table shows every outcome, so you can count the ones you want.', show: 'sum.0' },
        { say: 'A tree diagram shows each probability on its branch.', show: 'sum.1' },
        { say: 'And multiplying along a path gives the probability of that outcome. In the next part, you will turn this into a rule that works without a table or a tree. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
