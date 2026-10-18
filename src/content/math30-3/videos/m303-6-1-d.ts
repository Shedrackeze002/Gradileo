import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';
import { drop, meanLevel } from './lib/m303-6-figures.ts';

// Four module exam marks, the fifth that is needed, and the target mean of 75%.
const MARKS = [68, 82, 71, 77, 77];
const exams = (id: string) =>
  figure(id, [
    barGraph({ categories: ['1', '2', '3', '4', '5'], values: MARKS, max: 100, step: 20, height: 6, titles: { x: 'Exam', y: 'Mark (\\%)' } }),
    meanLevel({ values: MARKS, mean: 75, max: 100, height: 6, label: '\\text{target } 75', room: 3 }),
  ]);

const video: Explainer = {
  id: 'm303-6-1-d',
  lessonId: 'm303-6-1',
  title: 'Mean, Median and Mode, Part 4: Finding a Missing Value',
  thumbnailTitle: 'Finding a Missing Value',
  thumbnail: 'ex',
  summary: 'Working backwards from a target mean with totals: to average at least 75% on 5 exams after marks of 68%, 82%, 71% and 77%, the total needed is 75 × 5 = 375, the total so far is 298, so the last exam needs at least 77%; and why comparing the mean of the first four marks with 75 does not work.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics · Part 4', title: 'Finding a Missing Value', subtitle: 'Working backwards from a target mean' }],
      lines: [
        { say: 'Sometimes you know the mean you need, and you want to find the last value that gets you there. What mark do I need on the final test? How many sales do I need this week?', show: 'title' },
        { say: 'In this video, you will work backwards from a target mean, using totals.' },
      ],
    },
    {
      chapter: 'Work with totals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Working backwards from a mean', md: '**Total needed** $=$ target mean $\\times$ number of values.\n\n**Last value** $=$ total needed $-$ total so far.' },
      ],
      lines: [
        { say: 'The mean is the total divided by the number of values. So turn it around: the total you need is the target mean times the number of values.', show: 'key' },
        { say: 'Then the last value is the total you need, minus the total you have so far.' },
      ],
    },
    {
      chapter: 'The last module exam',
      layout: 'split',
      leftWidth: 560,
      left: [drop(exams('ex'), ['v0', 'v1', 'v2', 'v3', 'v4', 'r0', 'r1', 'r2', 'r3', 'r4', 'ups', 'gaps'])],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A mean of at least $75\\%$ on $5$ exams is needed. The first four marks are $68\\%, 82\\%, 71\\%$ and $77\\%$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{needed: } 75 \\times 5 = 375', '\\text{so far: } 68 + 82 + 71 + 77 = 298', '\\text{last: } 375 - 298 = 77'] },
      ],
      lines: [
        { say: 'Jaxon is an apprentice who needs a mean of at least 75 percent on five module exams to pass the training period. The first four marks are 68, 82, 71 and 77 percent. What is the lowest mark Jaxon can get on the last exam?', show: ['q', 'ex.scale', 'ex.b0', 'ex.b1', 'ex.b2', 'ex.b3', 'ex.mean'] },
        { say: 'First, the total needed. Five exams at a mean of 75 is 75 times five: a total of 375 percentage points.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, the total so far. 68 plus 82 plus 71 plus 77 is 298.', show: 'm.1', focus: 'm.1' },
        { say: 'So the last exam must make up the difference: 375 minus 298, which is 77. Jaxon needs at least 77 percent on the last exam.', show: ['m.2', 'ex.b4'], focus: ['m.2', 'ex.b4'] },
      ],
    },
    {
      chapter: 'Check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(298 + 77) \\div 5 = 375 \\div 5 = 75 \\;\\checkmark'] },
        { kind: 'text', id: 't', size: 'md', md: 'Any mark of $77\\%$ or more gives a mean of at least $75\\%$.' },
      ],
      lines: [
        { say: 'Check it. With 77 on the last exam, the five marks add to 298 plus 77, which is 375. And 375 divided by five is exactly 75.', show: 'm', focus: 'm' },
        { say: 'Any higher mark gives a mean above 75, so the lowest mark that works is 77 percent.', show: 't' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Comparing the mean so far with the target', md: 'The first four marks have a mean of $298 \\div 4 = 74.5$, just under $75$. That does **not** mean a mark a little over $75$ is enough. Work with totals.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{last mark } 76: \\; (298 + 76) \\div 5 = 374 \\div 5 = \\bad{74.8}'] },
      ],
      lines: [
        { say: 'A common mistake is to find the mean of the first four marks, and compare it with the target. That mean is 298 divided by four, which is 74.5, just under 75.', show: 'oops' },
        { say: 'So it is tempting to think that any mark a little over 75 will pull the mean up to 75. But try 76. The total is 374, and 374 divided by five is only 74.8. Not enough.', show: 'm', focus: 'm' },
        { say: 'The total of all five values must be 75 times five, so always work with totals.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A salesperson needs a mean of at least $20$ sales a week over $4$ weeks. The first $3$ weeks had $18, 23$ and $15$ sales. How many sales are needed in week $4$?',
          choices: ['$20$', '$19$', '$56$', '$24$'],
          answer: 3,
          working: 'Total needed: $20 \\times 4 = 80$. So far: $18 + 23 + 15 = 56$. Week $4$: $80 - 56 = 24$ sales.',
        },
      ],
      lines: [
        { say: 'Your turn. A salesperson needs a mean of at least 20 sales a week over four weeks. The first three weeks had 18, 23 and 15 sales. How many sales are needed in week four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Four weeks at a mean of 20 is a total of 80 sales. The first three weeks add to 56, and 80 minus 56 is 24. Choice A is just the target mean. It would work only if the first three weeks were exactly on target.', show: 'q.answer' },
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
          items: ['Total needed $=$ target mean $\\times$ number of values.', 'Last value $=$ total needed $-$ total so far.', 'Check by finding the new mean.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To reach a target mean, first find the total needed: the target mean times the number of values.', show: 'sum.0' },
        { say: 'The last value is the total needed, minus the total so far.', show: 'sum.1' },
        { say: 'And check by finding the new mean. In the next lesson, we look at means where some values count more than others. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
