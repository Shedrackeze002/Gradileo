import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm9-10-3-c',
  lessonId: 'm9-10-3',
  title: 'Developing a Project Plan, Part 3: Choosing a Method',
  thumbnailTitle: 'Choosing a Method',
  thumbnail: false,
  summary:
    'Four ways to collect data: a survey or questionnaire for opinions, habits or choices; an experiment to test whether changing one thing changes another; observation to watch and count something as it happens; and existing data from records or a database for facts about the past. Dropping a ball from different heights is an experiment, counting vehicles at a crosswalk is observation, and finding how a town’s population has changed since 1950 uses existing records. Then think about the social issues and choose a population or a representative sample.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Data Analysis and Probability in Society · Part 3', title: 'Choosing a Method', subtitle: 'Ask, test, watch, or look it up' }],
      lines: [
        { say: 'Once you have a good question, you need a way to collect the data. Some questions need you to ask people. Others need you to test something, or to watch, or to look things up.', show: 'title' },
        { say: 'In this video, you will learn four ways to collect data, and how to choose the one that fits your question.' },
      ],
    },
    {
      chapter: 'Four methods',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Method', 'Use it for'],
          rows: [
            ['**Survey** or questionnaire', 'people’s opinions, habits or choices'],
            ['**Experiment**', 'testing whether changing one thing changes another'],
            ['**Observation**', 'watching and counting something as it happens'],
            ['**Existing data** from records or a database', 'facts about the past'],
          ],
        },
      ],
      lines: [
        { say: 'A survey, or questionnaire, asks people questions. Use it for people’s opinions, habits or choices, such as their favourite lunch.', show: 't.0', focus: 't.0' },
        { say: 'An experiment tests whether changing one thing changes another. You change one thing on purpose, keep everything else the same, and measure what happens.', show: 't.1', focus: 't.1' },
        { say: 'Observation means watching and counting something as it happens, without asking anyone anything.', show: 't.2', focus: 't.2' },
        { say: 'And existing data comes from records or a database that someone has already made. Use it for facts about the past.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Which method fits?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which method fits each question?' },
        {
          kind: 'table',
          id: 't',
          head: ['Question', 'Method'],
          rows: [
            ['(a) Does the height a ball is dropped from change how high it bounces?', '**Experiment**'],
            ['(b) How many vehicles pass the school crosswalk between 8:00 and 8:30 a.m.?', '**Observation**'],
            ['(c) How has the number of people living in our town changed since 1950?', '**Existing records**'],
          ],
        },
      ],
      lines: [
        { say: 'Which method fits each question? The first question: does the height a ball is dropped from change how high it bounces?', show: ['q', 't.0'] },
        { say: 'Drop the ball from different heights, and measure each bounce. You change one thing and measure another, so it is an experiment.', focus: 't.0' },
        { say: 'The second question: how many vehicles pass the school crosswalk between eight and eight thirty in the morning? Stand at the crosswalk and count. That is observation.', show: 't.1', focus: 't.1' },
        { say: 'The third question: how has the number of people living in our town changed since nineteen fifty? You cannot go back in time to count, so use existing records, such as old census tables.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Then think about people',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'key',
          tone: 'key',
          title: 'Before you collect',
          md: 'Think about the social issues: **bias**, **wording**, **ethics**, **cost**, **timing**, **privacy** and **cultural sensitivity**. Then choose a **population** or a **representative sample**.',
        },
      ],
      lines: [
        { say: 'Choosing a method is not the end of the step. Before you collect anything, think about the social issues you have met.', show: 'key' },
        { say: 'Is the method biased? Is the wording neutral? Is it honest, affordable and done at a fair time? Does it protect privacy, and respect everyone’s culture?' },
        { say: 'Then decide whether to use the whole population, or a representative sample, chosen at random.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which method best fits this question: “Does the amount of sunlight a plant gets change how tall it grows?”',
          choices: ['Experiment', 'Observation', 'Existing records', 'Survey'],
          answer: 0,
          working: 'Give plants different amounts of sunlight, keep everything else the same, and measure their heights: changing one thing to see whether it changes another is an **experiment**.',
        },
      ],
      lines: [
        { say: 'Your turn. Which method best fits this question: does the amount of sunlight a plant gets change how tall it grows? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, an experiment. Give plants different amounts of sunlight, keep everything else the same, and measure how tall they grow. Choice D, a survey, asks people for opinions, but this question is about what happens to plants.', show: 'q.answer' },
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
            '**Survey:** opinions, habits or choices.',
            '**Experiment:** does changing one thing change another?',
            '**Observation:** watch and count. **Existing records:** facts about the past.',
            'Think about the social issues, then choose a population or a representative sample.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Use a survey for opinions, habits or choices.', show: 'sum.0' },
        { say: 'Use an experiment to test whether changing one thing changes another.', show: 'sum.1' },
        { say: 'Use observation to watch and count, and existing records for facts about the past.', show: 'sum.2' },
        { say: 'Then think about the social issues, and choose a population or a representative sample. In the next part, you will display the data and draw a fair conclusion. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
