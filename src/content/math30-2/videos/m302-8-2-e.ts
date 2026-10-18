import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { causes } from './lib/m302-8-figures.ts';

const rinks = figure('c', [causes({ top: 'Population of the town', left: 'Ice rinks', right: 'Pharmacies' })], 300);

const poll = figure(
  'n',
  [
    numberLine({
      min: 44,
      max: 64,
      step: 2,
      length: 13,
      spans: [{ id: 'ci', from: 50, to: 58, tone: 'theta' }],
      points: [{ id: 'p', value: 54, tex: '54\\%', tone: 'good' }],
    }),
  ],
  200,
);

const video: Explainer = {
  id: 'm302-8-2-e',
  lessonId: 'm302-8-2',
  title: 'The Mathematics Research Project, Part 5: Evaluating Claims',
  thumbnailTitle: 'Evaluating Claims',
  thumbnail: 'c',
  summary: 'Four questions to ask of any claim made from data: is the sample large enough and fair, is it correlation or cause, how precise is it, and is the graph misleading. Towns with more ice rinks have more pharmacies because both depend on population, and a poll result of 54% with a margin of error of 4 percentage points, 19 times out of 20, means the population percent is likely between 50% and 58%.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Puzzles, Games and the Research Project · Part 5', title: 'Evaluating Claims', subtitle: 'Questions to ask of any conclusion' }],
      lines: [
        { say: 'News stories, advertisements and research projects are full of claims based on data. Some are sound, and some go further than the data allow.', show: 'title' },
        { say: 'In this video, you will learn four questions to ask of any claim, including the claims in your own project.' },
      ],
    },
    {
      chapter: 'Four questions',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Is the sample large enough, and was it chosen fairly?', 'Correlation or cause?', 'How precise is it?', 'Is the graph misleading?'],
        },
      ],
      lines: [
        { say: 'A good presentation states what the data show, and also what they do not show. To decide, ask these four questions of any claim, including your own.' },
        { say: 'Is the sample large enough, and was it chosen fairly? A survey of five friends, or of fans leaving a hockey game, cannot speak for a whole town.', show: 'b.0' },
        { say: 'Is it correlation, or cause? Two variables can rise together without one causing the other.', show: 'b.1' },
        { say: 'How precise is it? A result from a sample comes with a margin of error.', show: 'b.2' },
        { say: 'And is the graph misleading? The next part looks at graphs that exaggerate.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Correlation or cause?',
      layout: 'center',
      main: [rinks, { kind: 'callout', id: 'key', tone: 'key', title: 'Correlation is not causation', md: 'Two variables can rise together because a third variable affects both.' }],
      lines: [
        { say: 'Towns with more ice rinks also have more pharmacies. Does building a rink bring in pharmacies?', show: ['c.left', 'c.right', 'c.link'], focus: 'c.link' },
        { say: 'No. Both depend on a third variable: the population of the town. Bigger towns have more of both.', show: ['c.top', 'c.a1', 'c.a2'], focus: ['c.top', 'c.a1', 'c.a2'] },
        { say: 'When two variables rise together, they are correlated. But correlation is not causation: a third variable can drive them both.', show: 'key' },
        { say: 'So in your own project, if you find a relationship, such as between screen time and sleep, say that the two are related, not that one causes the other.' },
      ],
    },
    {
      chapter: 'Margin of error',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'A poll result of 54%, with a margin of error of 4 percentage points, 19 times out of 20.' },
        poll,
        { kind: 'math', id: 'm', size: 'md', lines: ['54 - 4 = 50 \\qquad 54 + 4 = 58'] },
      ],
      lines: [
        { say: 'A poll finds that 54 percent of the people asked support a plan, with a margin of error of four percentage points, nineteen times out of twenty.', show: ['t', 'n.axis', 'n.p'], focus: 'n.p' },
        { say: 'That means the percent for the whole population is likely between 54 minus four, which is 50 percent, and 54 plus four, which is 58 percent.', show: ['n.ci', 'm'], focus: ['n.ci', 'm'] },
        { say: 'Nineteen times out of twenty means that if the poll were repeated many times, with new random samples, this method would capture the true percent in about nineteen polls out of every twenty.' },
        { say: 'Notice that 50 percent is in the range. So the poll cannot be sure that a majority supports the plan, and a headline saying that most people support it goes further than the data do.', focus: 'n.ci' },
      ],
    },
    {
      chapter: 'Your own project',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          check: true,
          items: [
            'Describe your sample and how it was chosen.',
            'State what the data show, **and** what they do not show.',
            'Say “related to”, not “causes”, for a relationship in your data.',
            'Give the margin of error for a result from a sample.',
          ],
        },
      ],
      lines: [
        { say: 'Turn the four questions on your own project. Describe your sample and how it was chosen, so that your audience can judge whether it is fair.', show: 'b.0' },
        { say: 'State what the data show, and also what they do not show: the limits of your sample, and anything you could not measure.', show: 'b.1' },
        { say: 'For a relationship in your data, say “related to”, not “causes”.', show: 'b.2' },
        { say: 'And when a result comes from a sample, give its margin of error if you know it.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A poll finds that $41\\%$ of voters support a plan, with a margin of error of $3$ percentage points, $19$ times out of $20$. Which range likely contains the percent for all voters?',
          choices: ['$41\\%$ to $44\\%$', '$39.77\\%$ to $42.23\\%$', '$38\\%$ to $44\\%$', '$35\\%$ to $47\\%$'],
          answer: 2,
          working: 'A margin of error of $3$ percentage points goes both ways: $41 - 3 = 38$ and $41 + 3 = 44$.',
        },
      ],
      lines: [
        { say: 'Your turn. A poll finds that 41 percent of voters support a plan, with a margin of error of three percentage points, nineteen times out of twenty. Which range likely contains the percent for all voters? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The margin of error is three percentage points either way: 41 minus three is 38, and 41 plus three is 44. Choice B takes three percent of 41, but a margin of error in percentage points is simply subtracted and added.', show: 'q.answer' },
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
          items: [
            'Ask: is the sample large and fair? Correlation or cause? How precise? Is the graph misleading?',
            'Correlation is not causation: a third variable can drive both.',
            'A margin of error gives the range that likely contains the population value.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Of any claim, ask: is the sample large enough and fair? Is it correlation or cause? How precise is it? And is the graph misleading?', show: 'sum.0' },
        { say: 'Correlation is not causation: a third variable can drive both.', show: 'sum.1' },
        { say: 'And a margin of error gives the range that likely contains the value for the whole population. In the next part, you will see how a graph can mislead, and how to present your own data honestly. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
