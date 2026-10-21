import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { crowd, join, lasso, note, picks } from './lib/m9-10-figures.ts';

// A population of 40 people in four groups of 10, one group to a row, each row its own colour.
// Counting along the rows, left to right and top to bottom, gives the order of a list.
const GROUPS = [
  { id: 'g0', tone: 'adj' as const },
  { id: 'g1', tone: 'opp' as const },
  { id: 'g2', tone: 'good' as const },
  { id: 'g3', tone: 'hyp' as const },
];
// Simple random: any 8, by chance. Systematic: every 5th on the list (the 5th, 10th, … 40th).
// Stratified: 2 chosen at random from each group. Cluster: all of groups 2 and 4 (rows 1 and 3).
const RANDOM = [1, 7, 12, 16, 23, 28, 34, 36];
const SYSTEMATIC = [4, 9, 14, 19, 24, 29, 34, 39];
const STRATIFIED = [3, 8, 11, 17, 22, 25, 31, 36];

const pop = (id: string, extra: 'random' | 'systematic' | 'stratified' | 'cluster') =>
  figure(
    id,
    [
      join(
        crowd({ count: 40, cols: 10, groups: GROUPS, groupOf: (i) => `g${Math.floor(i / 10)}` }),
        ...[0, 1, 2, 3].map((r) => note({ id: `name${r}`, at: [-4.4, -r], tex: `\\small\\text{Group ${r + 1}}`, place: 'right', group: 'names' })),
        extra === 'random' ? picks({ id: 'pick', which: RANDOM, cols: 10 }) : extra === 'systematic' ? picks({ id: 'pick', which: SYSTEMATIC, cols: 10 }) : extra === 'stratified' ? picks({ id: 'pick', which: STRATIFIED, cols: 10 }) : join(lasso({ id: 'c1', c: [4.5, -1], rx: 5.0, ry: 0.62 }), lasso({ id: 'c3', c: [4.5, -3], rx: 5.0, ry: 0.62 })),
      ),
    ],
    380,
  );

const BASE = (id: string) => [`${id}.g0`, `${id}.g1`, `${id}.g2`, `${id}.g3`, `${id}.names`];

