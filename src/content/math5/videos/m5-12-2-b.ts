import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { answers, tallyChart } from './lib/m5-12-figures.ts';

const words = ['Summer', 'Winter', 'Summer', 'Fall', 'Spring', 'Summer', 'Winter', 'Summer', 'Fall', 'Summer', 'Winter', 'Spring'];
const rows = [
  { label: 'Winter', count: 3 },
  { label: 'Spring', count: 2 },
  { label: 'Summer', count: 5 },
  { label: 'Fall', count: 2 },
];
const ROW: Record<string, number> = { Winter: 0, Spring: 1, Summer: 2, Fall: 3 };
// The tally mark that each answer makes, in the order of the list.
const marks = (() => {
  const seen = [0, 0, 0, 0];
  return words.map((w) => `ch.m${ROW[w]}-${seen[ROW[w]]++}`);
})();
const step = (ks: number[]) => ks.flatMap((k) => [marks[k], `ls.x${k}`]);

const video: Explainer = {
  id: 'm5-12-2-b',
  lessonId: 'm5-12-2',
  title: 'Collecting and Displaying Data, Part 2: Frequency Tables',
  thumbnailTitle: 'Frequency Tables',
  thumbnail: 'ch',
  summary: 'A frequency table lists each category and its frequency. Twelve answers to "Which season do you like best?" are tallied one at a time and crossed off, giving Winter 3, Spring 2, Summer 5 and Fall 2; the frequencies add up to the 12 answers, and the mode is Summer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Frequency and Data · Part 2', title: 'Frequency Tables', subtitle: 'From a list of answers to a table' }],
      lines: [
        { say: 'You asked your survey question, and now you have a long list of answers. How can you make sense of them? Put them in a frequency table.', show: 'title' },
        { say: 'In this video, you will tally a list of answers, and make a frequency table.' },
      ],
    },
    {
      chapter: 'The answers',
      layout: 'split',
      leftWidth: 580,
      left: [figure('ch', [tallyChart({ head: ['Season', 'Tally', 'Frequency'], rows })])],
      right: [figure('ls', [answers({ words, cols: 2, dy: 1 })])],
      lines: [
        { say: 'Students answered the question: which season do you like best: winter, spring, summer or fall? Here are their twelve answers.', show: 'ls.words' },
        { say: 'Make a tally chart with a row for each season. Then go through the answers one at a time.', show: ['ch.frame', 'ch.names'] },
        { say: 'Summer: one mark for summer, and cross it off. Winter: one mark for winter. Then summer again, and fall.', show: step([0, 1, 2, 3]) },
        { say: 'Spring, summer, winter, summer. Keep making one mark for each answer, and crossing it off.', show: step([4, 5, 6, 7]) },
        { say: 'Fall, summer, winter and spring. Now every answer is crossed off.', show: step([8, 9, 10, 11]) },
      ],
    },
    {
      chapter: 'The frequency table',
      layout: 'split',
      leftWidth: 500,
      left: [{ kind: 'table', id: 't', head: ['Season', 'Frequency'], rows: [['Winter', '3'], ['Spring', '2'], ['Summer', '5'], ['Fall', '2']] }],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Frequency table', md: 'A **frequency table** lists each category and its frequency.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 + 2 + 5 + 2 = 12 \\;\\checkmark', '\\text{mode: Summer}'] },
      ],
      lines: [
        { say: 'Now count the marks, and write the counts in a frequency table. A frequency table lists each category and its frequency.', show: 'def' },
        { say: 'Winter has three marks, and spring has two marks.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'Summer has five marks, and fall has two marks.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'Check: three plus two plus five plus two is twelve. The frequencies add up to the number of answers, so none were missed.', show: 'm.0', focus: 'm.0' },
        { say: 'And now the mode is easy to see. Summer has the greatest frequency, so the mode is summer.', show: 'm.1', focus: ['t.2', 'm.1'] },
      ],
    },
    {
      chapter: 'Why a table helps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['A long list is hard to read at a glance.', 'A tally chart counts the answers, one at a time.', 'A frequency table shows each count as a number, ready to compare or graph.'],
        },
      ],
      lines: [
        { say: 'Why go to all this trouble? A long list of answers is hard to read. Can you tell the most popular season just by looking at the list? Not easily!', show: 'b.0' },
        { say: 'The tally chart lets you count the answers carefully, one at a time.', show: 'b.1' },
        { say: 'And the frequency table shows each count as a number, ready to compare, or to draw in a graph.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A frequency table shows: Cats $7$, Dogs $9$, Fish $4$, Birds $5$. How many people answered the survey?',
          choices: ['$9$', '$4$', '$25$', '$20$'],
          answer: 2,
          working: 'The frequencies add up to the number of answers: $7 + 9 + 4 + 5 = 25$.',
        },
      ],
      lines: [
        { say: 'Your turn. A frequency table shows cats seven, dogs nine, fish four, and birds five. How many people answered the survey? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twenty-five. The frequencies add up to the number of answers: seven plus nine plus four plus five is twenty-five. Choice A is the greatest frequency, not the total.', show: 'q.answer' },
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
          items: ['Tally the answers one at a time, and cross each one off.', 'A frequency table lists each category and its frequency.', 'The frequencies add up to the number of answers.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Tally the answers one at a time, and cross each one off.', show: 'sum.0' },
        { say: 'A frequency table lists each category and its frequency.', show: 'sum.1' },
        { say: 'And the frequencies add up to the number of answers. In the next part, you will show frequencies in graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
