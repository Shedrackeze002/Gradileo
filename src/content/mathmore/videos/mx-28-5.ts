import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-28-5',
  lessonId: 'mx-28-5',
  title: 'The t-Test for Two Means',
  thumbnail: 'm',
  summary: 'The two-sample t-test checks whether two populations, normal with equal variances, have the same mean. H₀: μ₁ = μ₂, and H₁ is one-tailed or two-tailed. Reject H₀ when the p-value is below the significance level. By hand, pool the variances, then t = (x̄₁ − x̄₂)/(s_p√(1/n₁ + 1/n₂)) with n₁ + n₂ − 2 degrees of freedom; t = 1.897 > 1.734 is significant at 5%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Regression, Expected Value and Statistical Tests', title: 'The t-Test for Two Means', subtitle: 'Is the difference real?' }],
      lines: [
        { say: 'Two samples almost never have exactly the same mean, even when they come from the same population.', show: 'title' },
        { say: 'In this video, you will learn the t-test, which tells us whether the difference between two sample means is big enough to show a real difference between the populations.' },
      ],
    },
    {
      chapter: 'Hypotheses',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Two-sample t-test', md: 'Tests whether two populations have the same mean, assuming both are normal with equal variances.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['H_0: \\mu_1 = \\mu_2', 'H_1: \\mu_1 > \\mu_2 \\ \\text{(one-tailed)} \\quad \\text{or} \\quad \\mu_1 \\ne \\mu_2 \\ \\text{(two-tailed)}'] },
      ],
      lines: [
        { say: 'The two-sample t-test tests whether two populations have the same mean, using a sample from each. It assumes both populations are normally distributed with equal variances.', show: 'def' },
        { say: 'The null hypothesis says the population means are equal.', show: 'm.0', focus: 'm.0' },
        { say: 'The alternative is one-tailed when the question asks whether one mean is greater, or less, than the other. It is two-tailed when the question asks whether they are different.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The p-value',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['p = 0.023 < 0.05: \\ \\text{reject } H_0'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'What the p-value is not', md: 'It is not the probability that $H_0$ is true, and not rejecting $H_0$ does not prove that the means are equal.' },
      ],
      lines: [
        { say: 'A calculator gives the p-value: the probability of a difference at least as large as the one observed, if the null hypothesis were true. We reject the null hypothesis when the p-value is less than the significance level.', show: 'm.0', focus: 'm.0' },
        { say: 'A p-value of zero point zero two three is less than zero point zero five, so at the five percent level there is evidence that the first mean is greater.' },
        { say: 'The p-value is not the probability that the null hypothesis is true. And not rejecting it does not prove the means are equal: it only means the evidence is not strong enough.', show: 'oops' },
      ],
    },
    {
      chapter: 'The test statistic',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['s_p^2 = \\dfrac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}', 't = \\dfrac{\\bar{x}_1 - \\bar{x}_2}{s_p\\sqrt{\\dfrac{1}{n_1} + \\dfrac{1}{n_2}}}', 's_p^2 = \\dfrac{9 \\times 9 + 9 \\times 16}{18} = 12.5, \\quad s_p \\approx 3.536', 't = \\dfrac{25.0 - 22.0}{3.536 \\times \\sqrt{0.2}} \\approx 1.897 > 1.734'] },
      ],
      lines: [
        { say: 'By hand, we first combine the two sample variances into a pooled variance.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the test statistic is the difference of the means, divided by the pooled standard deviation times this square root. It has n one plus n two minus two degrees of freedom.', show: 'm.1', focus: 'm.1' },
        { say: 'Two samples of ten have means twenty-five and twenty-two, and standard deviations three and four. The pooled variance is twelve point five.', show: 'm.2', focus: 'm.2' },
        { say: 'So t is about one point eight nine seven, with eighteen degrees of freedom. The one-tailed five percent critical value is one point seven three four, so the result is significant: there is evidence that the first mean is greater.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A researcher asks whether two teaching methods give **different** mean scores. Which alternative hypothesis is right?',
          choices: ['$H_1: \\mu_1 > \\mu_2$', '$H_1: \\mu_1 < \\mu_2$', '$H_1: \\mu_1 \\ne \\mu_2$', '$H_1: \\mu_1 = \\mu_2$'],
          answer: 2,
          working: 'The question asks only whether the means differ, not which is greater, so the test is two-tailed: $H_1: \\mu_1 \\ne \\mu_2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A researcher asks whether two teaching methods give different mean scores. Which alternative hypothesis is right? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The question asks only whether the means are different, not which is greater, so the test is two-tailed. Choice D is the null hypothesis.', show: 'q.answer' },
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
          items: ['$H_0: \\mu_1 = \\mu_2$; $H_1$ is one-tailed or two-tailed.', 'Reject $H_0$ when $p$ is below the significance level.', 'Pool the variances, then find $t$.', '$n_1 + n_2 - 2$ degrees of freedom.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The null hypothesis says the two population means are equal, and the alternative is one-tailed or two-tailed, depending on the question.', show: 'sum.0' },
        { say: 'Reject the null hypothesis when the p-value is less than the significance level.', show: 'sum.1' },
        { say: 'By hand, pool the variances and then find t.', show: 'sum.2' },
        { say: 'And compare t with the critical value for n one plus n two minus two degrees of freedom. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
