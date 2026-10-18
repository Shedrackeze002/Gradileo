import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { crowd } from './lib/m302-8-figures.ts';

/** Two samples of 8 from the same population of 60: one random, one from a single corner. */
const samples = figure(
  'c',
  [
    crowd({ name: 'r', cols: 10, rows: 6, picks: [[1, 0], [6, 1], [3, 2], [8, 2], [0, 4], [5, 3], [9, 5], [2, 5]], title: '\\text{Random sample}', tone: 'good' }),
    crowd({ name: 'k', cols: 10, rows: 6, at: [13, 0], picks: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2]], title: '\\text{One corner only}', tone: 'bad' }),
  ],
  300,
);

const video: Explainer = {
  id: 'm302-8-2-b',
  lessonId: 'm302-8-2',
  title: 'The Mathematics Research Project, Part 2: Collecting Data',
  thumbnailTitle: 'Collecting Data',
  thumbnail: 'c',
  summary: 'Primary data (collected by you) and secondary data (collected by someone else), quantitative and qualitative data, and populations and samples: why a random sample, where everyone has the same chance of being chosen, is more likely to represent the population than a sample from one corner of it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Puzzles, Games and the Research Project · Part 2', title: 'Collecting Data', subtitle: 'Kinds of data, populations and samples' }],
      lines: [
        { say: 'Once you have a research question, you need data to answer it. Where those data come from, and who they come from, decides whether your answer can be trusted.', show: 'title' },
        { say: 'In this video, you will meet the kinds of data a project can use, and see how to choose a fair sample.' },
      ],
    },
    {
      chapter: 'Primary and secondary data',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Primary data** are collected by you: surveys, counts, measurements or experiments.',
            '**Secondary data** were collected by someone else: tables from a government website, or results in a published study.',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Using secondary data', md: 'Say where the data came from, and check how and when they were collected.' },
      ],
      lines: [
        { say: 'Primary data are data you collect yourself: through a survey, by counting, by measuring, or with an experiment. You control exactly how they are collected.', show: 'b.0' },
        { say: 'Secondary data were collected by someone else, such as tables of statistics on a government website, or the results of a published study. They can cover far more people than you could ever ask yourself.', show: 'b.1' },
        { say: 'If you use secondary data, say where they came from, and check how and when they were collected, so that you know what they really measure.', show: 'tip' },
      ],
    },
    {
      chapter: 'Quantitative and qualitative',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Quantitative** data are numbers you measure or count: hours of sleep, kilometres travelled.', '**Qualitative** data are categories: a favourite sport, a way of getting to school.'],
        },
      ],
      lines: [
        { say: 'Data can also be quantitative or qualitative. Quantitative data are numbers that you measure or count, such as hours of sleep, or kilometres travelled.', show: 'b.0' },
        { say: 'Qualitative data are categories, such as a favourite sport, or the way someone gets to school.', show: 'b.1' },
        { say: 'Your research question decides which kind you need. The screen-time question from the last part needs quantitative data: hours of screen time, and hours of sleep.' },
      ],
    },
    {
      chapter: 'Populations and samples',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Population and sample', md: 'The **population** is everyone you want to know about. A **sample** is the part of it you actually study. In a **random sample**, every member of the population has the same chance of being chosen.' },
      ],
      lines: [
        { say: 'The population is everyone your question is about: for example, all the Grade 12 students at your school.', show: 'def' },
        { say: 'Often you cannot ask everyone, so you study a sample: the part of the population you actually collect data from.' },
        { say: 'In a random sample, every member of the population has the same chance of being chosen. For example, you could number the names on a list of all the students, and let a random number generator choose which ones to ask.' },
      ],
    },
    {
      chapter: 'Why random?',
      layout: 'center',
      main: [samples, { kind: 'text', id: 't', size: 'md', md: 'A random sample is more likely to **represent** the population.' }],
      lines: [
        { say: 'Here are two samples of eight people from the same population of sixty.', show: ['c.r-pop', 'c.k-pop'] },
        { say: 'On the left is a random sample. The eight are spread across the whole population, so they are likely to represent it.', show: ['c.r-pick', 'c.r-title'], focus: 'c.r-pick' },
        { say: 'On the right, people were chosen only from one corner, perhaps because they were the easiest to reach. If the people in that corner differ from the rest, say they all play on one team, or sit in one class, the sample will not represent the population.', show: ['c.k-pick', 'c.k-title'], focus: 'c.k-pick' },
        { say: 'That is why a random sample is more likely to represent the population: no group is favoured over any other.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A student uses a table of average monthly temperatures from a national weather service’s website. What kind of data is this?',
          choices: ['Primary and qualitative', 'Secondary and quantitative', 'Primary and quantitative', 'Secondary and qualitative'],
          answer: 1,
          working: 'The weather service collected the data, not the student, so they are secondary. Temperatures are numbers, so they are quantitative.',
        },
      ],
      lines: [
        { say: 'Your turn. A student uses a table of average monthly temperatures from a national weather service’s website. What kind of data is this? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Someone else, the weather service, collected the data, so they are secondary, and temperatures are numbers, so they are quantitative. Choice C would be right only if the student had measured the temperatures.', show: 'q.answer' },
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
            '**Primary** data are collected by you; **secondary** data by someone else.',
            '**Quantitative** data are numbers; **qualitative** data are categories.',
            'In a **random sample**, everyone has the same chance of being chosen, so it is more likely to represent the population.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Primary data are collected by you, and secondary data by someone else.', show: 'sum.0' },
        { say: 'Quantitative data are numbers, and qualitative data are categories.', show: 'sum.1' },
        { say: 'And in a random sample, everyone has the same chance of being chosen, so it is more likely to represent the population. In the next part, you will learn to spot bias: the ways that collecting data can push the results in one direction. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
