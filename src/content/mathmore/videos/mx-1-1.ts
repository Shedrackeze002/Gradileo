import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dotPlot, stacks } from './lib/mx-figures.ts';

const PETS = [1, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 7];

const video: Explainer = {
  id: 'mx-1-1',
  lessonId: 'mx-1-1',
  title: 'Statistical Questions and Dot Plots',
  thumbnail: 'd',
  summary: 'A statistical question expects answers that vary, so we answer it with data. A dot plot shows each value as a dot above a number line: for the pets of 15 students, the mode is 3, the median is 3, the range is 6 and the mean is 3.4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Statistics and Data Displays', title: 'Statistical Questions and Dot Plots', subtitle: 'Questions whose answers vary' }],
      lines: [
        { say: 'A coach wants to know how far the students in a class can jump. One jump tells the coach very little. The jumps of the whole class tell much more, because they show what is typical and how much the students differ.', show: 'title' },
        { say: 'In this video, you will learn what makes a question statistical, and how a dot plot shows the answers.' },
      ],
    },
    {
      chapter: 'Statistical questions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Statistical question', md: 'A question that expects **answers that vary**, so we answer it by collecting data: many values, not one fact.' },
        { kind: 'table', id: 't', head: ['Question', 'Statistical?'], rows: [['How many hours do the students in my class sleep on a school night?', '[[good:Yes]]: the answers vary'], ['How many hours did I sleep last night?', '[[bad:No]]: one answer']] },
      ],
      lines: [
        { say: 'A statistical question is a question that expects answers that vary. We answer it by collecting data: many values, not one fact.', show: 'def' },
        { say: 'How many hours do the students in my class sleep on a school night? That is a statistical question. Each student gives a different answer, and we would look at all of them.', show: 't.0', focus: 't.0' },
        { say: 'How many hours did I sleep last night? That is not a statistical question. It has just one answer.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Which are statistical?',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'q', items: ['(a) How tall is the school’s flagpole?', '(b) How tall are the students in Grade 6?', '(c) How many pages are in each book on this shelf?'] },
        { kind: 'text', id: 'ans', md: '[[good:(b)]] and [[good:(c)]] are statistical: their answers vary. (a) has one answer.', align: 'center' },
      ],
      lines: [
        { say: 'Let’s sort three questions. First: how tall is the school’s flagpole? The flagpole has one height, so the answer is a single fact. It is not statistical.', show: 'q.0', focus: 'q.0' },
        { say: 'Second: how tall are the students in Grade 6? Each student has a different height, so the answers vary. That one is statistical.', show: 'q.1', focus: 'q.1' },
        { say: 'Third: how many pages are in each book on this shelf? Each book has its own number of pages, so this is statistical too.', show: 'q.2', focus: 'q.2' },
        { say: 'So questions b and c are statistical, and question a is not.', show: 'ans', focus: 'q' },
      ],
    },
    {
      chapter: 'Dot plots',
      layout: 'center',
      main: [
        figure('d', [dotPlot({ values: PETS, min: 0, max: 8, label: 'Number of pets' })], 430),
      ],
      lines: [
        { say: 'Once we have the data, a dot plot shows it. A dot plot is a number line with a dot above it for each value.', show: 'd.axis' },
        { say: 'Here, fifteen students each said how many pets they have. Every student is one dot, and equal values stack up.', show: stacks('d', PETS) },
        { say: 'The shape tells a story. Most students have two to four pets, and the stacks bunch together there.', focus: ['d.s2', 'd.s3', 'd.s4'] },
        { say: 'One student, with seven pets, sits far from all the others.', focus: 'd.s7' },
        { say: 'This picture of how the values are spread out is called the distribution of the data: where its centre is, how widely it spreads, and its overall shape.', focus: 'd' },
      ],
    },
    {
      chapter: 'Reading a dot plot',
      layout: 'split',
      leftWidth: 760,
      left: [figure('d', [dotPlot({ values: PETS, min: 0, max: 8, label: 'Number of pets' })], 430)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Mode: } 3', '\\text{Median (8th of 15): } 3', '\\text{Range: } 7 - 1 = 6'] }],
      lines: [
        { say: 'Let’s read the mode, the median and the range from this dot plot.', show: ['d.axis', ...stacks('d', PETS)] },
        { say: 'The mode is the most common value, so it is the tallest stack. That stack is at three, with five dots. The mode is three pets.', show: 'm.0', focus: ['d.s3', 'm.0'] },
        { say: 'For the median, read the dots from left to right: they are the values in order. There are fifteen of them, so the median is value number eight.', focus: 'd' },
        { say: 'Count along. The one comes first. The three dots at two are values two, three and four. The five dots at three are values five to nine. So value number eight is a three. The median is three pets.', show: 'm.1', focus: ['d.s1', 'd.s2', 'd.s3', 'm.1'] },
        { say: 'The range is the greatest value minus the least: seven minus one, which is six pets.', show: 'm.2', focus: ['d.s1', 'd.s7', 'm.2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Count the dots, not the stacks', md: 'The pets plot has $6$ stacks but $15$ values. Every dot is one value.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Mean} = \\dfrac{1 + 3(2) + 5(3) + 3(4) + 2(5) + 7}{15} = \\dfrac{51}{15} = 3.4'] },
      ],
      lines: [
        { say: 'A common mistake is to count the stacks instead of the dots. The pets plot has six stacks, but fifteen values. Every dot is one value, so count the dots.', show: 'oops' },
        { say: 'You can find the mean from a dot plot too. Multiply each value by the number of dots above it, and add: one, plus three twos, plus five threes, plus three fours, plus two fives, plus seven. That makes 51.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide by the number of dots, fifteen. The mean is 3.4 pets.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A dot plot shows the number of goals scored in $9$ games: $0, 1, 1, 2, 2, 2, 2, 3, 5$. Find the median.',
          choices: ['$1$', '$2.5$', '$3$', '$2$'],
          answer: 3,
          working: 'There are $9$ values, so the median is the $5$th in order: $0, 1, 1, 2, \\mathbf{2}, \\ldots$ The median is $2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A dot plot shows the number of goals scored in nine games: zero, one, one, two, two, two, two, three and five. Find the median. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. There are nine values, so the median is the fifth value in order. Counting along: zero, one, one, two, and the fifth is another two. The median is two goals.', show: 'q.answer' },
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
          items: ['A statistical question expects answers that vary; we answer it with data.', 'A dot plot shows each value as a dot above a number line.', 'The tallest stack is the mode; reading the dots left to right gives the values in order.', 'Count the dots, not the stacks.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A statistical question expects answers that vary, and we answer it with data.', show: 'sum.0' },
        { say: 'A dot plot shows each value as a dot above a number line, so the shape of the data is easy to see.', show: 'sum.1' },
        { say: 'The tallest stack is the mode, and reading the dots from left to right gives the values in order, for the median.', show: 'sum.2' },
        { say: 'And always count the dots, not the stacks. In the next lesson, we split data into quarters and draw a box plot. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
