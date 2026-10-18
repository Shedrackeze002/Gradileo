import type { Explainer } from '@/video/script.ts';
import { marbles } from '@/video/charts.ts';
import { figure, type Part } from '@/video/solids.ts';
import { deckCells, deckGrid } from './lib/m302-3-figures.ts';

/** Four Grade 12 students (yellow) above six Grade 11 students (blue), each row named on its left. */
const students: Part[] = [
  marbles({ name: 'g12', groups: [{ id: 'all', count: 4, tone: 'theta' }], perRow: 6, at: [0, 0] }),
  marbles({ name: 'g11', groups: [{ id: 'all', count: 6, tone: 'adj' }], perRow: 6, at: [0, -1.5] }),
  {
    // `edge` is unused by any part: it widens the figure so the row names fit on its left.
    points: { T12: [-0.7, 0], T11: [-0.7, -1.5], edge: [-3.4, -0.75] },
    items: [
      { kind: 'label', id: 't12', at: 'T12', tex: '\\text{Grade 12}', tone: 'theta', place: 'left', group: 'g12-all' },
      { kind: 'label', id: 't11', at: 'T11', tex: '\\text{Grade 11}', tone: 'adj', place: 'left', group: 'g11-all' },
    ],
  },
];

const video: Explainer = {
  id: 'm302-3-2-b',
  lessonId: 'm302-3-2',
  title: 'Probability Using Counting Methods, Part 2: Choosing Groups',
  thumbnailTitle: 'Probability with Combinations',
  thumbnail: 'st',
  summary: 'Finding probabilities with combinations: a random committee of 3 from 4 Grade 12 and 6 Grade 11 students (all Grade 12: 4/120 = 1/30; exactly 2: 36/120 = 3/10), two hearts from a deck (78/1326 = 1/17), and why the favourable outcomes and the total must be counted the same way. Part 3 finds the probability of at least one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 2', title: 'Probability with Combinations', subtitle: 'When only the group matters' }],
      lines: [
        { say: 'A committee picked by drawing names from a hat, or a hand of cards dealt from a shuffled deck: in each, only the group matters, not the order it was chosen in.', show: 'title' },
        { say: 'In this video, you will find probabilities like these with combinations: for a random committee, and for a hand of two cards.' },
      ],
    },
    {
      chapter: 'Order matters or not?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Order matters or not?', md: 'Use permutations ($n!$, ${}_{n}P_{r}$) when the order or position matters, and combinations (${}_{n}C_{r}$) when only the group matters. Use the **same method** for the favourable outcomes and the total.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{n}C_{r} = \\dfrac{n!}{(n - r)!\\,r!}'] },
      ],
      lines: [
        { say: 'First, decide whether order matters. Use permutations when the order or the position matters, as with people in a line. Use combinations when only the group matters, as with a committee or a hand of cards.', show: 'tip' },
        { say: 'Remember that n choose r, the number of ways to choose r objects from n when order does not matter, is n factorial over n minus r, factorial, times r factorial.', show: 'm', focus: 'm' },
        { say: 'And whichever method you choose, use the same one for the favourable outcomes and for the total.', focus: 'tip' },
      ],
    },
    {
      chapter: 'A random committee',
      layout: 'split',
      leftWidth: 520,
      left: [figure('st', students, 300)],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'Four Grade 12 and six Grade 11 students volunteer. A committee of 3 is chosen at random. What is the probability that all 3 are in Grade 12?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{all: } {}_{10}C_{3} = 120', '\\text{all Grade 12: } {}_{4}C_{3} = 4', 'P = \\dfrac{4}{120} = \\dfrac{1}{30}'] },
      ],
      lines: [
        { say: 'Four Grade 12 students and six Grade 11 students volunteer. A committee of three is chosen at random. What is the probability that all three are in Grade 12?', show: ['p', 'st'] },
        { say: 'The same three people chosen in a different order make the same committee, so only the group matters. Count with combinations.' },
        { say: 'All the committees: choose three of the ten students. Ten choose three is 120.', show: 'm.0', focus: ['m.0', 'st'] },
        { say: 'For the favourable committees, all three come from the four Grade 12 students. Four choose three is four.', show: 'm.1', focus: ['m.1', 'st.g12-all'] },
        { say: 'So P of all Grade 12 is four over 120, which is one thirtieth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Exactly two in Grade 12',
      layout: 'split',
      leftWidth: 520,
      left: [figure('st2', students, 300)],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'What is the probability that **exactly 2** of the 3 members are in Grade 12?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['{}_{4}C_{2} \\times {}_{6}C_{1}', '= 6 \\times 6 = 36', 'P = \\dfrac{36}{120} = \\dfrac{3}{10}'] },
      ],
      lines: [
        { say: 'Now, what is the probability that exactly two of the three members are in Grade 12?', show: ['p', 'st2'] },
        { say: 'Exactly two in Grade 12 means two from Grade 12, and the third member from Grade 11.' },
        { say: 'Choose two of the four Grade 12 students: four choose two is six.', show: 'm.0', focus: ['m.0', 'st2.g12-all'] },
        { say: 'And choose one of the six Grade 11 students: six choose one is six.', focus: ['m.0', 'st2.g11-all'] },
        { say: 'Each pair from Grade 12 can go with each student from Grade 11, so multiply: six times six is thirty-six committees.', show: 'm.1', focus: 'm.1' },
        { say: 'P of exactly two is thirty-six over 120, which is three tenths. When you choose from two groups, choose from each group, and multiply.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A standard deck',
      layout: 'center',
      main: [
        figure('deck', [deckGrid({ marks: [{ id: 'hearts', cells: deckCells({ rows: [1] }), tone: 'bad' }] })], 330),
        { kind: 'text', id: 'p', size: 'md', md: 'A standard deck has 52 cards: 4 suits of 13 cards each.' },
      ],
      lines: [
        { say: 'Many probability questions use a standard deck of fifty-two cards. It has four suits: spades, hearts, diamonds and clubs.', show: ['deck.grid', 'deck.heads', 'p'] },
        { say: 'Each suit has thirteen cards: an ace, the numbers two to ten, and three face cards, the jack, queen and king.', focus: 'deck.heads' },
        { say: 'Hearts and diamonds are red, and spades and clubs are black. Here are the thirteen hearts.', show: 'deck.hearts', focus: 'deck.hearts' },
      ],
    },
    {
      chapter: 'Two hearts',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Two cards are dealt from a standard deck of 52. What is the probability that both are hearts?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{all hands: } {}_{52}C_{2} = 1326', '\\text{two hearts: } {}_{13}C_{2} = 78', 'P = \\dfrac{78}{1326} = \\dfrac{1}{17}'] },
      ],
      lines: [
        { say: 'Two cards are dealt from a standard deck. What is the probability that both are hearts?', show: 'p' },
        { say: 'A hand is a group of cards. Being dealt the five of hearts and then the king is the same hand as the king and then the five. So use combinations.' },
        { say: 'All the two-card hands: fifty-two choose two is 1,326.', show: 'm.0', focus: 'm.0' },
        { say: 'Hands with two hearts: choose two of the thirteen hearts. Thirteen choose two is seventy-eight.', show: 'm.1', focus: 'm.1' },
        { say: 'So the probability is seventy-eight over 1,326. Both numbers divide by seventy-eight, which gives one seventeenth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing methods', md: 'If you count the favourable outcomes with combinations, count the total with combinations too. ${}_{52}P_{2}$ counts every hand twice, once in each order.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{\\dfrac{{}_{13}C_{2}}{{}_{52}P_{2}} = \\dfrac{78}{2652} = \\dfrac{1}{34}}', '\\good{\\dfrac{{}_{13}C_{2}}{{}_{52}C_{2}} = \\dfrac{1}{17}} \\qquad \\good{\\dfrac{{}_{13}P_{2}}{{}_{52}P_{2}} = \\dfrac{156}{2652} = \\dfrac{1}{17}}'] },
      ],
      lines: [
        { say: 'A common mistake is to mix the two methods: thirteen choose two on the top, but fifty-two P two on the bottom.', show: 'oops' },
        { say: 'Fifty-two P two counts every hand twice, once in each order, but the top counts each hand once. So the answer, one over thirty-four, is half the correct one.', show: 'm.0', focus: 'm.0' },
        { say: 'Use combinations on both, or permutations on both. Thirteen P two over fifty-two P two counts every hand twice on the top and on the bottom, so it gives one seventeenth as well.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bag holds 5 red and 7 blue marbles. Three marbles are drawn at random, all at once. What is the probability that all three are red?',
          choices: ['$\\dfrac{1}{22}$', '$\\dfrac{3}{11}$', '$\\dfrac{1}{132}$', '$\\dfrac{5}{12}$'],
          answer: 0,
          working: '${}_{5}C_{3} = 10$ and ${}_{12}C_{3} = 220$, so $P = \\dfrac{10}{220} = \\dfrac{1}{22}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag holds five red and seven blue marbles. Three marbles are drawn at random, all at once. What is the probability that all three are red? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, one over twenty-two. The order does not matter, so use combinations for both counts. Five choose three is ten, twelve choose three is 220, and ten over 220 is one over twenty-two. Choice B mixes methods: it uses five P three on the top, but twelve choose three on the bottom.', show: 'q.answer' },
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
          items: ['Use combinations when only the group matters.', 'Choosing from two groups: choose from each group, then multiply.', 'Count the favourable outcomes and the total with the same method.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use combinations when only the group matters, as with a committee or a hand of cards.', show: 'sum.0' },
        { say: 'When you choose from two groups, choose from each group, then multiply.', show: 'sum.1' },
        { say: 'And count the favourable outcomes and the total with the same method. In part three, we find the probability of at least one, the easy way. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
