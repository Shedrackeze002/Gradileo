import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { counters } from './lib/m5-6-figures.ts';

// A bag of 3 red marbles and 5 blue marbles, as counters.
const marbles = (id: string, height?: number) =>
  figure(
    id,
    [
      counters({
        groups: [
          { id: 'red', count: 3, tone: 'bad', label: '3\\text{ red}' },
          { id: 'blue', count: 5, tone: 'adj', label: '5\\text{ blue}' },
        ],
      }),
    ],
    height,
  );

// A garden bed: 4 tomato plants and 7 pepper plants.
const garden = (id: string) =>
  figure(id, [
    counters({
      gap: 1,
      groups: [
        { id: 'tom', count: 4, tone: 'bad', label: '4\\text{ tomato}', perRow: 2 },
        { id: 'pep', count: 7, tone: 'good', label: '7\\text{ pepper}', perRow: 4 },
      ],
    }),
  ]);

const video: Explainer = {
  id: 'm5-6-1',
  lessonId: 'm5-6-1',
  title: 'Ratios, Part 1: What Is a Ratio?',
  thumbnailTitle: 'What Is a Ratio?',
  thumbnail: 'mb',
  summary: 'A ratio compares two amounts: 3 red marbles for every 5 blue ones is the ratio 3 : 5, or 3/5, read "3 to 5". The order of the numbers matches the order of the words, so pepper plants to tomato plants in a bed of 4 tomato and 7 pepper plants is 7 : 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Ratios and Percentages · Part 1', title: 'What Is a Ratio?', subtitle: 'A short way to compare two amounts' }],
      lines: [
        { say: 'A bag has three red marbles and five blue marbles. We could say: there are three red marbles for every five blue marbles.', show: 'title' },
        { say: 'That is a lot of words. A ratio is a short way to say it. In this video, you will learn what a ratio is, and how to write one.' },
      ],
    },
    {
      chapter: 'Counting the marbles',
      layout: 'center',
      main: [marbles('mb')],
      lines: [
        { say: 'Here are the marbles from the bag, drawn as counters. The red counters are the red marbles, and the blue counters are the blue marbles.', show: ['mb.red', 'mb.blue'] },
        { say: 'Let’s count each colour. There are three red counters.', show: 'mb.red-tag', focus: 'mb.red' },
        { say: 'And there are five blue counters.', show: 'mb.blue-tag', focus: 'mb.blue' },
        { say: 'To compare them, we say: three red for every five blue.', focus: 'mb' },
      ],
    },
    {
      chapter: 'What is a ratio?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Ratio', md: 'A **ratio** compares two amounts. We can write it with a colon, $3 : 5$, or as a fraction, $\\dfrac{3}{5}$. Both are read “3 to 5”.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['3 : 5', '\\dfrac{3}{5}'] },
      ],
      lines: [
        { say: 'A ratio compares two amounts. Here, it compares the number of red marbles with the number of blue marbles.', show: 'def' },
        { say: 'We can write a ratio with a colon. A colon is two dots, one above the other. We write three, then the colon, then five.', show: 'm.0', focus: 'm.0' },
        { say: 'We can also write a ratio as a fraction, with three on top and five on the bottom.', show: 'm.1', focus: 'm.1' },
        { say: 'Both ways are read the same way: three to five. So the ratio of red marbles to blue marbles is three to five.', focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Order matters',
      layout: 'center',
      main: [
        marbles('mb2', 220),
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{red to blue} = \\bad{3} : \\adj{5}', '\\text{blue to red} = \\adj{5} : \\bad{3}'] },
      ],
      lines: [
        { say: 'In a ratio, the order matters. The ratio of red marbles to blue marbles is three to five. Red comes first in the words, so the red number comes first.', show: ['mb2', 'm.0'], focus: 'm.0' },
        { say: 'But the ratio of blue marbles to red marbles is five to three. Now blue comes first in the words, so five comes first.', show: 'm.1', focus: 'm.1' },
        { say: 'Three to five and five to three are not the same. Always write the numbers in the same order as the words.' },
      ],
    },
    {
      chapter: 'A garden bed',
      layout: 'split',
      leftWidth: 560,
      left: [garden('gb')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A garden bed has $4$ tomato plants and $7$ pepper plants. What is the ratio of **pepper plants to tomato plants**?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{pepper} : \\text{tomato}', '7 : 4', '\\dfrac{7}{4}'] },
      ],
      lines: [
        { say: 'A garden bed has four tomato plants and seven pepper plants. What is the ratio of pepper plants to tomato plants?', show: ['q', 'gb.tom', 'gb.pep', 'gb.tom-tag', 'gb.pep-tag'] },
        { say: 'Read the question carefully. It names pepper plants first, so the number of pepper plants goes first.', show: 'm.0', focus: 'm.0' },
        { say: 'There are seven pepper plants, and four tomato plants. So the ratio is seven to four.', show: 'm.1', focus: ['m.1', 'gb.pep'] },
        { say: 'As a fraction, it is seven over four. That is seven on top, for the pepper plants, and four on the bottom, for the tomato plants.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keep the order of the words', md: '“Pepper plants to tomato plants” is $7 : 4$, not $4 : 7$. Write the numbers in the same order as the words.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{4 : 7} \\quad \\text{\\bad{wrong}}', '\\good{7 : 4} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. The tomato plants came first in the story, so it is easy to write four to seven.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But the question asked for pepper plants to tomato plants. The words in the question set the order, so the answer is seven to four, not four to seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Here is a good habit. Point to each word in the question, and write its number in that same place.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pencil case has $6$ pencils and $5$ erasers. What is the ratio of **erasers to pencils**?',
          choices: ['$6 : 5$', '$5 : 6$', '$5 : 11$', '$11 : 6$'],
          answer: 1,
          working: 'Erasers come first in the words, so their number comes first: $5$ erasers to $6$ pencils is $5 : 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. A pencil case has six pencils and five erasers. What is the ratio of erasers to pencils? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, five to six. Erasers come first in the words, so their number comes first. Choice A, six to five, is pencils to erasers: the order is backwards.', show: 'q.answer' },
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
          items: ['A ratio compares two amounts.', 'Write it with a colon, $3 : 5$, or as a fraction, $\\dfrac{3}{5}$. Read it “3 to 5”.', 'The order of the numbers matches the order of the words.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A ratio compares two amounts.', show: 'sum.0' },
        { say: 'You can write it with a colon or as a fraction. Both are read the same way, like three to five.', show: 'sum.1' },
        { say: 'And the order of the numbers matches the order of the words. In the next part, you will compare a part with the whole. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
