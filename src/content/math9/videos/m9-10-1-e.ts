import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { crowd, join, lasso, note, picks } from './lib/m9-10-figures.ts';

// A city of 60 people, 12 to a row. The 8 gym members (green) are together at the bottom left:
// columns 0 to 3 of the bottom two rows.
const GYM = new Set([36, 37, 38, 39, 48, 49, 50, 51]);
// A random sample of 12 from the whole city; 2 of them happen to be gym members.
const RANDOM = [3, 6, 10, 14, 19, 25, 28, 33, 39, 43, 49, 58];

const city = (id: string) =>
  figure(
    id,
    [
      join(
        crowd({ count: 60, cols: 12, groups: [{ id: 'others', tone: 'adj' }, { id: 'gym', tone: 'good' }], groupOf: (i) => (GYM.has(i) ? 'gym' : 'others') }),
        lasso({ id: 'ask', c: [1.5, -3.5], rx: 2.3, ry: 1.2, tone: 'bad' }),
        picks({ id: 'rand', which: RANDOM, cols: 12, tone: 'theta' }),
        note({ id: 'key', at: [-0.3, -5.3], tex: '\\good{\\bullet}\\ \\text{gym member}\\quad \\adj{\\bullet}\\ \\text{everyone else}', place: 'right' }),
      ),
    ],
    430,
  );

const PEOPLE = (id: string) => [`${id}.others`, `${id}.gym`, `${id}.key`];

const video: Explainer = {
  id: 'm9-10-1-e',
  lessonId: 'm9-10-1',
  title: 'Factors Affecting Data Collection, Part 5: Fixing a Plan',
  thumbnailTitle: 'Fixing a Plan',
  thumbnail: 'gy',
  summary:
    'To improve a data-collection plan, first name the problem, then choose a change that removes that exact problem. A gym that surveys its own members to find out whether people in the city exercise enough gets biased results, so the fix must change who is asked: survey residents chosen at random from all over the city. Adding more questions, asking more people the same way or drawing a fancier graph does not fix how the data was collected.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 5', title: 'Fixing a Plan', subtitle: 'Name the problem, then change that part' }],
      lines: [
        { say: 'You can now spot bias, leading questions, privacy problems, bad timing and more. The next step is to fix them.', show: 'title' },
        { say: 'In this video, you will learn a simple way to improve a plan for collecting data, and see why some fixes do not really fix anything.' },
      ],
    },
    {
      chapter: 'Two steps',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'key',
          tone: 'key',
          title: 'Fixing a plan',
          md: '**First**, name the problem: which factor is it? **Then** choose a change that removes **that exact** problem.',
        },
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Fixes that do not fix',
          md: 'Adding more questions, asking more people the same way, or drawing a fancier graph does **not** fix how the data was collected.',
        },
      ],
      lines: [
        { say: 'Fixing a plan takes two steps. First, name the problem. Which of the factors is it: bias, wording, ethics, cost, time, timing, privacy, or cultural sensitivity?', show: 'key' },
        { say: 'Second, choose a change that removes that exact problem. If the problem is who was asked, change who is asked. If the problem is the wording, change the words.' },
        { say: 'Be careful. Adding more questions, asking more people in the same way, or drawing a fancier graph does not fix how the data was collected. The problem is still there.', show: 'oops' },
      ],
    },
    {
      chapter: 'The gym survey',
      layout: 'split',
      leftWidth: 620,
      left: [city('gy')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'A gym wants to know if people in its city **exercise enough**. It surveys **its own members**.' }],
      lines: [
        { say: 'Here is a plan to fix. A gym wants to know whether people in its city exercise enough. So it surveys its own members.', show: [...PEOPLE('gy'), 'q', 'gy.ask'], focus: 'gy.ask' },
        { say: 'Step one: name the problem. Gym members exercise more than most people. So the results will make the city look fitter than it really is. The results are biased.' },
        { say: 'Step two: the problem is who was asked, so the fix must change who is asked.' },
        { say: 'Survey residents chosen at random from all over the city. Now gym members and everyone else have the same chance to be asked.', show: 'gy.rand', focus: 'gy.rand' },
      ],
    },
    {
      chapter: 'More plans to fix',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Plan', 'Problem', 'Fix'],
          rows: [
            ['“Don’t you agree our park is dirty?”', 'Use of language', '“How clean is the park: very, fairly, or not very?”'],
            ['Asks for each person’s name and address', 'Privacy', 'Leave them out: make it anonymous'],
            ['Asks parents about bus safety the day after a bus crash is in the news', 'Timing', 'Ask at a calmer time'],
          ],
        },
      ],
      lines: [
        { say: 'Let’s practise on three more plans. Name the problem, then fix that part.', show: 't.0' },
        { say: 'Don’t you agree our park is dirty? That is a leading question, a problem with the use of language. So change the words: how clean is the park, very, fairly, or not very?', focus: 't.0' },
        { say: 'A survey that asks for each person’s name and home address, when it does not need them, is a privacy problem. Leave them out and make it anonymous.', show: 't.1', focus: 't.1' },
        { say: 'Asking parents about bus safety the day after a bus crash is in the news is a timing problem. Ask at a calmer time instead.', show: 't.2', focus: 't.2' },
        { say: 'Each fix changes exactly the part that caused the problem.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A music store wants to know which kind of music teenagers in its city like best. It surveys teenagers as they leave a rock concert. Which change best fixes the plan?',
          choices: [
            'Add more questions to the survey.',
            'Show the results in a colourful graph.',
            'Survey twice as many people at the concert.',
            'Survey teenagers chosen at random from all over the city.',
          ],
          answer: 3,
          working: 'The problem is bias: teenagers leaving a rock concert are much more likely to choose rock. The fix must change **who** is asked, so choose teenagers at random from the whole city.',
        },
      ],
      lines: [
        { say: 'Your turn. A music store wants to know which kind of music teenagers in its city like best. It surveys teenagers as they leave a rock concert. Which change best fixes the plan? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D. The problem is bias, so the fix must change who is asked. Choice C asks more people, but they are all still leaving a rock concert, so the sample is still biased.', show: 'q.answer' },
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
            'To fix a plan, first **name the problem**, then change **the part** that causes it.',
            'A biased sample needs a change in **who** is asked: choose at random from the whole group.',
            'A leading question needs new **words**; a privacy problem needs **less** personal information; bad timing needs a **fairer time**.',
            'More questions, more of the same people, or a fancier graph fix nothing.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To fix a plan, first name the problem, then change the part that causes it.', show: 'sum.0' },
        { say: 'A sample that is biased needs a change in who is asked. Choose at random from the whole group.', show: 'sum.1' },
        { say: 'A leading question needs new words. A privacy problem needs less personal information. And bad timing needs a fairer time.', show: 'sum.2' },
        { say: 'More questions, more of the same people, or a fancier graph fix nothing. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
