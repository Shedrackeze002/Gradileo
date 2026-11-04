import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotPlot, stacks } from './lib/mx-figures.ts';

const RUNS = [5, 6, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 14, 15];

const video: Explainer = {
  id: 'mx-1-6-b',
  lessonId: 'mx-1-6',
  title: 'Surveys, Experiments and Simulation, Part 2: Simulation',
  thumbnailTitle: 'Simulation',
  thumbnail: 'd',
  summary: 'A simulation repeats a situation many times as if a claim were true, to see how often a result like ours turns up. In 27 simulated runs of 20 fair coin tosses, none gave 17 or more heads, so 17 heads is evidence that a coin is not fair. A common rule calls a result unusual below 5% of the runs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics and Data Displays · Part 2', title: 'Simulation', subtitle: 'Is the result unusual?' }],
      lines: [
        { say: 'Results vary by chance. Toss a fair coin twenty times, and you will not always get exactly ten heads.', show: 'title' },
        { say: 'So how can we tell whether a result is just chance, or a sign that something is going on? In this video, you will learn to judge that with a simulation.' },
      ],
    },
    {
      chapter: 'What a simulation does',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Simulation', md: 'Use a computer, coins or random numbers to **repeat a situation many times as if a claim were true**, and see how often a result like ours turns up.' },
      ],
      lines: [
        { say: 'To simulate means to use a computer, coins or random numbers to repeat a situation many times, as if a claim were true.', show: 'def' },
        { say: 'Then we look at how often a result like ours turns up. If the simulation gives it often, our result fits the claim. If the simulation almost never gives it, our result is evidence against the claim.' },
      ],
    },
    {
      chapter: 'A fair coin?',
      layout: 'center',
      main: [
        figure('d', [dotPlot({ values: RUNS, min: 3, max: 17, length: 14, label: 'Heads in 20 tosses, in each of 27 runs', gap: 0.5 })], 470),
      ],
      lines: [
        { say: 'A coin is claimed to be fair. To see what a fair coin does, a computer tossed twenty fair coins, counted the heads, and did it again, 27 times in all.', show: 'd.axis' },
        { say: 'Each dot is one run of twenty tosses. One run gave five heads, one gave fifteen, and most gave between eight and twelve.', show: stacks('d', RUNS) },
        { say: 'The tallest stack is at ten, half of twenty, just as we would expect from a fair coin.', focus: 'd.s10' },
        { say: 'So this is what chance alone looks like: anywhere from about five to fifteen heads.', focus: 'd' },
      ],
    },
    {
      chapter: 'Is the result unusual?',
      layout: 'center',
      main: [
        figure('d', [dotPlot({ values: RUNS, min: 3, max: 17, length: 14, label: 'Heads in 20 tosses, in each of 27 runs', gap: 0.5 })], 380),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Runs with } 17 \\text{ or more heads: } 0 \\text{ of } 27 = 0\\%'] },
      ],
      lines: [
        { say: 'Now the real test. The coin was tossed twenty times, and it gave seventeen heads. Is that unusual for a fair coin?', show: ['d.axis', ...stacks('d', RUNS)] },
        { say: 'Look at seventeen on the dot plot. There are no dots there, and none beyond it. In the simulation, zero of the 27 runs had seventeen or more heads.', show: 'm.0', focus: 'm.0' },
        { say: 'A result the simulation almost never gives is unusual if the claim is true. So seventeen heads would be very unusual for a fair coin. The result is evidence that the coin is not fair.' },
      ],
    },
    {
      chapter: 'What counts as unusual?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A common rule', md: 'A result is **unusual** when it happens in **less than 5%** of the simulated runs. A result inside the bulk of the runs fits the claim.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{12 heads: } 7 \\text{ of } 27 \\text{ runs had } 12 \\text{ or more} \\approx 26\\%'] },
      ],
      lines: [
        { say: 'How rare is rare enough? A common rule is that a result is unusual when it happens in less than five percent of the simulated runs.', show: 'tip' },
        { say: 'Suppose the coin had given twelve heads instead. In the simulation, seven of the 27 runs had twelve or more heads. That is about 26 percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve heads is inside the bulk of the runs, so it fits the claim. It gives us no reason to doubt that the coin is fair.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $200$ simulated runs of a claim, $6$ runs gave a result as extreme as the real one. By the $5\\%$ rule, is the real result unusual?',
          choices: ['No, because $6$ runs gave it', 'No, because $6 \\div 200$ is more than $5\\%$', 'Yes, because $6 \\div 200 = 3\\%$, less than $5\\%$', 'We cannot tell from a simulation'],
          answer: 2,
          working: '$6 \\div 200 = 0.03 = 3\\%$, which is less than $5\\%$, so the result is unusual if the claim is true: evidence against the claim.',
        },
      ],
      lines: [
        { say: 'Your turn. In two hundred simulated runs of a claim, six runs gave a result as extreme as the real one. By the five percent rule, is the real result unusual? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Six divided by two hundred is 0.03, or three percent. That is less than five percent, so the result is unusual if the claim is true, and it is evidence against the claim.', show: 'q.answer' },
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
          items: ['A simulation repeats a situation many times as if a claim were true.', 'Count how often a result like ours turns up.', 'A result the simulation rarely gives is evidence against the claim.', 'A common rule: unusual means less than $5\\%$ of the runs.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A simulation repeats a situation many times, as if a claim were true.', show: 'sum.0' },
        { say: 'Then we count how often a result like ours turns up.', show: 'sum.1' },
        { say: 'A result the simulation rarely gives is evidence against the claim.', show: 'sum.2' },
        { say: 'And a common rule calls a result unusual when it happens in less than five percent of the runs. In the next lesson, we write very large and very small numbers in scientific notation. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
