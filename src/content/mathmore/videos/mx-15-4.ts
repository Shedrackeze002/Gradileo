import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { normalCurve } from './lib/mx-stats.ts';

const video: Explainer = {
  id: 'mx-15-4',
  lessonId: 'mx-15-4',
  title: 'Hypothesis Testing for the Mean of a Normal Distribution',
  thumbnail: 'n',
  summary: 'The mean of a sample of n from N(μ, σ²) is X̄ ~ N(μ, σ²/n), with standard error σ/√n: 16 bags from N(500, 12²) give a standard deviation of 3 g. To test a mean, assume H₀: μ = μ₀ and use the distribution of X̄. A sample mean of 505.4 g has P(X̄ ≥ 505.4) ≈ 0.0359 < 0.05, so there is evidence the mean has increased. In a two-tailed test, half the significance level goes in each tail.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics: Correlation and the Normal Distribution', title: 'Testing a Normal Mean', subtitle: 'Has the average changed?' }],
      lines: [
        { say: 'A machine is set to fill bags with five hundred grams of flour. One bag weighing five hundred five grams says little.', show: 'title' },
        { say: 'But if sixteen bags average five hundred five point four grams, the machine may have drifted. In this video, you will see why a sample mean varies so much less than single values, and how to test it.' },
      ],
    },
    {
      chapter: 'The sample mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The distribution of a sample mean', md: 'If $X \\sim \\mathrm{N}(\\mu, \\sigma^2)$ and $\\bar{X}$ is the mean of a random sample of $n$, then $\\bar{X} \\sim \\mathrm{N}\\!\\left(\\mu, \\dfrac{\\sigma^2}{n}\\right)$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{12}{\\sqrt{16}} = 3\\text{ g}'] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'Divide σ by √n, not n', md: 'The **variance** is $\\dfrac{\\sigma^2}{n}$, so the standard deviation is $\\dfrac{\\sigma}{\\sqrt{n}}$.' },
      ],
      lines: [
        { say: 'If X is normal with mean mu and variance sigma squared, the mean of a random sample of n values, X bar, is also normal.', show: 'def' },
        { say: 'It has the same mean, mu, but its variance is sigma squared over n. So its standard deviation, called the standard error, is sigma over root n.' },
        { say: 'Bags have masses with mean five hundred grams and standard deviation twelve. For a sample of sixteen bags, the standard deviation of the mean is twelve over root sixteen, which is three grams: a quarter of the spread of single bags.', show: 'm', focus: 'm' },
        { say: 'Divide sigma by root n, not by n. Dividing by n makes the spread far too small.', show: 'mis' },
      ],
    },
    {
      chapter: 'Testing a mean',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('n', [normalCurve('c', { areas: [{ id: 'tail', from: 1.8, to: 3.2, tone: 'theta' }], ticks: [{ z: 0, tex: '500' }, { z: 1.8, tex: '505.4', tone: 'theta' }] })], 360),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['H_0: \\mu = 500, \\quad H_1: \\mu > 500', '\\text{Under } H_0: \\ \\bar{X} \\sim \\mathrm{N}(500, 3^2)', 'P(\\bar{X} \\ge 505.4) \\approx 0.0359', '0.0359 < 0.05: \\text{ significant}'] },
      ],
      lines: [
        { say: 'A sample of sixteen bags has mean five hundred five point four grams. Test at the five percent level whether the mean has increased.', show: ['n.c-axes', 'n.c-t0'] },
        { say: 'The null hypothesis is mu equals five hundred, and the alternative is mu greater than five hundred.', show: 'm.0', focus: 'm.0' },
        { say: 'Assume H nought. Then the sample mean is normal, with mean five hundred and standard deviation three.', show: 'm.1', focus: 'm.1' },
        { say: 'The p-value is the probability of a sample mean at least as large as five hundred five point four: about zero point zero three five nine.', show: ['m.2', 'n.c-tail', 'n.c-t1'], focus: ['m.2', 'n.c-tail'] },
        { say: 'That is less than zero point zero five, so the result is significant. Reject H nought: there is evidence that the mean mass has increased.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two tails',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Split the significance level', md: 'In a two-tailed test at $5\\%$, each tail holds $2.5\\%$, so $z \\approx 1.96$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['500 \\pm 1.96 \\times 3', '\\bar{X} < 494.1 \\ \\text{ or } \\ \\bar{X} > 505.9', '505.4 \\text{ is not in the critical region}'] },
      ],
      lines: [
        { say: 'Suppose instead we were testing whether the mean had changed in either direction. That is a two-tailed test, so half the significance level goes in each tail: two and a half percent.', show: 'tip' },
        { say: 'Two and a half percent in the top tail gives z of about one point nine six. So the critical values are five hundred, plus or minus one point nine six times three.', show: 'm.0', focus: 'm.0' },
        { say: 'The critical region is a sample mean below four hundred ninety four point one, or above five hundred five point nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Five hundred five point four is not in it. A two-tailed test needs stronger evidence in each direction, so here we would not reject H nought.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$X \\sim \\mathrm{N}(80, 10^2)$. A random sample of $25$ is taken. Find the standard deviation of the sample mean $\\bar{X}$.',
          choices: ['$0.4$', '$2$', '$4$', '$10$'],
          answer: 1,
          working: '$\\dfrac{\\sigma}{\\sqrt{n}} = \\dfrac{10}{\\sqrt{25}} = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. X is normal with mean eighty and standard deviation ten. A random sample of twenty five is taken. Find the standard deviation of the sample mean. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Sigma over root n is ten over five, which is two. Choice A divides by twenty five instead of its square root.', show: 'q.answer' },
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
          items: ['$\\bar{X} \\sim \\mathrm{N}\\!\\left(\\mu, \\dfrac{\\sigma^2}{n}\\right)$: standard error $\\dfrac{\\sigma}{\\sqrt{n}}$.', 'Test with $H_0$: $\\mu = \\mu_0$, using the distribution of $\\bar{X}$.', 'Reject $H_0$ if the p-value is below the significance level.', 'Two tails: half the significance level in each.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The mean of a sample of n is normal with the same mean and variance sigma squared over n.', show: 'sum.0' },
        { say: 'To test a mean, assume H nought and use the distribution of the sample mean.', show: 'sum.1' },
        { say: 'Reject H nought if the p-value is below the significance level.', show: 'sum.2' },
        { say: 'And in a two-tailed test, put half the significance level in each tail. That completes statistics. Next, we return to pure mathematics, with proof by exhaustion. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
