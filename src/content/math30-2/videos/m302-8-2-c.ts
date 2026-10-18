import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { crowd } from './lib/m302-8-figures.ts';

/** The corner of a town where the hockey fans are: a small sample and a large one, both from it. */
const corner = (cols: number, rows: number): [number, number][] => Array.from({ length: cols * rows }, (_, k) => [k % cols, Math.floor(k / cols)] as [number, number]);
const fans = figure(
  'c',
  [
    crowd({ name: 's', cols: 10, rows: 6, picks: corner(3, 2), title: '\\text{50 fans}', tone: 'bad' }),
    crowd({ name: 'l', cols: 10, rows: 6, at: [13, 0], picks: corner(6, 4), title: '\\text{500 fans}', tone: 'bad' }),
  ],
  300,
);

const video: Explainer = {
  id: 'm302-8-2-c',
  lessonId: 'm302-8-2',
  title: 'The Mathematics Research Project, Part 3: Spotting Bias',
  thumbnailTitle: 'Spotting Bias',
  thumbnail: 'c',
  summary: 'Bias is a problem in how data are collected that pushes the results in one direction: sampling, non-response, response and measurement bias, each with an example. Worked example: a survey about a new arena given to fans leaving a hockey game has sampling bias, and surveying 500 fans instead of 50 keeps the same bias.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Puzzles, Games and the Research Project · Part 3', title: 'Spotting Bias', subtitle: 'When data lean one way' }],
      lines: [
        { say: 'A survey can ask hundreds of people and still give the wrong answer, if the way the data were collected leans one way.', show: 'title' },
        { say: 'In this video, you will meet four kinds of bias, spot one in a survey, and see why collecting more data does not fix it.' },
      ],
    },
    {
      chapter: 'What is bias?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Bias', md: 'A problem in how data are collected that pushes the results in one direction.' }],
      lines: [
        { say: 'Bias is a problem in how data are collected that pushes the results in one direction.', show: 'def' },
        { say: 'It is not a random slip that evens out over many answers. Bias leans the same way every time, so the results can be wrong even when they look precise.' },
      ],
    },
    {
      chapter: 'Four kinds of bias',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Sampling bias**: the sample does not represent the population.',
            '**Non-response bias**: the people who answer differ from those who do not.',
            '**Response bias**: the wording or setting of a question pushes people toward an answer.',
            '**Measurement bias**: the tool or method gives values that are consistently off.',
          ],
        },
      ],
      lines: [
        { say: 'Sampling bias: the sample does not represent the population. For example, asking only the basketball team whether the school needs a new gym.', show: 'b.0' },
        { say: 'Non-response bias: the people who answer differ from those who do not. A survey about free time, sent home on paper, is least likely to come back from the busiest students.', show: 'b.1' },
        { say: 'Response bias: the wording or setting of a question pushes people toward an answer. A question like, “Don’t you agree that the unfair parking fee should be dropped?” tells people what to think.', show: 'b.2' },
        { say: 'Measurement bias: the tool or method gives values that are consistently off, like a bathroom scale that always reads two kilograms too heavy.', show: 'b.3' },
      ],
    },
    {
      chapter: 'An arena survey',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'To find out whether the residents of a town want a new arena, Sienna surveys fans leaving a hockey game. What kind of bias is this, and how could it be fixed?' },
        { kind: 'callout', id: 'a', tone: 'key', title: 'Sampling bias', md: 'Hockey fans are more likely than other residents to want an arena, so the sample does not represent the town. Choosing residents **at random from the whole town** would reduce the bias.' },
      ],
      lines: [
        { say: 'To find out whether the residents of a town want a new arena, Sienna surveys fans leaving a hockey game. What kind of bias is this, and how could it be fixed?', show: 'p' },
        { say: 'Hockey fans are more likely than other residents to want an arena. So the sample does not represent the town: this is sampling bias.', show: 'a' },
        { say: 'To reduce it, choose residents at random from the whole town, for example from a list of addresses, so that every resident has the same chance of being asked.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [fans, { kind: 'callout', id: 'oops', tone: 'mistake', title: 'More data does not remove bias', md: 'A bigger sample collected the same way has the same bias. Fix **how** the data are collected, not just how much.' }],
      lines: [
        { say: 'A common mistake is to think that more data removes bias. Here is the town, with the fifty hockey fans who were asked, all from the same small part of it.', show: ['c.s-pop', 'c.s-pick', 'c.s-title'], focus: 'c.s-pick' },
        { say: 'Surveying five hundred fans instead of fifty gives a much bigger sample. But every one of them was still leaving a hockey game.', show: ['c.l-pop', 'c.l-pick', 'c.l-title'], focus: 'c.l-pick' },
        { say: 'The sample is bigger, but it is biased in exactly the same way. So fix how the data are collected, not just how much.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A survey asks: “Do you agree that our excellent mayor deserves a second term?” What kind of bias is most likely?',
          choices: ['Sampling bias', 'Non-response bias', 'Measurement bias', 'Response bias'],
          answer: 3,
          working: 'Calling the mayor “excellent” pushes people toward agreeing: the wording of the question biases the answers.',
        },
      ],
      lines: [
        { say: 'Your turn. A survey asks: “Do you agree that our excellent mayor deserves a second term?” What kind of bias is most likely? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, response bias. Calling the mayor excellent pushes people toward agreeing. Choice A is about who is asked, but nothing here says that the wrong people were asked.', show: 'q.answer' },
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
          items: ['**Bias** pushes the results in one direction.', 'Watch for sampling, non-response, response and measurement bias.', 'More data collected the same way keeps the same bias: fix how, not how much.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Bias is a problem in how data are collected that pushes the results in one direction.', show: 'sum.0' },
        { say: 'Watch for sampling, non-response, response and measurement bias.', show: 'sum.1' },
        { say: 'And more data collected the same way keeps the same bias: fix how the data are collected, not how much. In the next part, you will choose the right graph and the right average for your data. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
