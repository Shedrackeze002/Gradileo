import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-28-2',
  lessonId: 'mx-28-2',
  title: 'Expected Value',
  thumbnail: 'm',
  summary: 'The expected value E(X) = Σ x P(X = x) is the long-run average of a random variable: a fair dice has E(X) = 3.5. The probabilities add up to 1, which with E(X) gives equations for unknown probabilities. The expected number of successes in n trials is np, and a game is fair when the expected gain, the expected winnings minus the cost, is 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Regression, Expected Value and Statistical Tests', title: 'Expected Value', subtitle: 'The long-run average' }],
      lines: [
        { say: 'If we roll a dice many times and average the scores, the average settles down close to one number.', show: 'title' },
        { say: 'In this video, you will learn to find that long-run average, called the expected value, and to use it to decide whether a game is fair.' },
      ],
    },
    {
      chapter: 'The expected value',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Expected value', md: 'The mean of a distribution: multiply each value by its probability and add.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['E(X) = \\sum x\\,P(X = x)', '1 \\times \\tfrac{1}{6} + 2 \\times \\tfrac{1}{6} + \\dots + 6 \\times \\tfrac{1}{6} = \\tfrac{21}{6} = 3.5'] },
      ],
      lines: [
        { say: 'The expected value of a random variable X is the mean of its distribution, the average value of X over a very large number of trials.', show: 'def' },
        { say: 'To find it, multiply each value by its probability, and add.', show: 'm.0', focus: 'm.0' },
        { say: 'For a fair dice, each score from one to six has probability one sixth. The total is twenty-one sixths, which is three point five.', show: 'm.1', focus: 'm.1' },
        { say: 'Nobody ever rolls three point five, but it is the long-run average. The expected value does not have to be a value that X can take.' },
      ],
    },
    {
      chapter: 'Unknown probabilities',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$X$ takes the values $1$, $2$, $3$ with probabilities $0.2$, $p$, $q$, and $E(X) = 2.3$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['0.2 + p + q = 1 \\ \\Rightarrow \\ p + q = 0.8', '0.2 + 2p + 3q = 2.3 \\ \\Rightarrow \\ 2p + 3q = 2.1', 'q = 2.1 - 1.6 = 0.5, \\quad p = 0.3'] },
      ],
      lines: [
        { say: 'When probabilities are unknown, use the fact that all the probabilities add up to one.', show: 'q' },
        { say: 'Here that gives p plus q equals zero point eight.', show: 'm.0', focus: 'm.0' },
        { say: 'The expected value gives a second equation: two p plus three q equals two point one.', show: 'm.1', focus: 'm.1' },
        { say: 'Doubling the first equation gives two p plus two q equals one point six. Subtracting, q is zero point five, and p is zero point three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Fair games',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{expected number} = np = 250 \\times 0.8 = 200'] },
        { kind: 'text', id: 'q', md: 'A game costs \\$2. A player wins \\$10 with probability $0.1$ and \\$5 with probability $0.2$.', size: 'md' },
        { kind: 'math', id: 'n', size: 'lg', lines: ['\\text{expected winnings} = 10 \\times 0.1 + 5 \\times 0.2 = 2', '\\text{expected gain} = 2 - 2 = 0'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the cost', md: 'Subtract the cost of playing to get the expected gain.' },
      ],
      lines: [
        { say: 'If an event has probability p each time and we repeat the trial n times, the expected number of times it happens is n p. With a germination probability of zero point eight, two hundred and fifty seeds are expected to give two hundred plants.', show: 'm.0', focus: 'm.0' },
        { say: 'In a game of chance, the expected gain is the expected winnings minus the cost of playing. A game costs two dollars, and pays ten dollars with probability zero point one, or five dollars with probability zero point two.', show: 'q' },
        { say: 'The expected winnings are one dollar plus one dollar, two dollars.', show: 'n.0', focus: 'n.0' },
        { say: 'So the expected gain is two dollars minus two dollars, which is zero. A game is fair when the expected gain is zero.', show: 'n.1', focus: 'n.1' },
        { say: 'Remember to subtract the cost, which the player pays whether they win or not.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$X$ takes the values $1$, $2$, $5$ with probabilities $0.5$, $0.3$, $0.2$. Find $E(X)$.',
          choices: ['$2.67$', '$2.1$', '$8$', '$1$'],
          answer: 1,
          working: '$E(X) = 1 \\times 0.5 + 2 \\times 0.3 + 5 \\times 0.2 = 0.5 + 0.6 + 1 = 2.1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the expected value of X. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Zero point five plus zero point six plus one is two point one. Choice A is the plain average of the three values, which ignores the probabilities.', show: 'q.answer' },
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
          items: ['$E(X) = \\sum x\\,P(X = x)$, the long-run average.', 'The probabilities add up to $1$.', 'The expected number of successes in $n$ trials is $np$.', 'A game is fair when the expected gain is $0$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The expected value is the sum of each value times its probability, the long-run average of X.', show: 'sum.0' },
        { say: 'The probabilities add up to one, and with the expected value this gives equations for unknown probabilities.', show: 'sum.1' },
        { say: 'The expected number of successes in n trials is n p.', show: 'sum.2' },
        { say: 'And a game is fair when the expected gain is zero. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
