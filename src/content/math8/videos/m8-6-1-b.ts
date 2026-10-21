import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// A table of values for x = 0 to 3.
const table = (id: string, ys: number[]) =>
  figure(id, [valueTable({ x: { title: 'x', values: [0, 1, 2, 3] }, y: { title: 'y', values: ys }, titleW: 1.2, cellW: 1.5 })], 290);

const video: Explainer = {
  id: 'm8-6-1-b',
  lessonId: 'm8-6-1',
  title: 'Linear Relations and Tables of Values, Part 2: Making a Table of Values',
  thumbnailTitle: 'Making a Table of Values',
  thumbnail: 'tb',
  summary:
    'A table of values lists some values of x and the matching values of y. To fill it in, substitute each value of x into the equation, then multiply first and add or subtract. For y = 3x − 2: x = 0 gives 3(0) − 2 = −2, x = 1 gives 1, x = 2 gives 4 and x = 3 gives 7. Write the number in brackets when you substitute: 3(2) = 6, not 32. For y = 4x + 1, the values are 1, 5, 9 and 13.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 2', title: 'Making a Table of Values', subtitle: 'Substitute, then calculate' }],
      lines: [
        { say: 'If you know the equation of a relation, you can find as many pairs of values as you like.', show: 'title' },
        { say: 'In this part, you will make a table of values from an equation, by substituting.' },
      ],
    },
    {
      chapter: 'Tables of values',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Table of values', md: 'A **table of values** lists some values of $x$ and the matching values of $y$.' },
        { kind: 'callout', id: 'sub', tone: 'definition', title: 'Substitute', md: 'To **substitute** a value, replace the variable with the number, then calculate. Multiply first, then add or subtract.' },
      ],
      lines: [
        { say: 'A table of values lists some values of x, and the matching values of y.', show: 'def' },
        { say: 'To fill it in, you substitute each value of x into the equation. Substitute means you replace the letter x with the number, and then calculate.', show: 'sub' },
        { say: 'Remember the order of operations: multiply first, then add or subtract.' },
      ],
    },
    {
      chapter: 'y = 3x − 2',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'text', id: 'q', size: 'md', md: 'Complete the table for $y = 3x - 2$.' }, table('tb', [-2, 1, 4, 7])],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['x = 0: \\;\\; 3(0) - 2 = 0 - 2 = -2', 'x = 1: \\;\\; 3(1) - 2 = 3 - 2 = 1', 'x = 2: \\;\\; 3(2) - 2 = 6 - 2 = 4', 'x = 3: \\;\\; 3(3) - 2 = 9 - 2 = 7'],
        },
      ],
      lines: [
        { say: 'Complete a table of values for y equals three x minus two, using x equals zero, one, two and three.', show: ['q', 'tb.frame', 'tb.xs'] },
        { say: 'Start with x equals zero. Replace x with zero: three times zero, minus two. Multiply first: three times zero is zero. Then zero minus two is negative two.', show: ['m.0', 'tb.y0', 'tb.hl0'], focus: ['m.0', 'tb.y0'] },
        { say: 'Next, x equals one. Three times one is three, and three minus two is one.', hide: 'tb.hl0', show: ['m.1', 'tb.y1', 'tb.hl1'], focus: ['m.1', 'tb.y1'] },
        { say: 'For x equals two: three times two is six, and six minus two is four.', hide: 'tb.hl1', show: ['m.2', 'tb.y2', 'tb.hl2'], focus: ['m.2', 'tb.y2'] },
        { say: 'For x equals three: three times three is nine, and nine minus two is seven.', hide: 'tb.hl2', show: ['m.3', 'tb.y3', 'tb.hl3'], focus: ['m.3', 'tb.y3'] },
        { say: 'So the values of y are negative two, one, four and seven. The table is complete.', hide: 'tb.hl3', focus: 'tb' },
      ],
    },
    {
      chapter: 'Write the multiplication',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Use brackets when you substitute', md: '$3x$ means $3 \\times x$. With $x = 2$, write $3(2)$, which is $6$. Writing the digits side by side gives $32$, which is wrong.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3(2) = 6 \\;\\good{\\checkmark} \\qquad 32 \\;\\bad{\\times}'] },
      ],
      lines: [
        { say: 'Here is a tip. Three x means three times x. When you substitute, write the number in brackets.', show: 'tip' },
        { say: 'With x equals two, three x becomes three, with the two in brackets. That means three times two, which is six.', show: 'm.0', focus: 'm.0' },
        { say: 'If you just write the digits side by side, you get thirty-two, which is wrong. The brackets remind you to multiply.' },
      ],
    },
    {
      chapter: 'One more table',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'text', id: 'q', size: 'md', md: 'Complete the table for $y = 4x + 1$.' }, table('t2', [1, 5, 9, 13])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 0: \\;\\; 4(0) + 1 = 1', 'x = 1: \\;\\; 4(1) + 1 = 5', 'x = 2: \\;\\; 4(2) + 1 = 9', 'x = 3: \\;\\; 4(3) + 1 = 13'] }],
      lines: [
        { say: 'Let’s make one more table, for y equals four x plus one.', show: ['q', 't2.frame', 't2.xs'] },
        { say: 'For x equals zero: four times zero is zero, plus one is one. For x equals one: four times one is four, plus one is five.', show: ['m.0', 'm.1', 't2.y0', 't2.y1'], focus: ['m.1', 't2.y1'] },
        { say: 'For x equals two: four times two is eight, plus one is nine. For x equals three: four times three is twelve, plus one is thirteen.', show: ['m.2', 'm.3', 't2.y2', 't2.y3'], focus: ['m.3', 't2.y3'] },
        { say: 'The values of y are one, five, nine and thirteen.', focus: 't2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a table of values for $y = 2x + 5$, what is $y$ when $x = 3$?',
          choices: ['$10$', '$11$', '$28$', '$16$'],
          answer: 1,
          working: 'Substitute $x = 3$: $y = 2(3) + 5 = 6 + 5 = 11$.',
        },
      ],
      lines: [
        { say: 'Your turn. In a table of values for y equals two x plus five, what is y when x equals three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, eleven. Two times three is six, and six plus five is eleven. Choice C writes the two next to the three, as twenty-three, instead of multiplying.', show: 'q.answer' },
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
            'A table of values lists values of $x$ and the matching values of $y$.',
            'Substitute each value of $x$ into the equation.',
            'Multiply first, then add or subtract.',
            'Write the number in brackets: $3(2) = 6$, not $32$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A table of values lists values of x and the matching values of y.', show: 'sum.0' },
        { say: 'To fill it in, substitute each value of x into the equation.', show: 'sum.1' },
        { say: 'Multiply first, then add or subtract.', show: 'sum.2' },
        { say: 'And write the number in brackets, so you remember to multiply. In the next part, you will substitute negative values of x. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
