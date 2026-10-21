import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { sumGrid } from './lib/m7-11-figures.ts';

// Two dice: the 36 sums, with the outcomes for a sum of 8, 4 and 12 marked.
const sums = (id: string) =>
  figure(
    id,
    [
      sumGrid({
        marks: [
          { id: 'eight', fits: (r, b) => r + b === 8 },
          { id: 'four', fits: (r, b) => r + b === 4, tone: 'theta' },
          { id: 'twelve', fits: (r, b) => r + b === 12, tone: 'hyp' },
          { id: 'two-six', fits: (r, b) => r === 2 && b === 6, tone: 'theta' },
          { id: 'six-two', fits: (r, b) => r === 6 && b === 2, tone: 'hyp' },
        ],
      }),
    ],
    560,
  );
const table = (id: string) => [`${id}.frame`, ...[0, 1, 2, 3, 4, 5].map((r) => `${id}.row${r}`)];

const video: Explainer = {
  id: 'm7-11-2-d',
  lessonId: 'm7-11-2',
  title: 'Sample Spaces for Two Events, Part 4: Counting Outcomes That Fit',
  thumbnailTitle: 'Counting Outcomes That Fit',
  thumbnail: 'ei',
  summary:
    'Once you have the sample space, count the outcomes that fit a condition. Rolling a red die and a blue die gives 6 × 6 = 36 outcomes; writing the sum in each cell of the table shows that 5 of them have a sum of 8: (2, 6), (3, 5), (4, 4), (5, 3) and (6, 2). (2, 6) and (6, 2) are different outcomes. A sum of 4 happens 3 ways, and a sum of 12 only 1 way.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Probability · Part 4', title: 'Counting Outcomes That Fit', subtitle: 'Two dice and their sums' }],
      lines: [
        { say: 'In many board games, you roll two dice and add them. Some sums come up much more often than others. Why?', show: 'title' },
        { say: 'In this video, you will use a table of sums to count the outcomes that fit an event.' },
      ],
    },
    {
      chapter: 'Two dice',
      layout: 'split',
      leftWidth: 620,
      left: [sums('td')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Red die down the side, blue die across the top. Each cell shows the **sum** of the two numbers.' }],
      lines: [
        { say: 'Hamid rolls a red die and a blue die, and adds the numbers. How many outcomes are in the sample space?', show: ['td.frame', 't'] },
        { say: 'The red die goes down the side, and the blue die goes across the top. Each die has six outcomes, so there are six times six, or thirty-six, outcomes.', focus: 'td.frame' },
        { say: 'In each cell, write the sum. For example, a red one and a blue one make two. A red three and a blue four make seven.', show: table('td') },
        { say: 'Now every one of the thirty-six outcomes shows its sum.' },
      ],
    },
    {
      chapter: 'A sum of 8',
      layout: 'split',
      leftWidth: 620,
      left: [sums('se')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(2,\\ 6),\\ (3,\\ 5),\\ (4,\\ 4),', '(5,\\ 3),\\ (6,\\ 2)', '5 \\text{ outcomes}'] }],
      lines: [
        { say: 'How many outcomes have a sum of eight? Look for every eight in the table.', show: table('se') },
        { say: 'The eights make a slanted line. They are red two and blue six, red three and blue five, red four and blue four, red five and blue three, and red six and blue two.', show: ['se.eight', 'm.0', 'm.1'], focus: ['se.eight', 'm.0', 'm.1'] },
        { say: 'So five of the thirty-six outcomes have a sum of eight.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Order matters',
      layout: 'split',
      leftWidth: 620,
      left: [sums('om')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Two different outcomes', md: '$(2,\\ 6)$ is a red $2$ and a blue $6$. $(6,\\ 2)$ is a red $6$ and a blue $2$. They have the same sum, but they are **different outcomes**, in different cells.' }],
      lines: [
        { say: 'Watch out. Two, six and six, two have the same sum, so it is tempting to count them once.', show: table('om') },
        { say: 'But two, six means a red two and a blue six. It is in this cell.', show: 'om.two-six', focus: 'om.two-six' },
        { say: 'And six, two means a red six and a blue two. It is in a different cell. They are different outcomes, so count both of them.', show: ['om.six-two', 'oops'], focus: 'om.six-two' },
      ],
    },
    {
      chapter: 'Other sums',
      layout: 'split',
      leftWidth: 560,
      left: [sums('os')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{sum of 4:}', '(1,\\ 3),\\ (2,\\ 2),\\ (3,\\ 1)', '\\text{sum of 12: } (6,\\ 6)'] }],
      lines: [
        { say: 'Try a sum of four. The fours are red one and blue three, red two and blue two, and red three and blue one. That is three outcomes.', show: [...table('os'), 'os.four', 'm.0', 'm.1'], focus: ['os.four', 'm.0', 'm.1'] },
        { say: 'A sum of twelve can only happen one way: a red six and a blue six. That is one outcome, in the bottom corner.', show: ['os.twelve', 'm.2'], focus: ['os.twelve', 'm.2'] },
        { say: 'So some sums have many outcomes and some have few. That is why some sums come up more often than others.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You roll a red die and a blue die. How many outcomes have a sum of $10$?',
          choices: ['$2$', '$10$', '$36$', '$3$'],
          answer: 3,
          working: 'A sum of $10$: $(4,\\ 6)$, $(5,\\ 5)$ and $(6,\\ 4)$, which are $3$ outcomes.',
        },
      ],
      lines: [
        { say: 'Your turn. You roll a red die and a blue die. How many outcomes have a sum of ten? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is D: three. They are red four and blue six, red five and blue five, and red six and blue four. Choice A forgets that four, six and six, four are different outcomes.', show: 'q.answer' },
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
          items: ['Two dice have $6 \\times 6 = 36$ outcomes.', 'Write the sum in each cell, then count the cells that fit.', '$(2,\\ 6)$ and $(6,\\ 2)$ are different outcomes.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two dice have six times six, or thirty-six, outcomes.', show: 'sum.0' },
        { say: 'Write the sum in each cell of the table, then count the cells that fit.', show: 'sum.1' },
        { say: 'And two, six and six, two are different outcomes. In the next lesson, you will use sample spaces to find probabilities. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
