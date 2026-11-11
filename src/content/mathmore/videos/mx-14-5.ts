import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const choose = (n: number, r: number): number => (r === 0 ? 1 : (choose(n, r - 1) * (n - r + 1)) / r);
const probs = Array.from({ length: 11 }, (_, r) => choose(10, r) * 0.3 ** r * 0.7 ** (10 - r));

const video: Explainer = {
  id: 'mx-14-5',
  lessonId: 'mx-14-5',
  title: 'The Binomial Distribution',
  thumbnail: 'bg',
  summary: 'X ~ B(n, p) counts the successes in n independent trials, each with the same probability of success p, and P(X = r) = nCr pʳ(1 − p)ⁿ⁻ʳ. For X ~ B(10, 0.3), P(X = 3) ≈ 0.2668. Cumulative probabilities add up from 0: P(X ≥ 3) = 1 − P(X ≤ 2) ≈ 0.6172.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics: Sampling, Data and the Binomial Distribution', title: 'The Binomial Distribution', subtitle: 'Counting successes' }],
      lines: [
        { say: 'A basketball player takes ten free throws, and scores each one with probability zero point three. The number scored could be anything from zero to ten.', show: 'title' },
        { say: 'The binomial distribution gives the probability of each. In this video, you will learn when it applies, and how to find exact and cumulative probabilities.' },
      ],
    },
    {
      chapter: 'When it applies',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('bg', [barGraph({ categories: probs.map((_, r) => String(r)), values: probs, max: 0.3, step: 0.1, height: 5, titles: { y: 'Probability' } })], 420),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'X ~ B(n, p)', md: 'Counts the successes in $n$ trials when:' },
        { kind: 'bullets', id: 'c', items: ['the number of trials $n$ is fixed;', 'each trial is a success or a failure;', 'the probability $p$ is the same each time;', 'the trials are independent.'] },
      ],
      lines: [
        { say: 'A random variable X has a binomial distribution, written X is B of n, p, when it counts the successes in n trials, under four conditions.', show: 'def' },
        { say: 'There is a fixed number of trials, n. Each trial has two outcomes: success or failure.', show: ['c.0', 'c.1'], focus: ['c.0', 'c.1'] },
        { say: 'The probability of success, p, is the same for every trial. And the trials are independent.', show: ['c.2', 'c.3'], focus: ['c.2', 'c.3'] },
        { say: 'Here is the distribution for the ten free throws. Three successes is the most likely result, and ten successes is almost impossible.', show: ['bg.scale', ...probs.map((_, r) => `bg.b${r}`)] },
        { say: 'Drawing cards from a small pack without replacement is not binomial, because the probability changes with each card.' },
      ],
    },
    {
      chapter: 'An exact probability',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['P(X = r) = \\binom{n}{r} p^r (1 - p)^{n - r}'] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(X = 3) = \\binom{10}{3}(0.3)^3(0.7)^7', '= 120 \\times 0.027 \\times 0.08235\\ldots \\approx 0.2668'] },
      ],
      lines: [
        { say: 'The probability of exactly r successes is n choose r, times p to the power r, times one minus p to the power n minus r.', show: 'f', focus: 'f' },
        { say: 'p to the r, times one minus p to the n minus r, is the probability of one particular order of r successes and the rest failures. n choose r counts how many such orders there are.' },
        { say: 'For the free throws, X is B of ten, zero point three. The probability of exactly three is ten choose three, times zero point three cubed, times zero point seven to the power seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Ten choose three is one hundred twenty, so the probability is about zero point two six six eight.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Cumulative probabilities',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'r', items: ['$P(X \\ge r) = 1 - P(X \\le r - 1)$', '$P(X > r) = 1 - P(X \\le r)$', '$P(a \\le X \\le b) = P(X \\le b) - P(X \\le a - 1)$'] },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(X \\ge 3) = 1 - P(X \\le 2)', '= 1 - (0.0282 + 0.1211 + 0.2335)', '\\approx 0.6172'] },
      ],
      lines: [
        { say: 'A cumulative probability, such as X is at most r, adds the probabilities from zero up to r. Calculators find these directly. Other forms are turned into at most.', show: 'r.0' },
        { say: 'At least r is one minus at most r minus one. More than r is one minus at most r. And a range is the difference of two cumulative probabilities.', show: ['r.1', 'r.2'] },
        { say: 'For the free throws, find the probability of at least three. That is one minus the probability of at most two.', show: 'm.0', focus: 'm.0' },
        { say: 'At most two is zero, one or two successes: about zero point three eight two eight. So at least three is about zero point six one seven two.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'One special case: at least one is always one minus the probability of none.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$X \\sim \\mathrm{B}(5, 0.5)$. Find $P(X = 5)$.',
          choices: ['$0.03125$', '$0.5$', '$0.15625$', '$2.5$'],
          answer: 0,
          working: '$P(X = 5) = \\dbinom{5}{5}(0.5)^5(0.5)^0 = \\tfrac{1}{32} = 0.03125$.',
        },
      ],
      lines: [
        { say: 'Your turn. X is B of five, zero point five. Find the probability that X equals five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Five choose five is one, so the probability is zero point five to the power five, which is one over thirty two, or zero point zero three one two five. Choice D is the mean, not a probability.', show: 'q.answer' },
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
          items: ['$\\mathrm{B}(n, p)$: $n$ independent trials, each with success probability $p$.', '$P(X = r) = \\dbinom{n}{r}p^r(1 - p)^{n - r}$.', '$P(X \\ge r) = 1 - P(X \\le r - 1)$.', '“At least one” is $1 - P(X = 0)$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The binomial distribution counts successes in n independent trials, each with the same probability p.', show: 'sum.0' },
        { say: 'The probability of exactly r successes is n choose r, p to the r, one minus p to the n minus r.', show: 'sum.1' },
        { say: 'At least r is one minus at most r minus one.', show: 'sum.2' },
        { say: 'And at least one is one minus the probability of none. In the next lesson, we use the binomial distribution to test a claim. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
