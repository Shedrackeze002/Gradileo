import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { crowd, join, lasso, note, picks } from './lib/m9-10-figures.ts';

// A town of 60 people, 12 to a row. The 10 hockey fans (orange) stand together at the top right:
// columns 7 to 11 of the top two rows.
const FANS = new Set([7, 8, 9, 10, 11, 19, 20, 21, 22, 23]);
// A random sample of 12: spread over the whole town, and 2 of them are fans (2 of 12 is the same
// fraction as 10 of 60).
const RANDOM = [2, 9, 13, 18, 22, 27, 31, 36, 40, 45, 51, 57];

const town = (id: string) =>
  figure(
    id,
    [
      join(
        crowd({ count: 60, cols: 12, groups: [{ id: 'others', tone: 'adj' }, { id: 'fans', tone: 'opp' }], groupOf: (i) => (FANS.has(i) ? 'fans' : 'others') }),
        lasso({ id: 'game', c: [9, -0.5], rx: 2.6, ry: 1.2, tone: 'bad', label: '\\text{fans leaving the game}', labelAt: [9, 0.7] }),
        picks({ id: 'rand', which: RANDOM, cols: 12, tone: 'theta' }),
        note({ id: 'key', at: [-0.3, -5.1], tex: '\\opp{\\bullet}\\ \\text{hockey fan}\\qquad \\adj{\\bullet}\\ \\text{everyone else}', place: 'right' }),
      ),
    ],
    430,
  );

const PEOPLE = (id: string) => [`${id}.others`, `${id}.fans`, `${id}.key`];

const video: Explainer = {
  id: 'm9-10-1',
  lessonId: 'm9-10-1',
  title: 'Factors Affecting Data Collection, Part 1: Bias',
  thumbnailTitle: 'Bias',
  thumbnail: 'tw',
  summary:
    'Seven factors can affect how data is collected: bias, use of language, ethics, cost, time and timing, privacy, and cultural sensitivity. Bias happens when the way data is collected favours some answers or some people over others, so the data does not represent the whole group. Surveying only fans leaving a hockey game about a new arena is biased; choosing people at random from all over the town fixes it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 1', title: 'Bias', subtitle: 'When the method favours some answers' }],
      lines: [
        { say: 'Surveys and studies help people make decisions about schools, parks and products. But data is only as good as the way it was collected.', show: 'title' },
        { say: 'A survey can give misleading results long before anyone draws a graph. In this video, you will meet the factors that can affect data collection, starting with bias.' },
      ],
    },
    {
      chapter: 'Seven factors',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Seven factors can affect how data is collected:' },
        { kind: 'bullets', id: 'b', items: ['**Bias**', '**Use of language**', '**Ethics**', '**Cost**', '**Time and timing**', '**Privacy**', '**Cultural sensitivity**'] },
      ],
      lines: [
        { say: 'Here are seven factors that can affect how data is collected. You will look at each of them in this lesson.', show: 't' },
        { say: 'They are bias, the use of language, ethics, cost, time and timing, privacy, and cultural sensitivity.', show: ['b.0', 'b.1', 'b.2', 'b.3', 'b.4', 'b.5', 'b.6'] },
        { say: 'Some of them are about getting fair, accurate answers. Others are about treating people fairly, and about what a plan costs and when it happens. Let’s start with bias.', focus: 'b.0' },
      ],
    },
    {
      chapter: 'What bias means',
      layout: 'split',
      leftWidth: 620,
      left: [town('tw')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Bias',
          md: '**Bias** happens when the way data is collected **favours** some answers or some people over others. Biased data does not represent the whole group.',
        },
      ],
      lines: [
        { say: 'Picture a town of sixty people. Each dot is one person. The orange dots are hockey fans, and the blue dots are everyone else.', show: PEOPLE('tw') },
        { say: 'Suppose you want to know what the whole town thinks about something. The whole group you want to learn about is called the population.' },
        { say: 'Bias happens when the way data is collected favours some answers, or some people, over others. Then the data does not represent the whole group.', show: 'def' },
        { say: 'Data that is biased can look convincing, with lots of answers and neat graphs, and still give the wrong picture.' },
      ],
    },
    {
      chapter: 'A biased survey',
      layout: 'split',
      leftWidth: 620,
      left: [town('bs')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Does the town want a new **hockey arena**? A group asks only **fans leaving a hockey game**.' }],
      lines: [
        { say: 'Here is a real kind of mistake. A group wants to know whether the people in the town want a new hockey arena.', show: [...PEOPLE('bs'), 'q'] },
        { say: 'To save effort, they survey only the fans leaving a hockey game. That is this corner of the town.', show: 'bs.game', focus: 'bs.game' },
        { say: 'Hockey fans are much more likely than other people to want an arena. So the results will favour yes.', focus: 'bs.fans' },
        { say: 'Those results do not show what the whole town thinks. Most of the town was never asked. The survey is biased.' },
      ],
    },
    {
      chapter: 'A fair survey',
      layout: 'split',
      leftWidth: 620,
      left: [town('fs')],
      right: [{ kind: 'text', id: 'fix', size: 'md', md: '**The fix:** survey people chosen **at random** from **all over** the town. Then fans and everyone else have the same chance to be asked.' }],
      lines: [
        { say: 'How can the group fix it? Choose the people to survey at random, from all over the town, like drawing names from a hat.', show: [...PEOPLE('fs'), 'fs.rand', 'fix'], focus: 'fs.rand' },
        { say: 'Now every person has the same chance to be asked. Look at the yellow rings: they are spread across the whole town.' },
        { say: 'Two of the twelve people chosen are fans. That is about the same share as in the whole town, where ten of the sixty people are fans.' },
        { say: 'So the answers from this sample give a much fairer picture of what the whole town thinks.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A town wants to know what its residents think about building a new library. Which survey plan would give **biased** results?',
          choices: [
            'Survey only people leaving the old library.',
            'Survey residents chosen at random from a list of all residents.',
            'Survey residents chosen at random from every neighbourhood.',
            'Ask every resident in the town.',
          ],
          answer: 0,
          working: 'People leaving the library use it a lot, so they are more likely to want a new one than other residents are. The other plans give every resident a fair chance to be asked.',
        },
      ],
      lines: [
        { say: 'Your turn. A town wants to know what its residents think about building a new library. Which survey plan would give biased results? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is A. People leaving the library use it a lot, so they are more likely to want a new one. Choice B is fair: choosing at random from a list of all residents gives everyone the same chance.', show: 'q.answer' },
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
            'Seven factors affect data collection: bias, use of language, ethics, cost, time and timing, privacy, and cultural sensitivity.',
            '**Bias:** the way data is collected favours some answers or some people, so it does not represent the whole group.',
            'Surveying only the people most likely to say yes gives biased results.',
            'Choosing people at random from the whole group fixes it.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Seven factors affect data collection: bias, use of language, ethics, cost, time and timing, privacy, and cultural sensitivity.', show: 'sum.0' },
        { say: 'Bias happens when the way data is collected favours some answers or some people, so the data does not represent the whole group.', show: 'sum.1' },
        { say: 'Surveying only the people most likely to say yes gives results that are biased.', show: 'sum.2' },
        { say: 'And choosing people at random from the whole group fixes it. In the next part, you will see how the words in a question can push people toward an answer. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
