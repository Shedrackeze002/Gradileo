import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-10-1-d',
  lessonId: 'm9-10-1',
  title: 'Factors Affecting Data Collection, Part 4: Cost, Time and Timing',
  thumbnailTitle: 'Cost, Time and Timing',
  thumbnail: false,
  summary:
    'Cost: some plans cost far more than the project can pay; mailing a survey to all 2,000,000 homes in a region at $3 a home would cost $6,000,000, while a random sample of 300 homes costs $900. Time: some plans take far too long to finish. Timing: when the data is collected can change the answers; asking parents whether school buses are safe right after a news story about a bus accident is a timing problem, fixed by surveying at a calmer time or at several times.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 4', title: 'Cost, Time and Timing', subtitle: 'Affordable, finished in time, and fair' }],
      lines: [
        { say: 'Some plans for collecting data sound great, until you add up what they cost, count how long they take, or notice when they happen.', show: 'title' },
        { say: 'In this video, you will learn about three more factors, cost, time and timing, and how to spot each problem.' },
      ],
    },
    {
      chapter: 'Three factors',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Cost:** some plans cost far more money than the project can pay.',
            '**Time:** some plans take far too long to finish.',
            '**Timing:** *when* the data is collected can change the answers.',
          ],
        },
      ],
      lines: [
        { say: 'Cost. Some plans cost far more money than the project can pay, for printing, postage or travel.', show: 'b.0', focus: 'b.0' },
        { say: 'Time. Some plans take far too long. Interviewing every person in a big city, one at a time, could take years, but a class project might have only a few weeks.', show: 'b.1', focus: 'b.1' },
        { say: 'Timing. When the data is collected can change the answers people give. The same question can get different answers on different days.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Too costly',
      layout: 'center',
      main: [
        {
          kind: 'text',
          id: 'q',
          size: 'md',
          md: 'A class wants to know what everyone in its region thinks about daylight saving time. It plans to mail a survey, with a stamped return envelope, to **every home**. Suppose there are 2,000,000 homes, and printing and postage cost \\$3 a home.',
        },
        {
          kind: 'table',
          id: 't',
          head: ['Plan', 'Cost'],
          rows: [
            ['Every home: 2,000,000 × \\$3', '**\\$6,000,000**'],
            ['A random sample of 300 homes: 300 × \\$3', '**\\$900**'],
          ],
        },
      ],
      lines: [
        { say: 'A class wants to know what everyone in its region thinks about daylight saving time, the custom of moving the clocks forward in spring.', show: 'q' },
        { say: 'It plans to mail a survey, with a stamped return envelope, to every home. Suppose there are two million homes, and printing and postage cost three dollars a home.' },
        { say: 'Two million times three dollars is six million dollars. That is far more than any class could pay. So this is a cost problem.', show: 't.0', focus: 't.0' },
        { say: 'The fix is a random sample. Mailing to three hundred homes chosen at random costs three hundred times three dollars, which is nine hundred dollars. That still costs money, but far less.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Bad timing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'bad', tone: 'mistake', title: 'The plan', md: 'Right after a news story about a school bus accident, a group asks parents: “Are school buses safe?”' },
        { kind: 'callout', id: 'fix', tone: 'key', title: 'The fix', md: 'Survey at a **calmer time**, or at **several different times**.' },
      ],
      lines: [
        { say: 'Here is a plan with a different problem. Right after a news story about a school bus accident, a group asks parents whether school buses are safe.', show: 'bad' },
        { say: 'The news is fresh in the parents’ minds. Many of them may answer differently than they would on an ordinary day, even though buses are no less safe than they were the week before.', focus: 'bad' },
        { say: 'That is a timing problem. The answers depend on when the question was asked.' },
        { say: 'To fix it, survey at a calmer time, or at several different times, so one day’s news does not decide the results.', show: 'fix', focus: 'fix' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A town surveys residents chosen at random about building a new outdoor pool. The survey is done on the hottest day of the summer. Which factor is the biggest problem?',
          choices: ['Timing', 'Privacy', 'Cultural sensitivity', 'Cost'],
          answer: 0,
          working: 'On the hottest day of the summer, people are more likely to want a pool than on an ordinary day, so **when** the survey is done changes the answers. Choosing residents at random keeps the cost low.',
        },
      ],
      lines: [
        { say: 'Your turn. A town surveys residents chosen at random about building a new outdoor pool. The survey is done on the hottest day of the summer. Which factor is the biggest problem? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, timing. On the hottest day of the summer, people are more likely to want a pool than usual. Choice D, cost, is not the problem: a random sample of residents is affordable.', show: 'q.answer' },
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
            '**Cost:** a plan must be affordable. A random sample costs far less than asking everyone.',
            '**Time:** a plan must finish in the time you have.',
            '**Timing:** collect data at a fair time, not right after an event that sways the answers.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Cost: a plan must be affordable. A random sample costs far less than asking everyone.', show: 'sum.0' },
        { say: 'Time: a plan must finish in the time you have.', show: 'sum.1' },
        { say: 'And timing: collect data at a fair time, not right after an event that sways the answers. In the next part, you will put it all together, and fix plans that have problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
