import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { normalCurve } from './lib/mx-stats.ts';

const z = (45.5 - 40) / Math.sqrt(24);

const video: Explainer = {
  id: 'mx-15-3',
  lessonId: 'mx-15-3',
  title: 'The Normal Approximation to the Binomial',
  thumbnail: 'n',
  summary: 'For large n and p near 0.5, B(n, p) is approximately N(np, np(1 − p)). Because the binomial is discrete, each whole number k covers k − 0.5 to k + 0.5: this is the continuity correction. For X ~ B(100, 0.4), Y ~ N(40, 24) and P(X ≤ 45) ≈ P(Y < 45.5) ≈ 0.8692, very close to the exact 0.8689.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics: Correlation and the Normal Distribution', title: 'The Normal Approximation', subtitle: 'to the binomial distribution' }],
      lines: [
        { say: 'Finding the probability of at most forty five successes in a binomial distribution with one hundred trials means adding forty six probabilities.', show: 'title' },
        { say: 'But when n is large, the binomial bar chart is shaped like a normal curve, so a normal distribution gives a good, quick approximation. In this video, you will set it up, with one important correction.' },
      ],
    },
    {
      chapter: 'Setting up',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Normal approximation', md: 'For large $n$ and $p$ close to $0.5$, $X \\sim \\mathrm{B}(n, p)$ is approximately $Y \\sim \\mathrm{N}(np,\\ np(1 - p))$: the same mean and variance.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['X \\sim \\mathrm{B}(100, 0.4)', 'np = 40, \\quad np(1 - p) = 24', 'Y \\sim \\mathrm{N}(40, 24)'] },
      ],
      lines: [
        { say: 'When n is large and p is close to zero point five, a binomial distribution can be approximated by a normal distribution with the same mean and variance.', show: 'def' },
        { say: 'The mean of a binomial is n p, and its variance is n p times one minus p. For B of one hundred, zero point four, the mean is forty, and the variance is forty times zero point six, which is twenty four.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'So we use the normal distribution with mean forty and variance twenty four. Careful: twenty four is the variance. The standard deviation is the square root of twenty four, about four point eight nine nine.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The continuity correction',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('n', [normalCurve('c', { areas: [{ id: 'a', from: -3.2, to: z }], ticks: [{ z: 0, tex: '40' }, { z, tex: '45.5', tone: 'theta' }] })], 380),
      ],
      right: [
        { kind: 'bullets', id: 'r', items: ['$P(X \\le k) \\approx P(Y < k + 0.5)$', '$P(X < k) \\approx P(Y < k - 0.5)$', '$P(X \\ge k) \\approx P(Y > k - 0.5)$', '$P(X > k) \\approx P(Y > k + 0.5)$'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(X \\le 45) \\approx P(Y < 45.5)', '\\approx 0.8692'] },
      ],
      lines: [
        { say: 'The binomial is discrete: it only takes whole numbers. The normal is continuous. So we treat each whole number k as the interval from k minus a half to k plus a half. This is the continuity correction.', show: ['n.c-axes', 'n.c-t0'] },
        { say: 'At most k includes k, so it runs up to k plus a half. Less than k leaves k out, so it stops at k minus a half.', show: ['r.0', 'r.1'], focus: ['r.0', 'r.1'] },
        { say: 'At least k starts from k minus a half, and more than k starts from k plus a half.', show: ['r.2', 'r.3'], focus: ['r.2', 'r.3'] },
        { say: 'So for at most forty five, we find the probability that Y is less than forty five point five.', show: ['m.0', 'n.c-a', 'n.c-t1'], focus: ['m.0', 'n.c-a'] },
        { say: 'That is about zero point eight six nine two. The exact binomial answer is zero point eight six eight nine, so the approximation is very close.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$X \\sim \\mathrm{B}(50, 0.5)$ is approximated by $Y \\sim \\mathrm{N}(25, 12.5)$. Which probability approximates $P(X \\ge 30)$?',
          choices: ['$P(Y > 29.5)$', '$P(Y > 30.5)$', '$P(Y < 29.5)$', '$P(Y > 30)$'],
          answer: 0,
          working: '$X \\ge 30$ includes $30$, whose interval starts at $29.5$, so use $P(Y > 29.5)$.',
        },
      ],
      lines: [
        { say: 'Your turn. B of fifty, zero point five, is approximated by a normal distribution with mean twenty five and variance twelve point five. Which probability approximates X at least thirty? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. At least thirty includes thirty, and its interval starts at twenty nine point five, so we need Y greater than twenty nine point five. Choice B leaves thirty out.', show: 'q.answer' },
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
          items: ['For large $n$ and $p$ near $0.5$: $\\mathrm{B}(n, p) \\approx \\mathrm{N}(np, np(1 - p))$.', 'Each whole number $k$ covers $k - 0.5$ to $k + 0.5$.', 'The second number in $\\mathrm{N}(\\mu, \\sigma^2)$ is the variance.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For large n and p near a half, a binomial is approximately normal, with mean n p and variance n p times one minus p.', show: 'sum.0' },
        { say: 'Use a continuity correction: each whole number covers half a unit either side. Write out which whole numbers are included before you choose.', show: 'sum.1' },
        { say: 'And remember that the second number is the variance, not the standard deviation. In the next lesson, we test the mean of a normal distribution. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
