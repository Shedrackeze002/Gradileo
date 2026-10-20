import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// The lesson's table: y = 4x + 5.
const table = (id: string) =>
  figure(id, [valueTable({ x: { title: 'x', values: [0, 1, 2, 3, 4] }, y: { title: 'y', values: [5, 9, 13, 17, 21] }, dx: ['+1', '+1', '+1', '+1'], dy: ['+4', '+4', '+4', '+4'], titleW: 1.6, cellW: 1.5 })], 300);

const video: Explainer = {
  id: 'm6-11-2-b',
  lessonId: 'm6-11-2',
  title: 'Function Rules and Equations, Part 2: From a Table to an Equation',
  thumbnailTitle: 'From a Table to an Equation',
  thumbnail: 'tb',
  summary: 'To write an equation from a table of values: the change in y for each step of 1 in x is what you multiply x by, then the value of y when x = 0 tells you what to add. For x = 0, 1, 2, 3, 4 and y = 5, 9, 13, 17, 21, y goes up by 4, and 4 × 0 = 0 but y = 5, so y = 4x + 5 (check: 4 × 3 + 5 = 17). y = x + 4 is wrong: it gives 5, not 9, when x = 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Function Rules and Equations · Part 2', title: 'From a Table to an Equation', subtitle: 'What to multiply by, then what to add' }],
      lines: [
        { say: 'Sometimes you have a table of values, but nobody tells you the rule. Can you find the rule yourself, and write it as an equation?', show: 'title' },
        { say: 'In this video, you will learn two steps to find the equation of a function from its table.' },
      ],
    },
    {
      chapter: 'Step 1: what to multiply by',
      layout: 'center',
      main: [
        table('tb'),
        { kind: 'math', id: 'm', size: 'md', lines: ['x \\text{ goes up by } 1, \\quad y \\text{ goes up by } \\good{4}', '\\text{so the rule multiplies } x \\text{ by } 4\\!: \\quad \\good{4}x'] },
      ],
      lines: [
        { say: 'Here is a table of values. The x values are zero, one, two, three and four. The y values are five, nine, thirteen, seventeen and twenty-one.', show: ['tb.frame', 'tb.xs', 'tb.ys'] },
        { say: 'Look at how the values change. Each time x goes up by one, y goes up by four.', show: ['tb.dxs', 'tb.dys', 'm.0'], focus: ['tb.dys', 'm.0'] },
        { say: 'When x goes up by one and y goes up by four every time, the rule multiplies x by four. So the rule starts with four x.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: what to add',
      layout: 'center',
      main: [
        table('st'),
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 0\\!: \\quad 4x = 0, \\text{ but } y = 5', '\\text{so the rule also adds } 5\\!: \\quad y = 4x + 5'] },
      ],
      lines: [
        { say: 'Now find what to add. Look at the column where x is zero.', show: ['st.frame', 'st.xs', 'st.ys', 'st.hl0'], focus: ['st.x0', 'st.y0'] },
        { say: 'When x is zero, four x is four times zero, which is zero. But y is five, not zero.', show: 'm.0', focus: 'm.0' },
        { say: 'So the rule must also add five. The equation is y equals four x plus five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check another column',
      layout: 'center',
      main: [
        table('ck'),
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 3\\!: \\quad 4 \\times 3 + 5 = 12 + 5 = 17 \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Always check', md: 'Test your equation on another column of the table.' },
      ],
      lines: [
        { say: 'Always check your equation on another column. Try x equals three.', show: ['ck.frame', 'ck.xs', 'ck.ys', 'ck.hl3'], focus: ['ck.x3', 'ck.y3'] },
        { say: 'Four times three is twelve, and twelve plus five is seventeen. The table says seventeen. It works!', show: 'm', focus: 'm' },
        { say: 'So the equation for this table is y equals four x plus five.', show: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using only the change', md: '$y$ goes up by $4$ each time, but $y = x + 4$ is **wrong**: when $x = 1$ it gives $5$, not $9$. The change tells you what to **multiply** $x$ by. Then find what to add.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{y = x + 4}\\!: \\quad 1 + 4 = 5 \\ne 9', '\\good{y = 4x + 5}\\!: \\quad 4 \\times 1 + 5 = 9 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Here is a common mistake. Since y goes up by four each time, some people write y equals x plus four.', show: 'oops' },
        { say: 'Test it. When x is one, x plus four is five. But the table says nine. So that equation is wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'The change tells you what to multiply x by, not what to add. Four times one plus five is nine, which matches.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A table of values has $x = 0,\\ 1,\\ 2,\\ 3$ and $y = 2,\\ 5,\\ 8,\\ 11$. Which equation fits the table?',
          choices: ['$y = 3x + 2$', '$y = x + 3$', '$y = 2x + 3$', '$y = 3x$'],
          answer: 0,
          working: '$y$ goes up by $3$, so multiply $x$ by $3$. When $x = 0$, $y = 2$, so add $2$: $y = 3x + 2$. Check: $3 \\times 3 + 2 = 11$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. A table of values has x equal to zero, one, two and three, and y equal to two, five, eight and eleven. Which equation fits the table? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is A: y equals three x plus two. y goes up by three, so multiply x by three, and when x is zero, y is two, so add two. Choice B uses the change as the number to add.', show: 'q.answer' },
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
          items: ['The change in $y$ for each step of $1$ in $x$ is what you multiply $x$ by.', 'The value of $y$ when $x = 0$ tells you what to add.', 'Check your equation on another column.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The change in y, each time x goes up by one, is what you multiply x by.', show: 'sum.0' },
        { say: 'The value of y when x is zero tells you what to add.', show: 'sum.1' },
        { say: 'And always check your equation on another column of the table. In the next part, you will use an equation to find values. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