const video: Explainer = {
  id: 'm9-10-2-b',
  lessonId: 'm9-10-2',
  title: 'Populations and Samples, Part 2: Four Sampling Methods',
  thumbnailTitle: 'Four Sampling Methods',
  thumbnail: 'st',
  summary:
    'Four ways to choose a sample. Simple random: every member has the same chance, like drawing names from a hat. Systematic: choose from a list or a line at a regular interval, such as every 5th person, or every 20th customer through a store’s door. Stratified: split the population into groups and choose at random from every group, in proportion to its size. Cluster: split the population into groups, choose some whole groups at random, and survey everyone in them. Stratified takes some people from every group; cluster takes all the people from some groups.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 2', title: 'Four Sampling Methods', subtitle: 'Random, systematic, stratified and cluster' }],
      lines: [
        { say: 'Once you decide to use a sample, you have to choose who will be in it. There are several ways to do that.', show: 'title' },
        { say: 'In this video, you will learn four sampling methods that use chance or a fair rule to choose: simple random, systematic, stratified and cluster.' },
      ],
    },
    {
      chapter: 'Simple random',
      layout: 'split',
      leftWidth: 640,
      left: [pop('sr', 'random')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Simple random sample', md: '**Every** member has the **same chance** of being chosen, like drawing names from a hat.' }],
      lines: [
        { say: 'Here is a population of forty people, in four groups of ten. Each group has its own colour.', show: BASE('sr') },
        { say: 'In a simple random sample, every member has the same chance of being chosen. It is like writing every name on a slip of paper, mixing the slips in a hat, and drawing eight.', show: ['def', 'sr.pick'], focus: 'sr.pick' },
        { say: 'Chance decides who is picked, so nobody’s opinion can creep into the choice. Some groups may get more people than others, just by luck.' },
      ],
    },
    {
      chapter: 'Systematic',
      layout: 'split',
      leftWidth: 640,
      left: [pop('sy', 'systematic')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Systematic sample', md: 'Choose from a list or a line at a **regular interval**, such as **every 5th** person.' }],
      lines: [
        { say: 'In a systematic sample, you choose from a list or a line at a regular interval.', show: [...BASE('sy'), 'def'] },
        { say: 'Count along the rows, like reading a list. Choose the fifth person, then the tenth, the fifteenth, and so on, all the way to the fortieth. That is every fifth person, so two in each row of ten.', show: 'sy.pick', focus: 'sy.pick' },
        { say: 'Here is an example. A grocery store surveys every twentieth customer who walks through the door: the twentieth, the fortieth, the sixtieth, and so on. Customers are chosen at a regular interval, so it is a systematic sample.' },
      ],
    },
    {
      chapter: 'Stratified',
      layout: 'split',
      leftWidth: 640,
      left: [pop('sf', 'stratified')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Stratified sample', md: 'Split the population into **groups**, then choose at random from **each** group, in proportion to its size.' }],
      lines: [
        { say: 'In a stratified sample, you split the population into groups first, such as age groups. Then you choose at random from each group.', show: [...BASE('sf'), 'def'] },
        { say: 'Here, two people are chosen at random from every group. So every group is sure to be in the sample.', show: 'sf.pick', focus: 'sf.pick' },
        { say: 'The groups here are the same size, so each gets the same number. When the groups are different sizes, a bigger group gets more people. You will work that out in a later part.' },
      ],
    },
    {
      chapter: 'Cluster',
      layout: 'split',
      leftWidth: 640,
      left: [pop('cl', 'cluster')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Cluster sample', md: 'Split the population into groups, choose **some whole groups** at random, and survey **everyone** in them.' }],
      lines: [
        { say: 'In a cluster sample, you also split the population into groups, such as classes at a school. But then you choose some whole groups at random.', show: [...BASE('cl'), 'def'] },
        { say: 'Here, groups two and four were chosen. Everyone in those two groups is surveyed, and nobody in the other groups is.', show: ['cl.c1', 'cl.c3'], focus: ['cl.c1', 'cl.c3'] },
        { say: 'A cluster sample is quick, because the people in each group are together, but the groups that are left out are not heard at all.' },
      ],
    },
    {
      chapter: 'Stratified or cluster?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Stratified or cluster?', md: '**Stratified:** **some** people from **every** group. **Cluster:** **all** the people from **some** groups.' }],
      lines: [
        { say: 'Stratified and cluster samples are easy to mix up, because both start by splitting the population into groups.', show: 'tip' },
        { say: 'Here is how to remember the difference. Stratified takes some people from every group. Cluster takes all the people from some groups.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A coach lists all $120$ members of a sports club in alphabetical order, picks one of the first $10$ names at random, and then chooses every $10$th name after it. Which sampling method is this?',
          choices: ['Simple random sample', 'Systematic sample', 'Stratified sample', 'Cluster sample'],
          answer: 1,
          working: 'The names are chosen from a list at a regular interval, every $10$th name, so it is a **systematic** sample.',
        },
      ],
      lines: [
        { say: 'Your turn. A coach lists all one hundred twenty members of a sports club in alphabetical order, picks one of the first ten names at random, and then chooses every tenth name after it. Which sampling method is this? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is B, a systematic sample. The names are chosen from a list at a regular interval. Choice C would take some members from every group, such as every age group.', show: 'q.answer' },
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
            '**Simple random:** everyone has the same chance, like names from a hat.',
            '**Systematic:** choose at a regular interval from a list or a line.',
            '**Stratified:** some people chosen at random from **every** group.',
            '**Cluster:** **all** the people in some groups chosen at random.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a simple random sample, everyone has the same chance, like names from a hat.', show: 'sum.0' },
        { say: 'In a systematic sample, you choose at a regular interval from a list or a line.', show: 'sum.1' },
        { say: 'In a stratified sample, some people are chosen at random from every group.', show: 'sum.2' },
        { say: 'And in a cluster sample, all the people in some groups are chosen. In the next part, you will meet two methods that are often biased, and learn what makes a sample representative. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
