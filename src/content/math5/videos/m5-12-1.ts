import type { Explainer } from '@/video/script.ts';
import { tally } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';
import { answers, tallyChart } from './lib/m5-12-figures.ts';

const words = ['Apple', 'Banana', 'Apple', 'Grapes', 'Banana', 'Apple', 'Orange', 'Apple', 'Grapes', 'Banana'];
const rows = [
  { label: 'Apple', count: 4 },
  { label: 'Banana', count: 3 },
  { label: 'Grapes', count: 2 },
  { label: 'Orange', count: 1 },
];
// The tally mark each answer makes, in the order of the list: [row, mark].
const marks: [number, number][] = [[0, 0], [1, 0], [0, 1], [2, 0], [1, 1], [0, 2], [3, 0], [0, 3], [2, 1], [1, 2]];
const mark = (k: number) => `ch.m${marks[k][0]}-${marks[k][1]}`;
const cross = (k: number) => `ls.x${k}`;

const chart = (id: string) => figure(id, [tallyChart({ head: ['Fruit', 'Tally', 'Frequency'], rows })]);

const video: Explainer = {
  id: 'm5-12-1',
  lessonId: 'm5-12-1',
  title: 'Frequency and the Mode, Part 1: Categories and Frequency',
  thumbnailTitle: 'Categories and Frequency',
  thumbnail: 'fr',
  summary: 'A category is a group that answers fit into, and its frequency is how many times it appears. Ten students named their favourite fruit; a tally chart, made one answer at a time, gives Apple 4, Banana 3, Grapes 2 and Orange 1, which add up to 10. Counting tally marks in bundles of five.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Frequency and Data · Part 1', title: 'Categories and Frequency', subtitle: 'Counting with tally marks' }],
      lines: [
        { say: 'Your class is choosing a snack for a fun fair, and everyone votes. How do you find the winner fairly?', show: 'title' },
        { say: 'You count the votes for each snack, and that count has a special name: frequency. In this video, you will learn what a category and a frequency are, and count answers with tally marks.' },
      ],
    },
    {
      chapter: 'Categories and frequency',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Category and frequency', md: 'A **category** is a group that answers fit into, such as "apple" or "banana". The **frequency** of a category is how many times it appears in the data.' },
        { kind: 'text', id: 'list', size: 'md', md: 'Favourite fruit: Apple, Banana, Apple, Grapes, Banana, Apple, Orange, Apple, Grapes, Banana' },
      ],
      lines: [
        { say: 'Ten students were asked to name their favourite fruit. Here are their answers. The answers we collect are called data.', show: 'list' },
        { say: 'The answers fit into groups, called categories. Here there are four categories: apple, banana, grapes and orange.', show: 'def' },
        { say: 'The frequency of a category is how many times it appears in the data. So the frequency of apple is the number of students who said apple.' },
        { say: 'Counting straight from the list is easy to get wrong. A tally chart helps.' },
      ],
    },
    {
      chapter: 'Making a tally chart',
      layout: 'split',
      leftWidth: 580,
      left: [chart('ch')],
      right: [figure('ls', [answers({ words, cols: 2 })])],
      lines: [
        { say: 'A tally chart has a row for each category. Let’s go through the list one answer at a time.', show: ['ch.frame', 'ch.names', 'ls.words'] },
        { say: 'The first answer is apple. Make one tally mark in the apple row, and cross apple off the list.', show: [mark(0), cross(0)], focus: [mark(0), 'ls.w0'] },
        { say: 'The next answer is banana: one mark in the banana row. Then apple again, so a second mark for apple.', show: [mark(1), cross(1), mark(2), cross(2)] },
        { say: 'Then grapes, banana, apple and orange. Each answer gets one mark, and is crossed off.', show: [3, 4, 5, 6].flatMap((k) => [mark(k), cross(k)]) },
        { say: 'Last, apple, grapes and banana. Now every answer is crossed off. Crossing off means you never count an answer twice, or miss one.', show: [7, 8, 9].flatMap((k) => [mark(k), cross(k)]) },
      ],
    },
    {
      chapter: 'Counting the marks',
      layout: 'split',
      leftWidth: 580,
      left: [chart('fr')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Apple: } 4', '\\text{Banana: } 3', '\\text{Grapes: } 2, \\quad \\text{Orange: } 1', '4 + 3 + 2 + 1 = 10 \\;\\checkmark'] }],
      lines: [
        { say: 'Now count the marks in each row, and write the frequency at the end of the row. Apple has four marks, so the frequency of apple is four.', show: ['fr.frame', 'fr.names', 'fr.tally0', 'fr.tally1', 'fr.tally2', 'fr.tally3', 'fr.f0', 'fr.hl0', 'm.0'], focus: ['fr.f0', 'm.0'] },
        { say: 'Banana has three marks, so its frequency is three.', show: ['fr.f1', 'm.1'], focus: ['fr.f1', 'm.1'] },
        { say: 'Grapes has two, and orange has one.', show: ['fr.f2', 'fr.f3', 'm.2'], focus: ['fr.f2', 'fr.f3', 'm.2'] },
        { say: 'Check: four plus three plus two plus one is ten. That is the same as the number of answers in the list, so no answer was missed.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Bundles of five',
      layout: 'center',
      main: [
        figure('b', [tally({ count: 12, label: 'Soccer' })], 200),
        { kind: 'math', id: 'm', size: 'lg', lines: ['5 + 5 + 2 = 12'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Count by fives', md: 'Every fifth mark goes **across** the four before it, making a bundle of $5$. Count the bundles by fives, then count the extra marks.' },
      ],
      lines: [
        { say: 'When a row has lots of marks, they are grouped in bundles. Four marks go straight up, and the fifth mark goes across them.', show: ['b.t0', 'tip'] },
        { say: 'Each bundle stands for five, so you can count by fives. Here is a row with two bundles and two extra marks.', show: ['b.t1', 'b.t2', 'b.label'] },
        { say: 'Count the bundles: five, ten. Then count on the extra marks: eleven, twelve. The frequency is twelve.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a tally chart, the row for Swimming has two bundles of five and three more marks. What is the frequency of Swimming?',
          choices: ['$5$', '$3$', '$10$', '$13$'],
          answer: 3,
          working: 'Count the bundles by fives: $5$, $10$. Then count on the extra marks: $11$, $12$, $13$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a tally chart, the row for swimming has two bundles of five, and three more marks. What is the frequency of swimming? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, thirteen. Count the bundles by fives: five, ten. Then count on the extra marks: eleven, twelve, thirteen. Choice C forgets the three extra marks.', show: 'q.answer' },
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
          items: ['A category is a group that answers fit into.', 'The frequency of a category is how many times it appears.', 'A tally chart helps you count: one mark for each answer, in bundles of $5$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A category is a group that answers fit into.', show: 'sum.0' },
        { say: 'The frequency of a category is how many times it appears in the data.', show: 'sum.1' },
        { say: 'And a tally chart helps you count: one mark for each answer, in bundles of five. In the next part, you will find the most popular answer. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
