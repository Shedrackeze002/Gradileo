import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { grid, move, pt } from '@/content/math5/videos/lib/m5-9-figures.ts';

// Exam question for Math 5 lesson 9.1 (points on a coordinate grid). The question is a Try It from
// OpenStax Prealgebra 2e, word for word (section 11.1, Use the Rectangular Coordinate System,
// CC BY-NC-SA 4.0). (5, 2) is 5 across and 2 up; (2, 5) is 2 across and 5 up: two different points.

const QUESTION = 'Plot each point on the same rectangular coordinate system: (5, 2), (2, 5).';

const g = grid({ x: 7, y: 7 });

/** Both points, each with its moves across (blue) and up (orange). */
const plot = (id: string) =>
  figure(id, [
    g,
    move(g, 'a1', [0, 0], [5, 0], { label: '5', group: 'A-moves' }),
    move(g, 'a2', [5, 0], [5, 2], { label: '2', side: 'right', group: 'A-moves' }),
    pt(g, 'A', 5, 2, '(5,\\ 2)', 'right'),
    move(g, 'b1', [0, 0], [2, 0], { label: '2', group: 'B-moves' }),
    move(g, 'b2', [2, 0], [2, 5], { label: '5', group: 'B-moves' }),
    pt(g, 'B', 2, 5, '(2,\\ 5)', 'above right', 'good'),
  ]);

const video: Explainer = {
  id: 'xq-m5-9-1',
  lessonId: '',
  exam: {
    lesson: 'm5-9-1',
    source: 'OpenStax, Prealgebra 2e, Try It in section 11.1, Use the Rectangular Coordinate System',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/11-1-use-the-rectangular-coordinate-system',
    question: QUESTION,
  },
  title: 'Exam Question: Plot (5, 2) and (2, 5) (Points on a Coordinate Grid)',
  thumbnailTitle: 'Is (5, 2) the Same as (2, 5)?',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: plot the points (5, 2) and (2, 5) on the same coordinate grid. The first number tells us how far across to go, and the second how far up. So (5, 2) is 5 across and 2 up, and (2, 5) is 2 across and 5 up: the same numbers make two different points. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Is (5, 2) the Same as (2, 5)?', subtitle: 'Points on a coordinate grid, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about plotting points on a coordinate grid. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Prealgebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Plot each point on the same rectangular coordinate system: $(5,\\ 2)$, $(2,\\ 5)$.',
          answer: '$(5,\\ 2)$: $5$ across, $2$ up. $(2,\\ 5)$: $2$ across, $5$ up.',
          working: 'Across first, then up',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Plot each point on the same rectangular coordinate system: five, two, and two, five.', caption: 'Plot each point on the same rectangular coordinate system: (5, 2), (2, 5).' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Coordinate grid', md: 'A **rectangular coordinate system** is a **coordinate grid**: a horizontal axis going across and a vertical axis going up, which meet at $(0,\\ 0)$. To **plot** a point means to mark it with a dot.' }],
      lines: [
        { say: 'A rectangular coordinate system is the book\'s name for a coordinate grid. It has a horizontal axis going across, and a vertical axis going up. They meet at zero, zero.', show: 'c' },
        { say: 'To plot a point means to find its place on the grid and mark it with a dot. We plot both points on the same grid.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['In $(a,\\ b)$', 'Tells you'],
          rows: [
            ['the **first** number, $a$', 'how far **across**, along the horizontal axis'],
            ['the **second** number, $b$', 'how far **up**, along the vertical axis'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. A point is written as an ordered pair: two numbers in brackets. Always start at zero, zero.', show: 't' },
        { say: 'The first number tells you how far to go across, along the horizontal axis.', focus: 't.0' },
        { say: 'The second number tells you how far to go up. The order matters: across first, then up.', focus: 't.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Plot $(5,\\ 2)$: **across** $5$, **up** $2$', 'Plot $(2,\\ 5)$: **across** $2$, **up** $5$', '**Compare** the two points'] }],
      lines: [
        { say: 'Here is the plan. Plot five, two: across 5, then up 2.', show: 'plan.0' },
        { say: 'Plot two, five: across 2, then up 5.', show: 'plan.1' },
        { say: 'Then compare the two points.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: Plot the points',
      layout: 'split',
      leftWidth: 560,
      left: [plot('g')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(5,\\ 2): \\ \\adj{5 \\text{ across}}, \\ \\opp{2 \\text{ up}}', '(2,\\ 5): \\ \\adj{2 \\text{ across}}, \\ \\opp{5 \\text{ up}}'] }],
      lines: [
        { say: 'Step one. Start at zero, zero. For five, two, go 5 across along the horizontal axis.', show: ['g.grid', 'g.axes', 'g.a1', 'm.0'], focus: 'm.0' },
        { say: 'Then go 2 up, and mark the point with a dot.', show: ['g.a2', 'g.A'] },
        { say: 'Step two. Start at zero, zero again. For two, five, go 2 across, then 5 up, and mark the point.', show: ['g.b1', 'g.b2', 'g.B', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 560,
      left: [plot('c')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(5,\\ 2) \\text{ is low and right}', '(2,\\ 5) \\text{ is high and left}', '\\text{two different points} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by reading the points back. The first point is 5 across and 2 up, so it is five, two. It sits low and to the right.', show: ['c.grid', 'c.axes', 'c.A', 'm.0'] },
        { say: 'The second point is 2 across and 5 up, so it is two, five. It sits high and to the left.', show: ['c.B', 'm.1'] },
        { say: 'The same two numbers in a different order make two different points. It checks out.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$(5,\\ 2)$ plotted at $2$ across, $5$ up', 'the order **matters**: the first number is **across**'],
            ['one dot for both points', '$(5,\\ 2)$ and $(2,\\ 5)$ are **different** points'],
            ['started counting at $1$', 'count the **spaces** from $0$, not the lines'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Going up 5 and across 2 for five, two swaps the order. The first number always tells you how far across.' },
        { say: 'Using one dot for both points forgets that the order matters. These are two different points.' },
        { say: 'And counting the first line as 1 puts the dot one square short. Start at zero, and count the steps.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Point $Q$ is $4$ squares across and $1$ square up from $(0,\\ 0)$. What are its coordinates?',
          choices: ['$(1,\\ 4)$', '$(4,\\ 1)$', '$(4,\\ 4)$', '$(5,\\ 1)$'],
          answer: 1,
          working: 'Across first, then up: (4, 1).',
        },
      ],
      lines: [
        { say: 'Your turn. Point Q is 4 squares across and 1 square up from zero, zero. What are its coordinates? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Across comes first, then up. So Q is at four, one. Choice "B".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Start at $(0,\\ 0)$', 'First number: **across**', 'Second number: **up**', 'Swap the numbers, and you get a **different** point'] }],
      lines: [
        { say: 'Here is what to remember. Start at zero, zero.', show: 'sum.0' },
        { say: 'The first number tells you how far across.', show: 'sum.1' },
        { say: 'The second number tells you how far up.', show: 'sum.2' },
        { say: 'And if you swap the numbers, you get a different point. For more on points on a coordinate grid, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
