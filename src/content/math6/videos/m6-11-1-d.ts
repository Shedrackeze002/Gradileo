import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// The bean plant's table: w weeks, h = 3w + 4 centimetres.
const ROWS = [['0', '4'], ['1', '7'], ['2', '10'], ['3', '13'], ['4', '16']];
const HEAD = ['Weeks, $w$', 'Height, $h\\ (\\text{cm})$'];

const video: Explainer = {
  id: 'm6-11-1-d',
  lessonId: 'm6-11-1',
  title: 'Independent and Dependent Variables, Part 4: Tables of Values',
  thumbnailTitle: 'Tables of Values',
  thumbnail: 'up',
  summary: 'A table of values lists values of the independent variable in the first column and the matching values of the dependent variable in the second. For the bean plant (multiply the weeks by 3, then add 4) the rows are 0 → 4, 1 → 7, 2 → 10, 3 → 13 and 4 → 16; the rule checks each row (4 × 3 + 4 = 16), and each row goes up by 3 cm because the plant grows 3 cm a week.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Functions · Part 4', title: 'Tables of Values', subtitle: 'Every row follows the rule' }],
      lines: [
        { say: 'A rule gives you one height at a time. But what if you want to see many weeks at once, and spot a pattern?', show: 'title' },
        { say: 'In this video, you will put the values of a function in a table of values, and check each row with the rule.' },
      ],
    },
    {
      chapter: 'A table of values',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: HEAD, rows: ROWS }],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Table of values', md: 'A **table of values** lists values of the **independent** variable in the first column, and the matching values of the **dependent** variable in the second column.' }],
      lines: [
        { say: 'A table of values lists values of the independent variable in the first column, and the matching values of the dependent variable in the second column.', show: 'def' },
        { say: 'For the bean plant, the first column is the number of weeks, w. The second column is the height, h, in centimetres.', show: 't.0', focus: 't.0' },
        { say: 'When w is zero, h is four. When w is one, h is seven. When w is two, h is ten.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'When w is three, h is thirteen. And when w is four, h is sixteen.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Checking a row',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: HEAD, rows: ROWS }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['w = 4', '\\times 3\\!: \\quad 4 \\times 3 = 12', '+ 4\\!: \\quad 12 + 4 = 16 \\;\\checkmark', 'h = 16'] }],
      lines: [
        { say: 'Every row of the table must follow the rule: multiply the weeks by three, then add four. Let’s check the row for w equals four.', show: ['t', 'm.0'], focus: 't.4' },
        { say: 'Multiply by three: four times three is twelve.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add four: twelve plus four is sixteen. That matches the table!', show: 'm.2', focus: 'm.2' },
        { say: 'So when w is four, h is sixteen. You can check every other row the same way.', show: 'm.3', focus: ['m.3', 't.4'] },
      ],
    },
    {
      chapter: 'Up by three',
      layout: 'center',
      main: [
        figure('up', [valueTable({ x: { title: '\\text{Weeks, } w', values: [0, 1, 2, 3, 4, 5, 6] }, y: { title: '\\text{Height, } h', values: [4, 7, 10, 13, 16, 19, 22] }, dy: ['+3', '+3', '+3', '+3', '+3', '+3'], extra: 2, titleW: 3.4, cellW: 1.5 })], 300),
        { kind: 'callout', id: 'key', tone: 'key', title: 'A pattern in the table', md: 'Each row goes up by $3\\text{ cm}$, because the plant grows $3\\text{ cm}$ each week.' },
      ],
      lines: [
        { say: 'Here is the same table, turned on its side so the weeks go across. Look at how the height changes from one week to the next.', show: ['up.frame', 'up.xs', 'up.ys'] },
        { say: 'Four, seven, ten, thirteen, sixteen. Each time, the height goes up by three centimetres.', show: 'up.dys', focus: 'up.dys' },
        { say: 'That is because the plant grows three centimetres each week. The three in the rule shows up as a pattern in the table.', show: 'key' },
        { say: 'You can use the pattern to extend the table: sixteen plus three is nineteen for week five, and nineteen plus three is twenty-two for week six.', show: 'up.more', focus: 'up.more' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Another plant has the rule: multiply the number of weeks, $w$, by $2$, then add $5$ to get its height, $h$. Which row of its table of values is correct?',
          choices: ['$w = 3,\\ h = 10$', '$w = 4,\\ h = 18$', '$w = 0,\\ h = 0$', '$w = 6,\\ h = 17$'],
          answer: 3,
          working: '$6 \\times 2 + 5 = 12 + 5 = 17$ ✓. The others: $3 \\times 2 + 5 = 11$, $4 \\times 2 + 5 = 13$ and $0 \\times 2 + 5 = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Another plant has the rule: multiply the number of weeks, w, by two, then add five to get its height, h. Which row of its table of values is correct? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D. Six times two is twelve, and twelve plus five is seventeen. Choice B adds five first and then multiplies, but the rule multiplies first.', show: 'q.answer' },
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
          items: ['A table of values lists the independent variable first and the dependent variable second.', 'Every row follows the rule. Check a row by using the rule.', 'A pattern in the table, like going up by $3$, comes from the rule.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A table of values lists the independent variable in the first column, and the dependent variable in the second.', show: 'sum.0' },
        { say: 'Every row follows the rule, and you can check any row by using the rule.', show: 'sum.1' },
        { say: 'And a pattern in the table, like going up by three each time, comes from the rule. In the next part, you will show the table as points on a graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
