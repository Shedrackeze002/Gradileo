import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// y = 3x + 5 for x = 0 to 3, with the change in y (+3) under the table.
const table = (id: string) =>
  figure(id, [valueTable({ x: { title: 'x', values: [0, 1, 2, 3] }, y: { title: 'y', values: [5, 8, 11, 14] }, dx: ['+1', '+1', '+1'], dy: ['+3', '+3', '+3'], titleW: 1.1, cellW: 1.5 })], 280);

const video: Explainer = {
  id: 'm8-6-2-c',
  lessonId: 'm8-6-2',
  title: 'Graphing and Analyzing Linear Relations, Part 3: Matching an Equation to a Table',
  thumbnailTitle: 'Matching an Equation to a Table',
  thumbnail: 'tb',
  summary:
    'In y = 3x + 5, the number that multiplies x (3) is how much y changes when x goes up by 1, and the number added (5) is the value of y when x = 0. A table with y = 5, 8, 11, 14 for x = 0 to 3 goes up by 3 and starts at 5, so it matches y = 3x + 5; x = 3 checks it: 3(3) + 5 = 14. y = x + 7 fits the column x = 1 but not x = 2, and an equation must fit every column.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 3', title: 'Matching an Equation to a Table', subtitle: 'Each number has a job' }],
      lines: [
        { say: 'Here is a puzzle. You have a table of values, and three equations. Which equation made the table?', show: 'title' },
        { say: 'In this part, you will learn what each number in an equation like y equals three x plus five tells you, and use it to match an equation to a table.' },
      ],
    },
    {
      chapter: 'Each number has a job',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'xl', lines: ['y = \\adj{3}x + \\opp{5}'] },
        table('tb'),
        { kind: 'bullets', id: 'b', items: ['The number that **multiplies** $x$ is how much $y$ changes when $x$ goes up by $1$.', 'The number **added** is the value of $y$ when $x = 0$.'] },
      ],
      lines: [
        { say: 'In an equation like y equals three x plus five, each number has a job. Here is its table of values.', show: ['m.0', 'tb.frame', 'tb.xs', 'tb.ys'] },
        { say: 'The number that multiplies x, here three, is how much y changes each time x goes up by one. In the table, y goes up by three every time.', show: ['b.0', 'tb.dxs', 'tb.dys'], focus: 'tb.dys' },
        { say: 'The number that is added, here five, is the value of y when x is zero. Three times zero is zero, so only the five is left.', show: ['b.1', 'tb.hl0'], focus: 'tb.y0' },
      ],
    },
    {
      chapter: 'Which equation fits?',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'text', id: 'q', size: 'md', md: 'Which equation matches the table: $y = 5x + 3$, $y = x + 7$ or $y = 3x + 5$?' }, table('tb')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{change } {+3} \\;\\Rightarrow\\; 3x', 'x = 0, \\ y = 5 \\;\\Rightarrow\\; {+}\\,5', 'y = 3x + 5', '\\text{Check } x = 3\\text{: } 3(3) + 5 = 14 \\;\\good{\\checkmark}'] }],
      lines: [
        { say: 'Which equation matches this table: y equals five x plus three, y equals x plus seven, or y equals three x plus five?', show: ['q', 'tb.frame', 'tb.xs', 'tb.ys'] },
        { say: 'Look at the change first. Each time x goes up by one, y goes up by three. So the equation has three x.', show: ['m.0', 'tb.dys'], focus: ['m.0', 'tb.dys'] },
        { say: 'Now look at x equals zero. There, y is five, so the equation adds five.', show: ['m.1', 'tb.hl0'], focus: ['m.1', 'tb.y0'] },
        { say: 'That gives y equals three x plus five.', show: 'm.2', focus: 'm.2' },
        { say: 'Test it with another column. When x is three, three times three plus five is fourteen. It matches the table.', hide: 'tb.hl0', show: ['m.3', 'tb.hl3'], focus: ['m.3', 'tb.y3'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Testing only one column', md: 'An equation must work for **every** column of the table, not just one.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = x + 7', 'x = 1: \\quad 1 + 7 = 8 \\;\\good{\\checkmark}', 'x = 2: \\quad 2 + 7 = 9, \\text{ not } 11 \\;\\bad{\\times}'] },
      ],
      lines: [
        { say: 'Watch out for this mistake. Try y equals x plus seven. When x is one, it gives one plus seven, which is eight. That matches the table!', show: ['oops', 'm.0', 'm.1'], focus: 'm.1' },
        { say: 'But when x is two, it gives two plus seven, which is nine. The table says eleven. So y equals x plus seven does not match.', show: 'm.2', focus: 'm.2' },
        { say: 'An equation must work for every column of the table, not just one. Always test more than one column.', focus: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A table has $x = 0,\\ 1,\\ 2,\\ 3$ and $y = -4,\\ -2,\\ 0,\\ 2$. Which equation matches it?',
          choices: ['$y = -4x + 2$', '$y = x - 3$', '$y = 2x - 4$', '$y = 2x + 4$'],
          answer: 2,
          working: '$y$ goes up by $2$ each time, so the equation has $2x$. When $x = 0$, $y = -4$, so it adds $-4$: $y = 2x - 4$. Check $x = 3$: $2(3) - 4 = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A table has x equals zero, one, two and three, and y equals negative four, negative two, zero and two. Which equation matches it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, y equals two x minus four. The values of y go up by two, and y is negative four when x is zero. Choice B works when x is one, but not when x is two: it gives negative one, not zero.', show: 'q.answer' },
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
            'The number that multiplies $x$ is the change in $y$ when $x$ goes up by $1$.',
            'The number added is the value of $y$ when $x = 0$.',
            'For the table $5,\\ 8,\\ 11,\\ 14$: $y = 3x + 5$.',
            'Check the equation against every column.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The number that multiplies x is the change in y each time x goes up by one.', show: 'sum.0' },
        { say: 'The number that is added is the value of y when x is zero.', show: 'sum.1' },
        { say: 'Use those two numbers to build the equation.', show: 'sum.2' },
        { say: 'Then check it against every column. In the next part, you will match an equation to a graph. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
