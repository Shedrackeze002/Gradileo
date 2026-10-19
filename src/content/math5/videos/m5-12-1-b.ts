import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';
import { tallyChart } from './lib/m5-12-figures.ts';

// Snack votes: Popcorn 6, Cheese 4, Crackers 9, Yogurt 3.
const snacks = (id: string) => figure(id, [barGraph({ categories: ['Popcorn', 'Cheese', 'Crackers', 'Yogurt'], values: [6, 4, 9, 3], max: 10, step: 1, height: 4.5, titles: { x: 'Snack', y: 'Votes' } })]);

const fruit = () =>
  figure('fr', [
    tallyChart({
      head: ['Fruit', 'Tally', 'Frequency'],
      rows: [
        { label: 'Apple', count: 4 },
        { label: 'Banana', count: 3 },
        { label: 'Grapes', count: 2 },
        { label: 'Orange', count: 1 },
      ],
    }),
  ]);

const video: Explainer = {
  id: 'm5-12-1-b',
  lessonId: 'm5-12-1',
  title: 'Frequency and the Mode, Part 2: The Mode',
  thumbnailTitle: 'The Mode',
  thumbnail: 'bg',
  summary: 'The mode is the category with the greatest frequency: the most common answer. Apple is the mode of the favourite-fruit tally, and Crackers, the tallest bar at 9 votes, is the mode of the snack bar graph. The mode is a category, not a number of votes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Frequency and Data · Part 2', title: 'The Mode', subtitle: 'The most common answer' }],
      lines: [
        { say: 'When your class votes for a snack, which snack wins? The one that the most people chose. In maths, that answer has a name: the mode.', show: 'title' },
        { say: 'In this video, you will find the mode from a tally chart, and from a bar graph.' },
      ],
    },
    {
      chapter: 'The mode',
      layout: 'split',
      leftWidth: 580,
      left: [fruit()],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Mode', md: 'The **mode** is the category with the greatest frequency. It is the most common answer.' }],
      lines: [
        { say: 'The mode is the category with the greatest frequency. It is the answer that appears most often.', show: ['def', 'fr.frame', 'fr.names', 'fr.tally0', 'fr.tally1', 'fr.tally2', 'fr.tally3', 'fr.freqs'] },
        { say: 'Here is the tally chart of favourite fruits. Look for the greatest frequency.', focus: 'fr.freqs' },
        { say: 'Apple has a frequency of four. That is more than any other fruit. So the mode is apple.', show: 'fr.hl0', focus: ['fr.name0', 'fr.f0'] },
        { say: 'In a vote, the mode is the winner: the answer that more people chose than any other.' },
      ],
    },
    {
      chapter: 'Reading a bar graph',
      layout: 'split',
      leftWidth: 700,
      left: [snacks('bg')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'The bar graph shows the snack votes. What is the mode?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{tallest bar: Crackers}', '\\text{frequency: } 9', '\\text{mode: Crackers}'] },
      ],
      lines: [
        { say: 'A bar graph shows the frequency of each category as the height of a bar. This one shows the votes for a class snack.', show: ['q', 'bg.scale', 'bg.b0', 'bg.b1', 'bg.b2', 'bg.b3'] },
        { say: 'Check the scale first. The numbers up the side go up by one for each grid line.', focus: 'bg.scale' },
        { say: 'The greatest frequency is the tallest bar. The tallest bar is crackers. It reaches nine, so crackers got nine votes.', show: ['bg.r2', 'bg.v2', 'm.0', 'm.1'], focus: ['bg.b2', 'm.0', 'm.1'] },
        { say: 'No other bar is that tall. Popcorn has six, cheese has four, and yogurt has three. So the mode is crackers.', show: ['bg.v0', 'bg.v1', 'bg.v3', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 700,
      left: [snacks('w')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'The mode is not a number of votes', md: 'The mode is a **category**. In the graph, the mode is **Crackers**, not $9$. The $9$ is the frequency of the mode.' }],
      lines: [
        { say: 'Here is a common mistake. Someone looks at the tallest bar, and says the mode is nine.', show: ['w.scale', 'w.b0', 'w.b1', 'w.b2', 'w.b3', 'w.v2', 'w.r2'], focus: 'w.v2' },
        { say: 'But the mode is a category: the answer people gave. People voted for crackers. Nobody voted for nine!', show: 'oops', focus: 'w.b2' },
        { say: 'Nine is the frequency of the mode: it tells how many people chose crackers. So the mode is crackers, with a frequency of nine.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A class voted for a class pet: Fish $5$, Hamster $8$, Rabbit $6$, Bird $2$. What is the mode?',
          choices: ['$8$', 'Fish', 'Hamster', 'Rabbit'],
          answer: 2,
          working: 'Hamster has the greatest frequency, $8$, so the mode is Hamster.',
        },
      ],
      lines: [
        { say: 'Your turn. A class voted for a class pet: fish got five votes, hamster eight, rabbit six, and bird two votes. What is the mode? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, hamster. It has the greatest frequency, eight votes. Choice A, eight, is the frequency of the mode, not the mode itself.', show: 'q.answer' },
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
          items: ['The mode is the category with the greatest frequency.', 'On a bar graph, the mode is the tallest bar.', 'The mode is a category, not a number of votes.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The mode is the category with the greatest frequency: the most common answer.', show: 'sum.0' },
        { say: 'On a bar graph, the mode is the category with the tallest bar.', show: 'sum.1' },
        { say: 'And the mode is a category, not a number of votes. In the next part, you will see data with two modes, or no mode at all. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
