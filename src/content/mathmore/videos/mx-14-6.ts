import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-14-6',
  lessonId: 'mx-14-6',
  title: 'Hypothesis Testing with the Binomial Distribution',
  thumbnail: 'm',
  summary: 'A hypothesis test assumes the null hypothesis H₀ (such as p = 0.5) and asks how unlikely the observed result would be. Under H₀ the count is B(n, p), and if the p-value is below the significance level, reject H₀. Fifteen heads in 20 tosses has P(X ≥ 15) ≈ 0.0207 < 0.05, so there is evidence the coin is biased towards heads; the critical region is X ≥ 15.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics: Sampling, Data and the Binomial Distribution', title: 'Hypothesis Testing', subtitle: 'With the binomial distribution' }],
      lines: [
        { say: 'A coin lands on heads fifteen times in twenty tosses. Is it biased, or was that just luck?', show: 'title' },
        { say: 'A hypothesis test answers this by asking how unlikely such a result would be if the coin were fair. In this video, you will set up and carry out a test, and find a critical region.' },
      ],
    },
    {
      chapter: 'The language of testing',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Term', 'Meaning'], rows: [['$H_0$, null hypothesis', 'the value we assume: $p = 0.5$'], ['$H_1$, alternative', 'what we accept with enough evidence: $p > 0.5$'], ['significance level', 'the threshold for “unlikely enough”, often $5\\%$'], ['one-tailed / two-tailed', '$H_1$: $p > \\ldots$ or $p < \\ldots$ / $p \\ne \\ldots$']] },
        { kind: 'callout', id: 'mis', tone: 'mistake', title: 'H₀ always has the equals sign', md: 'The inequality belongs in $H_1$, and both are about the **population** parameter $p$.' },
      ],
      lines: [
        { say: 'A hypothesis test uses a sample to decide between two statements about the population. The null hypothesis, H nought, is the value we assume is true, such as p equals zero point five for a fair coin.', show: 't.0', focus: 't.0' },
        { say: 'The alternative hypothesis, H one, is what we accept if there is enough evidence against H nought, such as p greater than zero point five.', show: 't.1', focus: 't.1' },
        { say: 'The significance level is the threshold for unlikely enough, often five percent. It is the probability of rejecting H nought when it is in fact true.', show: 't.2', focus: 't.2' },
        { say: 'A one-tailed test looks for a change in one direction. A two-tailed test looks for a change in either direction, with not equal to.', show: 't.3', focus: 't.3' },
        { say: 'The null hypothesis always states a value, with an equals sign. The inequality belongs in the alternative.', show: 'mis' },
      ],
    },
    {
      chapter: 'Carrying out the test',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A coin lands on heads $15$ times in $20$ tosses. Test at the $5\\%$ level whether it is biased towards heads.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['H_0: p = 0.5, \\quad H_1: p > 0.5', '\\text{Under } H_0: \\ X \\sim \\mathrm{B}(20, 0.5)', 'P(X \\ge 15) = 1 - P(X \\le 14) \\approx 0.0207', '0.0207 < 0.05: \\text{ significant}'] },
      ],
      lines: [
        { say: 'Let’s test the coin at the five percent level. The null hypothesis is p equals zero point five, and the alternative is p greater than zero point five, because we are looking for bias towards heads.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Assume H nought is true. Then the number of heads is B of twenty, zero point five.', show: 'm.1', focus: 'm.1' },
        { say: 'The p-value is the probability of a result at least as extreme as the one we saw: at least fifteen heads. That is one minus at most fourteen, about zero point zero two zero seven.', show: 'm.2', focus: 'm.2' },
        { say: 'That is less than zero point zero five, so the result is significant. Reject H nought: there is evidence that the coin is biased towards heads.', show: 'm.3', focus: 'm.3' },
        { say: 'Always conclude in context like this. And never say a test proves H nought; say there is not enough evidence against it.' },
      ],
    },
    {
      chapter: 'The critical region',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Critical region', md: 'The set of results that would lead us to reject $H_0$. Its first value is the **critical value**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['P(X \\ge 15) \\approx 0.0207 \\le 0.05', 'P(X \\ge 14) \\approx 0.0577 > 0.05', '\\text{Critical region: } X \\ge 15'] },
      ],
      lines: [
        { say: 'The critical region is the set of results that would lead us to reject H nought.', show: 'def' },
        { say: 'At least fifteen heads has probability about zero point zero two zero seven, which is within five percent.', show: 'm.0', focus: 'm.0' },
        { say: 'But at least fourteen has probability about zero point zero five seven seven, which is more than five percent.', show: 'm.1', focus: 'm.1' },
        { say: 'So the critical region is fifteen or more heads, and the critical value is fifteen. The actual significance level is the probability of landing in it, zero point zero two zero seven.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A test of $H_0$: $p = 0.4$ against $H_1$: $p > 0.4$ at the $5\\%$ level gives a p-value of $0.08$. What is the conclusion?',
          choices: ['Reject $H_0$: there is evidence that $p > 0.4$', 'Do not reject $H_0$: not enough evidence that $p > 0.4$', 'Accept $H_1$, since $p = 0.08$', 'This proves that $p = 0.4$'],
          answer: 1,
          working: '$0.08 > 0.05$, so the result is not significant: there is not enough evidence to reject $H_0$.',
        },
      ],
      lines: [
        { say: 'Your turn. A test of p equals zero point four against p greater than zero point four, at the five percent level, gives a p-value of zero point zero eight. What is the conclusion? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Zero point zero eight is more than zero point zero five, so the result is not significant, and there is not enough evidence to reject H nought. Choice D is wrong because a test never proves H nought.', show: 'q.answer' },
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
          items: ['$H_0$ states a value of $p$; $H_1$ says how it might differ.', 'Under $H_0$, the count is $\\mathrm{B}(n, p)$.', 'Reject $H_0$ when the p-value is below the significance level.', 'The critical region holds the results that reject $H_0$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The null hypothesis states a value of p, and the alternative says how it might differ.', show: 'sum.0' },
        { say: 'Assuming H nought, the count follows a binomial distribution.', show: 'sum.1' },
        { say: 'Reject H nought when the p-value is below the significance level, and conclude in context.', show: 'sum.2' },
        { say: 'And the critical region holds every result that would reject H nought. In the next lesson, we test for correlation. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
