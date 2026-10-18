import type { Explainer } from '@/video/script.ts';
import { marbles } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm302-3-4',
  lessonId: 'm302-3-4',
  title: 'Independent and Dependent Events, Part 1: Independent Events',
  thumbnailTitle: 'Independent Events',
  thumbnail: 'bag',
  summary: 'Independent events, where one does not change the probability of the other, and P(A and B) = P(A) × P(B): heads and a 5 (1/2 × 1/6 = 1/12), two draws with replacement (25/64), and three free throws made 80% of the time (all three: 0.512; at least one: 1 − 0.2³ = 0.992). Part 2 covers dependent events.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 1', title: 'Independent Events', subtitle: '$P(A \\text{ and } B) = P(A) \\times P(B)$' }],
      lines: [
        { say: 'Tossing a coin tells you nothing about the roll of a die. When one event does not affect another, there is a simple rule for the probability that both happen.', show: 'title' },
        { say: 'In this video, you will learn what independent events are, multiply their probabilities, and find the probability of at least one success when something is tried again and again.' },
      ],
    },
    {
      chapter: 'Independent events',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Independent events', md: 'Two events are **independent** if the outcome of one does not change the probability of the other.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(A \\text{ and } B) = P(A) \\times P(B)'] },
      ],
      lines: [
        { say: 'Two events are independent if the outcome of one does not change the probability of the other.', show: 'def' },
        { say: 'For independent events, the probability that both happen is the product of their probabilities: P of A and B equals P of A times P of B.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'A coin and a die',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A coin is tossed and a die is rolled. What is the probability of heads and a 5?' },
        {
          kind: 'table',
          id: 't',
          head: ['', '1', '2', '3', '4', '5', '6'],
          rows: [
            ['Heads', 'H1', 'H2', 'H3', 'H4', '$\\good{\\text{H5}}$', 'H6'],
            ['Tails', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(\\text{heads and } 5) = \\dfrac{1}{2} \\times \\dfrac{1}{6} = \\dfrac{1}{12}'] },
      ],
      lines: [
        { say: 'A coin is tossed and a die is rolled. What is the probability of heads and a five?', show: 'p' },
        { say: 'The coin cannot affect the die, so the two events are independent.' },
        { say: 'P of heads is one half, and P of five is one sixth. So P of heads and five is one half times one sixth, which is one twelfth.', show: 'm', focus: 'm' },
        { say: 'The table shows why multiplying works. Two outcomes for the coin, times six for the die, make twelve equally likely outcomes. Exactly one of them is heads and five.', show: 't', focus: 't.0' },
      ],
    },
    {
      chapter: 'With replacement',
      layout: 'split',
      leftWidth: 460,
      left: [figure('bag', [marbles({ groups: [{ id: 'r', count: 5, tone: 'bad' }, { id: 'b', count: 3, tone: 'adj' }], perRow: 4 })], 300)],
      right: [
        { kind: 'text', id: 'p', size: 'md', align: 'left', md: 'A bag holds 5 red and 3 blue marbles. A marble is drawn and **put back**, then a second marble is drawn. What is the probability that both are red?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\text{red, red}) = \\dfrac{5}{8} \\times \\dfrac{5}{8} = \\dfrac{25}{64}'] },
      ],
      lines: [
        { say: 'A bag holds five red and three blue marbles. A marble is drawn, and put back. Then a second marble is drawn. What is the probability that both are red?', show: ['p', 'bag'] },
        { say: 'Putting the marble back is called drawing with replacement. The second draw starts with the same eight marbles as the first, so the first draw does not change it. The draws are independent.', focus: 'bag' },
        { say: 'Each draw is red with probability five eighths. So P of red and then red is five eighths times five eighths, which is twenty-five sixty-fourths.', show: 'm', focus: ['m', 'bag.r'] },
      ],
    },
    {
      chapter: 'Free throws',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Kiona makes 80% of her free throws, and each shot is independent. She takes 3 shots. Find the probability that she makes all three, and that she makes at least one.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['P(\\text{all three}) = 0.8 \\times 0.8 \\times 0.8 = 0.8^3 = 0.512', 'P(\\text{miss}) = 1 - 0.8 = 0.2, \\quad P(\\text{miss all three}) = 0.2^3 = 0.008', 'P(\\text{at least one}) = 1 - 0.008 = 0.992'],
        },
      ],
      lines: [
        { say: 'Kiona makes eighty percent of her free throws, and each shot is independent. She takes three shots. Find the probability that she makes all three, and the probability that she makes at least one.', show: 'p' },
        { say: 'Each shot is independent, so multiply. P of making all three is 0.8 times 0.8 times 0.8, which is 0.8 cubed, or 0.512.', show: 'm.0', focus: 'm.0' },
        { say: 'For at least one, use the complement. The opposite of making at least one shot is missing all three.' },
        { say: 'She misses a shot with probability one minus 0.8, which is 0.2. So she misses all three with probability 0.2 cubed, which is 0.008.', show: 'm.1', focus: 'm.1' },
        { say: 'So P of at least one is one minus 0.008, which is 0.992.', show: 'm.2', focus: 'm.2' },
        { say: 'Making all three is much harder than making at least one: about a one in two chance, compared with almost certain.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Independent is not mutually exclusive', md: 'Mutually exclusive events **cannot** happen together, so $P(A \\text{ and } B) = 0$. Independent events **can** happen together; one just does not change the chance of the other.' },
        { kind: 'table', id: 't', head: ['Events', 'Both at once?', 'Probability of both'], rows: [['A 2 and a 5 on one die', 'impossible', '$0$'], ['Heads and a 5', 'possible', '$\\dfrac{1}{2} \\times \\dfrac{1}{6} = \\dfrac{1}{12}$']] },
      ],
      lines: [
        { say: 'A common mistake is to mix up independent events and mutually exclusive events. They are different ideas.', show: 'oops' },
        { say: 'Mutually exclusive events cannot happen together. Rolling a two and rolling a five on one die can never both happen, so P of both is zero.', show: 't.0', focus: 't.0' },
        { say: 'Independent events can happen together. Heads and a five happen together one time in twelve. The coin just does not change the chance of the five.', show: 't.1', focus: 't.1' },
        { say: 'So for independent events, multiply. Add only for mutually exclusive events, when you want one or the other.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A spinner has 4 equal sections, and one of them is red. It is spun 3 times. What is the probability that it lands on red at least once?',
          choices: ['$\\dfrac{37}{64}$', '$\\dfrac{27}{64}$', '$\\dfrac{3}{4}$', '$\\dfrac{1}{64}$'],
          answer: 0,
          working: '$P(\\text{not red}) = \\dfrac{3}{4}$, so $P(\\text{no red}) = \\left(\\dfrac{3}{4}\\right)^3 = \\dfrac{27}{64}$ and $P(\\text{at least one red}) = 1 - \\dfrac{27}{64} = \\dfrac{37}{64}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A spinner has four equal sections, and one of them is red. It is spun three times. What is the probability that it lands on red at least once? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, thirty-seven over sixty-four. The spins are independent. P of not red is three quarters, so P of no red in three spins is three quarters cubed, which is twenty-seven over sixty-four. So P of at least one red is one minus that. Choice B is P of no red at all: it forgets to subtract from one.', show: 'q.answer' },
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
          items: ['Independent events: one does not change the probability of the other.', 'Independent: $P(A \\text{ and } B) = P(A) \\times P(B)$. Drawing with replacement gives independent events.', '$P(\\text{at least one}) = 1 - P(\\text{none})$'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two events are independent when one does not change the probability of the other.', show: 'sum.0' },
        { say: 'For independent events, P of A and B is P of A times P of B. Drawing with replacement gives independent events.', show: 'sum.1' },
        { say: 'And P of at least one is one minus P of none. In part two, we draw without replacement, so the second draw depends on the first. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
