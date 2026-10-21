import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// A table of values with arcs for the change in x (above) and in y (below).
const table = (id: string, xs: number[], ys: number[], dx: string, dy: string, tone: 'good' | 'bad') =>
  figure(
    id,
    [
      valueTable({
        x: { title: 'x', values: xs },
        y: { title: 'y', values: ys },
        dx: xs.slice(1).map(() => dx),
        dy: ys.slice(1).map(() => dy),
        dyTones: ys.slice(1).map(() => tone),
        titleW: 1.1,
        cellW: 1.4,
      }),
    ],
    290,
  );

const video: Explainer = {
  id: 'm8-6-1-d',
  lessonId: 'm8-6-1',
  title: 'Linear Relations and Tables of Values, Part 4: Describing the Pattern',
  thumbnailTitle: 'Describing the Pattern',
  thumbnail: 'up',
  summary:
    'Read a table of values from left to right. For y = 3x − 2, y goes −2, 1, 4, 7: as x increases by 1, y increases by 3, the number that multiplies x. For y = −2x − 1, y goes 3, 1, −1, −3, −5: as x increases by 1, y decreases by 2. If x goes up by 2 each time, the change in y is for two steps: 6 ÷ 2 = 3 for each 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 4', title: 'Describing the Pattern', subtitle: 'How much does y change?' }],
      lines: [
        { say: 'When you read across a table of values, you can see a pattern.', show: 'title' },
        { say: 'In this part, you will describe how y changes each time x goes up by one, and find where that change comes from in the equation.' },
      ],
    },
    {
      chapter: 'Going up',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The table for $y = 3x - 2$' },
        table('up', [0, 1, 2, 3], [-2, 1, 4, 7], '+1', '+3', 'good'),
        { kind: 'math', id: 'm', size: 'md', lines: ['1 - (-2) = 3 \\qquad 4 - 1 = 3 \\qquad 7 - 4 = 3'] },
      ],
      lines: [
        { say: 'Here is the table for y equals three x minus two. Read it from left to right. Each time, x goes up by one.', show: ['q', 'up.frame', 'up.xs', 'up.ys', 'up.dxs'] },
        { say: 'Now find each change in y. From negative two to one, the change is one minus negative two, which is three. From one to four is three, and from four to seven is three again.', show: ['m.0', 'up.dys'], focus: ['m.0', 'up.dys'] },
        { say: 'The change is always three. And three is the number that multiplies x in the equation!' },
        { say: 'So we describe the pattern like this: as x increases by one, y increases by three.' },
      ],
    },
    {
      chapter: 'Going down',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The table for $y = -2x - 1$' },
        table('dn', [-2, -1, 0, 1, 2], [3, 1, -1, -3, -5], '+1', '-2', 'bad'),
        { kind: 'callout', id: 'key', tone: 'key', title: 'The number that multiplies x', md: 'It tells you how much $y$ changes each time $x$ goes up by $1$: **up** if it is positive, **down** if it is negative.' },
      ],
      lines: [
        { say: 'Now look at the table for y equals negative two x minus one. The values of y go three, one, negative one, negative three, negative five.', show: ['q', 'dn.frame', 'dn.xs', 'dn.ys', 'dn.dxs'] },
        { say: 'Each time x goes up by one, y goes down by two. The change is negative two, the number that multiplies x.', show: 'dn.dys', focus: 'dn.dys' },
        { say: 'So, as x increases by one, y decreases by two.' },
        { say: 'The number that multiplies x tells you how much y changes each time x goes up by one. If it is positive, y goes up. If it is negative, y goes down.', show: 'key' },
      ],
    },
    {
      chapter: 'Steps of two',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: '$y = 3x - 2$, with $x$ going up by $2$' },
        table('two', [0, 2, 4, 6], [-2, 4, 10, 16], '+2', '+6', 'good'),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Watch the steps in x', md: 'If $x$ goes up by $2$ each time, the change in $y$ is for two steps. Divide it by $2$: $6 \\div 2 = 3$ for each $1$.' },
      ],
      lines: [
        { say: 'Watch the steps in x. In this table for y equals three x minus two, x goes up by two each time: zero, two, four, six.', show: ['q', 'two.frame', 'two.xs', 'two.ys', 'two.dxs'], focus: 'two.dxs' },
        { say: 'The values of y are negative two, four, ten and sixteen. They go up by six each time.', show: 'two.dys', focus: 'two.dys' },
        { say: 'But that change of six is for a step of two in x. Divide it by two: six divided by two is three. So y still goes up by three for each step of one.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $y = -4x + 1$, how does $y$ change each time $x$ goes up by $1$?',
          choices: ['It goes down by $4$.', 'It goes up by $4$.', 'It goes up by $1$.', 'It goes down by $1$.'],
          answer: 0,
          working: 'The number that multiplies $x$ is $-4$, so $y$ goes down by $4$. Check: $x = 0$ gives $1$ and $x = 1$ gives $-3$.',
        },
      ],
      lines: [
        { say: 'Your turn. For y equals negative four x plus one, how does y change each time x goes up by one? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: y goes down by four. The number that multiplies x is negative four. Check: when x is zero, y is one, and when x is one, y is negative three. Choice B has the right size, but the number is negative, so y goes down, not up.', show: 'q.answer' },
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
            'In a linear relation, $y$ changes by the same amount each time $x$ goes up by $1$.',
            '$y = 3x - 2$: as $x$ increases by $1$, $y$ increases by $3$.',
            '$y = -2x - 1$: as $x$ increases by $1$, $y$ decreases by $2$.',
            'If $x$ goes up by $2$, divide the change in $y$ by $2$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a linear relation, y changes by the same amount each time x goes up by one.', show: 'sum.0' },
        { say: 'That amount is the number that multiplies x. For y equals three x minus two, y goes up by three.', show: 'sum.1' },
        { say: 'For y equals negative two x minus one, y goes down by two.', show: 'sum.2' },
        { say: 'And if x goes up by two each time, divide the change in y by two. In the next part, you will use linear relations in real life. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
