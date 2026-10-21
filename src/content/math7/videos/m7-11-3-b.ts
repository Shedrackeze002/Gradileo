import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { sumGrid } from './lib/m7-11-figures.ts';

// Two dice: even sums (18 cells), and the sums of 7 (6 cells) and 12 (1 cell).
const sums = (id: string) =>
  figure(
    id,
    [
      sumGrid({
        marks: [
          { id: 'even', fits: (r, b) => (r + b) % 2 === 0 },
          { id: 'seven', fits: (r, b) => r + b === 7, tone: 'theta' },
          { id: 'twelve', fits: (r, b) => r + b === 12, tone: 'hyp' },
        ],
      }),
    ],
    560,
  );
const table = (id: string) => [`${id}.frame`, ...[0, 1, 2, 3, 4, 5].map((r) => `${id}.row${r}`)];

const video: Explainer = {
  id: 'm7-11-3-b',
  lessonId: 'm7-11-3',
  title: 'Theoretical and Experimental Probability, Part 2: Fair Games',
  thumbnailTitle: 'Fair Games',
  thumbnail: 'ev',
  summary:
    'A game is fair when every player has the same probability of winning. Rolling two dice, Mei scores on an even sum and Owen on an odd sum: 18 of the 36 outcomes are even and 18 are odd, so each has a probability of 1/2 and the game is fair. If Mei scored on a sum of 7 (6/36) and Owen on a sum of 12 (1/36), the game would not be fair.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 2', title: 'Fair Games', subtitle: 'Does everyone have the same chance?' }],
      lines: [
        { say: 'Before you play a game, it is worth asking: does everyone have the same chance of winning?', show: 'title' },
        { say: 'In this video, you will use theoretical probability to decide whether a game is fair.' },
      ],
    },
    {
      chapter: 'Fair games',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Fair game', md: 'A game is **fair** when every player has the **same probability** of winning.' }],
      lines: [
        { say: 'A game is fair when every player has the same probability of winning.', show: 'def' },
        { say: 'A fair game does not mean everyone wins the same number of times. Chance still decides each game. It means nobody has an advantage before the game starts.' },
      ],
    },
    {
      chapter: 'Even or odd',
      layout: 'split',
      leftWidth: 620,
      left: [sums('ev')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Mei and Owen roll two dice. Mei scores if the sum is **even**. Owen scores if the sum is **odd**. Is the game fair?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{Mei}) = \\dfrac{18}{36} = \\dfrac{1}{2}', 'P(\\text{Owen}) = \\dfrac{18}{36} = \\dfrac{1}{2}'] },
      ],
      lines: [
        { say: 'Mei and Owen roll two dice. Mei scores a point if the sum is even. Owen scores a point if the sum is odd. Is the game fair?', show: [...table('ev'), 'q'] },
        { say: 'Shade the even sums. They make a checkerboard pattern. Count them: eighteen of the thirty-six cells are even.', show: 'ev.even', focus: 'ev.even' },
        { say: 'So the probability that Mei scores is eighteen out of thirty-six, which is one half.', show: 'm.0', focus: 'm.0' },
        { say: 'The other eighteen cells are odd, so the probability that Owen scores is also one half. Both players have the same probability, so the game is fair.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'An unfair game',
      layout: 'split',
      leftWidth: 620,
      left: [sums('uf')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Now Mei scores on a sum of $7$, and Owen scores on a sum of $12$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{Mei}) = \\dfrac{6}{36} = \\dfrac{1}{6}', 'P(\\text{Owen}) = \\dfrac{1}{36}', '\\text{not fair}'] },
      ],
      lines: [
        { say: 'Now change the rules. Mei scores on a sum of seven, and Owen scores on a sum of twelve. Is this game fair?', show: [...table('uf'), 'q'] },
        { say: 'A sum of seven happens in six cells, so Mei’s probability is six out of thirty-six, which is one sixth.', show: ['uf.seven', 'm.0'], focus: ['uf.seven', 'm.0'] },
        { say: 'A sum of twelve happens in only one cell, so Owen’s probability is one out of thirty-six.', show: ['uf.twelve', 'm.1'], focus: ['uf.twelve', 'm.1'] },
        { say: 'Mei is six times as likely to score as Owen. The probabilities are not the same, so this game is not fair.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ana and Ben roll two dice. Ana scores if the sum is $2$, $3$ or $4$. Ben scores if the sum is $10$, $11$ or $12$. Is the game fair?',
          choices: ['No: Ben’s numbers are bigger, so he is more likely to score.', 'No: Ana is more likely to score.', 'Yes: each player scores on $6$ of the $36$ outcomes.', 'It depends on who rolls first.'],
          answer: 2,
          working: 'Sums of $2$, $3$ and $4$: $1 + 2 + 3 = 6$ outcomes. Sums of $10$, $11$ and $12$: $3 + 2 + 1 = 6$ outcomes. Both probabilities are $\\dfrac{6}{36} = \\dfrac{1}{6}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Ana and Ben roll two dice. Ana scores if the sum is two, three or four. Ben scores if the sum is ten, eleven or twelve. Is the game fair? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C. Sums of two, three and four happen in one, two and three cells: six outcomes. Sums of ten, eleven and twelve happen in three, two and one cells: also six. Choice A is wrong, because bigger numbers are not more likely.', show: 'q.answer' },
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
          items: ['A game is fair when every player has the same probability of winning.', 'Count each player’s favourable outcomes in the sample space.', 'With two dice, even and odd sums each have a probability of $\\dfrac{1}{2}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A game is fair when every player has the same probability of winning.', show: 'sum.0' },
        { say: 'To check, count each player’s favourable outcomes in the sample space.', show: 'sum.1' },
        { say: 'With two dice, even sums and odd sums each have a probability of one half. In the next part, you will do an experiment, and compare what happens with what should happen. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
