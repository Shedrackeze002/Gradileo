import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'mx-24-3',
  lessonId: 'mx-24-3',
  title: 'Linear Programming',
  thumbnail: 'm',
  summary: 'Linear programming finds the greatest or least value of a linear objective when the variables must satisfy linear inequalities, the constraints. "At most" is ≤ and "at least" is ≥. The points that satisfy every constraint form the feasible region, and the best value is always at a corner, so we find the corners, work out the objective at each and compare.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Formulae, Variation and Linear Programming', title: 'Linear Programming', subtitle: 'Making the best of limited resources' }],
      lines: [
        { say: 'A carpenter has limited time and limited wood, and earns a different profit on each chair and each table. How many of each should the carpenter make to earn the most?', show: 'title' },
        { say: 'In this video, you will learn to solve problems like this with linear programming.' },
      ],
    },
    {
      chapter: 'Constraints',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Linear programming', md: 'Finding the greatest or least value of a linear **objective** when the variables satisfy linear inequalities, the **constraints**. The points that satisfy every constraint form the **feasible region**.' },
        { kind: 'text', id: 'q', md: 'Pens cost \\$3 and notebooks \\$5. Amara buys $x$ pens and $y$ notebooks, and can spend at most \\$60.', size: 'md' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['3x + 5y \\le 60, \\quad x \\ge 0, \\quad y \\ge 0'] },
      ],
      lines: [
        { say: 'Linear programming finds the greatest or least value of a linear expression, called the objective, when the variables must satisfy some linear inequalities, called the constraints.', show: 'def' },
        { say: 'We first write each limit as an inequality. Pens cost three dollars and notebooks five dollars, and Amara can spend at most sixty dollars.', show: 'q' },
        { say: 'At most means less than or equal to. And we cannot buy a negative number of things, so x and y are both at least zero.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The feasible region',
      layout: 'split',
      left: [
        {
          kind: 'diagram',
          id: 'g',
          height: 460,
          points: { O: [0, 0], X: [8.5, 0], Y: [0, 7.5], A: [6, 0], B: [6, 2], C: [3, 5], D: [0, 5], A2: [6, 5], D2: [6, 5], E1: [8, 0], E2: [0.5, 7.5], Q: [6, 5] },
          items: [
            { kind: 'line', id: 'xa', from: 'O', to: 'X', arrow: true, weight: 2.5 },
            { kind: 'line', id: 'ya', from: 'O', to: 'Y', arrow: true, weight: 2.5 },
            { kind: 'line', id: 'l1', from: 'A', to: 'A2', tone: 'muted', dashed: true },
            { kind: 'line', id: 'l2', from: 'D', to: 'D2', tone: 'muted', dashed: true },
            { kind: 'line', id: 'l3', from: 'E1', to: 'E2', tone: 'muted', dashed: true, label: 'x + y = 8', labelAt: 0.05, labelSide: 'right' },
            { kind: 'region', id: 'fr', points: ['O', 'A', 'B', 'C', 'D'], tone: 'brand', shade: 0.3 },
            { kind: 'label', id: 'pO', at: 'O', tex: '(0, 0)', place: 'below', dot: true },
            { kind: 'label', id: 'pA', at: 'A', tex: '(6, 0)', place: 'below', dot: true },
            { kind: 'label', id: 'pB', at: 'B', tex: '(6, 2)', place: 'right', dot: true },
            { kind: 'label', id: 'pC', at: 'C', tex: '(3, 5)', place: 'above', dot: true },
            { kind: 'label', id: 'pD', at: 'D', tex: '(0, 5)', place: 'left', dot: true },
            { kind: 'label', id: 'pQ', at: 'Q', tex: '(6, 5)', place: 'right', dot: true, open: true, tone: 'bad' },
          ],
        },
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x \\ge 0, \\ y \\ge 0', 'x \\le 6, \\ y \\le 5', 'x + y \\le 8'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not every crossing is a corner', md: '$(6, 5)$ breaks $x + y \\le 8$, so it is outside the region.' },
      ],
      lines: [
        { say: 'Here are five constraints. Each one keeps the points on one side of a straight boundary line.', show: ['g.xa', 'g.ya', 'm.0', 'm.1', 'm.2'] },
        { say: 'Drawing the boundary lines, the points that satisfy every constraint form a polygon. This is the feasible region.', show: ['g.l1', 'g.l2', 'g.l3', 'g.fr'] },
        { say: 'Its corners are where the boundary lines meet. For example, x plus y equals eight meets x equals six where y is two.', show: ['g.pO', 'g.pA', 'g.pB', 'g.pC', 'g.pD'] },
        { say: 'The lines x equals six and y equals five also cross, but six plus five is eleven, which is more than eight. That crossing is outside the region, so it is not a corner.', show: ['g.pQ', 'oops'] },
      ],
    },
    {
      chapter: 'Test the corners',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The corner rule', md: 'The greatest and least values of a linear objective are found at corners of the feasible region.' },
        {
          kind: 'table',
          id: 'tb',
          head: ['Corner', '$P = 3x + 2y$'],
          rows: [
            ['$(0, 0)$', '$0$'],
            ['$(6, 0)$', '$18$'],
            ['$(6, 2)$', '$22$'],
            ['$(3, 5)$', '$19$'],
            ['$(0, 5)$', '$10$'],
          ],
        },
      ],
      lines: [
        { say: 'The objective, such as P equals three x plus two y, is the same along each of a family of parallel lines. As we slide the line to increase P, the last point of the region it touches is a corner.', show: 'tip' },
        { say: 'So we work out P at each corner. At the origin it is zero, and at six, zero it is eighteen.', show: ['tb.0', 'tb.1'] },
        { say: 'At six, two it is eighteen plus four, which is twenty-two.', show: 'tb.2' },
        { say: 'At three, five it is nineteen, and at zero, five it is ten.', show: ['tb.3', 'tb.4'] },
        { say: 'So the greatest value of P is twenty-two, at the corner where x is six and y is two.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For the same region, find the greatest value of $Q = x + 4y$.',
          choices: ['$10$', '$14$', '$20$', '$23$'],
          answer: 3,
          working: '$(0, 0)$: $0$. $(6, 0)$: $6$. $(6, 2)$: $14$. $(3, 5)$: $23$. $(0, 5)$: $20$. The greatest is $23$.',
        },
      ],
      lines: [
        { say: 'Your turn. For the same region, find the greatest value of Q equals x plus four y. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Q is twenty-three at the corner where x is three and y is five, which is more than at any other corner. Choice C stops at the corner where x is zero.', show: 'q.answer' },
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
          items: ['Constraints are inequalities; together they give the feasible region.', '"At most" is $\\le$ and "at least" is $\\ge$.', 'The objective is what we make as large or small as possible.', 'The best value is at a corner, so test every corner.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The constraints are the inequalities the variables must satisfy, and together they give the feasible region.', show: 'sum.0' },
        { say: 'At most means less than or equal to, and at least means greater than or equal to.', show: 'sum.1' },
        { say: 'The objective is the linear expression we make as large or as small as possible.', show: 'sum.2' },
        { say: 'And the best value is always at a corner of the feasible region, so test every corner. See you in the next lesson!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
