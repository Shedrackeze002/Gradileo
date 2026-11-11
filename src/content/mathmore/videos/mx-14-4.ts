import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-14-4',
  lessonId: 'mx-14-4',
  title: 'Discrete Random Variables',
  thumbnail: 't',
  summary: 'A discrete random variable takes separate values, each with a probability, and the probabilities of its distribution always add to 1. With probabilities 0.1, 0.3, k and 2k, k = 0.2 and P(X ≥ 3) = 0.6. A probability function such as P(X = x) = kx for x = 1 to 4 gives 10k = 1, so k = 1/10 and P(X > 2) = 7/10.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics: Sampling, Data and the Binomial Distribution', title: 'Discrete Random Variables', subtitle: 'Numbers decided by chance' }],
      lines: [
        { say: 'Roll a dice, and the score could be any of six numbers. Toss three coins, and the number of heads could be zero, one, two or three.', show: 'title' },
        { say: 'A random variable gives a name to a number like this, and its probability distribution says how likely each value is. In this video, you will use the fact that every distribution adds up to one.' },
      ],
    },
    {
      chapter: 'Probability distributions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Discrete random variable', md: 'A quantity $X$ whose value depends on chance, taking only separate values. Its **probability distribution** gives $P(X = x)$ for each value, and $\\sum P(X = x) = 1$.' },
        { kind: 'table', id: 't', head: ['$x$', '$1$', '$2$', '$3$', '$4$'], rows: [['$P(X = x)$', '$0.1$', '$0.3$', '$k$', '$2k$']] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.1 + 0.3 + k + 2k = 1 \\;\\Rightarrow\\; k = 0.2', 'P(X \\ge 3) = 0.2 + 0.4 = 0.6'] },
      ],
      lines: [
        { say: 'A random variable, X, is a quantity whose value depends on chance. It is discrete when it can take only separate values, such as whole numbers.', show: 'def' },
        { say: 'Its probability distribution gives the probability of each value. Here, X can be one, two, three or four, and two of the probabilities are unknown: k and two k.', show: 't.0' },
        { say: 'The probabilities of a distribution always add up to one. So zero point one plus zero point three plus k plus two k equals one, and three k is zero point six. So k is zero point two.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the probability that X is at least three. That includes three itself: zero point two plus zero point four, which is zero point six.', show: 'm.1', focus: 'm.1' },
        { say: 'Watch the signs. At least three includes three; more than three does not. For whole numbers, more than three means four or more.' },
      ],
    },
    {
      chapter: 'Probability functions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$P(X = x) = kx$ for $x = 1, 2, 3, 4$. Find $k$ and $P(X > 2)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['k + 2k + 3k + 4k = 10k = 1', 'k = \\tfrac{1}{10}', 'P(X > 2) = \\tfrac{3}{10} + \\tfrac{4}{10} = \\tfrac{7}{10}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check that the total is 1', md: 'After finding $k$, add all the probabilities again. They must come to exactly $1$.' },
      ],
      lines: [
        { say: 'A distribution can also be given as a formula, called a probability function. The probability that X equals x is k x, for x from one to four.', show: 'q' },
        { say: 'Write out each probability in terms of k: k, two k, three k and four k. They add to one, so ten k equals one.', show: 'm.0', focus: 'm.0' },
        { say: 'So k is one tenth.', show: 'm.1', focus: 'm.1' },
        { say: 'More than two means three or four, so the probability is three tenths plus four tenths, which is seven tenths.', show: 'm.2', focus: 'm.2' },
        { say: 'After finding k, check that all the probabilities add to exactly one. When the outcomes are equally likely, such as two fair spinners, list them in a sample space diagram and count.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$P(X = x) = k(x + 1)$ for $x = 0, 1, 2, 3$. Find $k$.',
          choices: ['$\\tfrac{1}{6}$', '$0.25$', '$1$', '$0.1$'],
          answer: 3,
          working: '$k(1 + 2 + 3 + 4) = 10k = 1$, so $k = 0.1$.',
        },
      ],
      lines: [
        { say: 'Your turn. The probability that X equals x is k times x plus one, for x equal to zero, one, two or three. Find k. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The probabilities are k, two k, three k and four k, which add to ten k. Ten k equals one, so k is zero point one. Choice A forgets that x starts at zero.', show: 'q.answer' },
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
          items: ['A discrete random variable takes separate values, each with a probability.', 'The probabilities always add up to $1$.', 'A probability function gives $P(X = x)$ as a formula.', 'Read the signs: $\\ge$ includes the value, $>$ does not.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A discrete random variable takes separate values, each with a probability.', show: 'sum.0' },
        { say: 'The probabilities always add up to one, which lets us find an unknown.', show: 'sum.1' },
        { say: 'A probability function gives each probability as a formula.', show: 'sum.2' },
        { say: 'And read the signs carefully: at least includes the value, more than does not. In the next lesson, we meet a famous distribution: the binomial distribution. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
