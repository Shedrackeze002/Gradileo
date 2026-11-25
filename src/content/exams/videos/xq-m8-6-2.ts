import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { tag, valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// Exam question for Math 8 lesson 6.2 (graphing and analyzing linear relations). The question is a
// Try It from OpenStax Prealgebra 2e, word for word (section 11.2, Graphing Linear Equations, CC
// BY-NC-SA 4.0). Choosing x as multiples of 3 keeps y whole: (−3, −2), (0, −1), (3, 0), (6, 1). The
// book's graph passes through (0, −1) and (3, 0).

const QUESTION = 'Graph the equation: y = (1/3)x − 1.';

const PTS: [number, number][] = [[-3, -2], [0, -1], [3, 0], [6, 1]];

const graph = (id: string, extra = false) => {
  const g = plane({ x: [-4, 7], y: [-4, 4] });
  return figure(id, [
    g,
    plot(g, { id: 'ln', f: (x) => x / 3 - 1, tone: 'good' }),
    dots(g, PTS.map(([x, y], i) => ({ id: `p${i}`, x, y, tone: 'theta' as const }))),
    ...(extra ? [tag(g, 'six', 6, 1, '(6,\\ 1)', 'above', 'theta')] : []),
  ]);
};
const table = (id: string) =>
  figure(id, [valueTable({ x: { title: 'x', values: PTS.map((p) => p[0]) }, y: { title: 'y', values: PTS.map((p) => p[1]) }, titleW: 1, cellW: 1.4 })], 220);

const video: Explainer = {
  id: 'xq-m8-6-2',
  lessonId: '',
  exam: {
    lesson: 'm8-6-2',
    source: 'OpenStax, Prealgebra 2e, Try It in section 11.2, Graphing Linear Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/prealgebra-2e/pages/11-2-graphing-linear-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Graph y = (1/3)x − 1 (Graphing Linear Relations)',
  thumbnailTitle: 'Graph a Line',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: graph the equation y = (1/3)x − 1. We make a table of values, choosing x values that are multiples of 3 so that y comes out whole: (−3, −2), (0, −1), (3, 0) and (6, 1). Then we plot the points and join them with a straight line. The line crosses the y-axis at −1 and goes up 1 for every 3 across. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Graph a Line', subtitle: 'Graphing linear relations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about graphing a linear relation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Graph the equation: $y = \\tfrac13 x - 1$.',
          answer: 'the line through $(0, -1)$ and $(3, 0)$',
          working: 'table: (−3, −2), (0, −1), (3, 0), (6, 1)',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Graph the equation: "y" equals 1 third "x", minus 1.', caption: 'Graph the equation: y = (1/3)x − 1.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 520,
      left: [graph('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'Graph an equation', md: 'To **graph** the equation, draw every point $(x, y)$ that makes it true. For a **linear** equation, those points make a **straight line**, so we only need a few of them.' }],
      lines: [
        { say: 'Here is a coordinate plane. To graph the equation, we draw every point that makes it true.', show: ['ask.grid', 'ask.axes'] },
        { say: 'For a linear equation, those points make a straight line. So we only need to find a few points, and join them.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{choose } x \\ \\to \\ \\text{work out } y \\ \\to \\ \\text{plot } (x, y)', '\\tfrac13 x \\text{ is whole when } x \\text{ is a multiple of } 3'] }],
      lines: [
        { say: 'Here is what we need. Choose a value of "x", work out "y", and plot the point.', show: 'm.0' },
        { say: 'A useful trick: 1 third of "x" is a whole number when "x" is a multiple of 3. So we choose "x" values like negative 3, 0, 3 and 6.', caption: 'A useful trick: (1/3)x is a whole number when x is a multiple of 3. So we choose x values like −3, 0, 3 and 6.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Make a **table of values**', '**Plot** the points', 'Join them with a **straight line**'] }],
      lines: [
        { say: 'Here is the plan. Make a table of values.', show: 'plan.0' },
        { say: 'Plot the points.', show: 'plan.1' },
        { say: 'Then join them with a straight line.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Table, points, line',
      layout: 'split',
      leftWidth: 520,
      left: [graph('gr')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 0: \\ y = 0 - 1 = -1', 'x = 3: \\ y = 1 - 1 = 0', 'x = -3: \\ y = -1 - 1 = -2', 'x = 6: \\ y = 2 - 1 = 1'] }, table('tb')],
      lines: [
        { say: 'Step one. When "x" is 0, 1 third of 0 is 0, and 0 minus 1 is negative 1.', caption: 'Step one. When x = 0, (1/3) × 0 = 0, and 0 − 1 = −1.', show: ['gr.grid', 'gr.axes', 'm.0'], focus: 'm.0' },
        { say: 'When "x" is 3, 1 third of 3 is 1, and 1 minus 1 is 0. When "x" is negative 3, "y" is negative 1 minus 1, negative 2. When "x" is 6, "y" is 2 minus 1, which is 1.', caption: 'When x = 3, (1/3) × 3 = 1, and 1 − 1 = 0. When x = −3, y = −1 − 1 = −2. When x = 6, y = 2 − 1 = 1.', show: ['m.1', 'm.2', 'm.3', 'tb.frame', 'tb.xs', 'tb.ys'], focus: 'tb.ys' },
        { say: 'Step two. Plot the four points: the point at negative 3, negative 2; the point at 0, negative 1; the point at 3, 0; and the point at 6, 1.', caption: 'Step two. Plot the four points: (−3, −2), (0, −1), (3, 0) and (6, 1).', show: ['gr.p0', 'gr.p1', 'gr.p2', 'gr.p3'] },
        { say: 'Step three. They lie in a straight line. Join them, and carry the line on past them with a ruler. That is the graph.', show: 'gr.ln', focus: 'gr.ln' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 520,
      left: [graph('ck', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{crosses the } y\\text{-axis at } {-1} \\ \\checkmark', '\\text{up } 1 \\text{ for every } 3 \\text{ across} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. The line crosses the "y" axis at negative 1: the number added at the end of the equation.', caption: 'Let us check. The line crosses the y-axis at −1: the number added at the end of the equation.', show: ['ck.grid', 'ck.axes', 'ck.ln', 'ck.p0', 'ck.p1', 'ck.p2', 'ck.p3', 'm.0'], focus: ['ck.p1', 'm.0'] },
        { say: 'And it goes up 1 for every 3 across, because "x" is multiplied by 1 third. From the point at 3, 0, go 3 across and 1 up, to the point at 6, 1. It checks out.', caption: 'And it goes up 1 for every 3 across, because x is multiplied by 1/3. From (3, 0), go 3 across and 1 up, to (6, 1). It checks out.', show: ['m.1', 'ck.six'], focus: ['m.1', 'ck.p3'] },
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
            ['a line through $(0, 1)$', 'lost the minus: when $x = 0$, $y = -1$'],
            ['a steep line', 'read $\\tfrac13 x$ as $3x$: it rises $1$ for every $3$ across'],
            ['points like $(1, -\\tfrac23)$', 'not wrong, but hard to plot: use multiples of $3$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A line through the point at 0, 1 loses the minus sign. When "x" is 0, "y" is negative 1.', caption: 'A line through (0, 1) loses the minus sign. When x = 0, y = −1.' },
        { say: 'A steep line reads 1 third "x" as 3 "x". This line is gentle: it rises 1 for every 3 across.', caption: 'A steep line reads (1/3)x as 3x. This line is gentle: it rises 1 for every 3 across.' },
        { say: 'And points like 1, negative 2 thirds are not wrong, but they are hard to plot accurately. Choose "x" values that are multiples of 3.', caption: 'And points like (1, −2/3) are not wrong, but they are hard to plot accurately. Choose x values that are multiples of 3.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which point is on the graph of $y = \\tfrac12 x + 2$?',
          choices: ['$(4, 4)$', '$(2, 1)$', '$(0, -2)$', '$(4, 0)$'],
          answer: 0,
          working: 'When x = 4, y = 2 + 2 = 4, so (4, 4) is on the line.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is on the graph of "y" equals 1 half "x", plus 2? Pause the video and try it.', caption: 'Your turn. Which point is on the graph of y = (1/2)x + 2? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'When "x" is 4, half of 4 is 2, and 2 plus 2 is 4. So the point at 4, 4 is on the line. Choice "A".', caption: 'When x = 4, half of 4 is 2, and 2 + 2 = 4. So (4, 4) is on the line. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Make a **table**: choose $x$, work out $y$', 'With $\\tfrac13 x$, choose **multiples of 3**', '**Plot** the points, join with a **straight line**', 'Check: where it **crosses** the $y$-axis'] }],
      lines: [
        { say: 'Here is what to remember. Make a table: choose "x", and work out "y".', show: 'sum.0' },
        { say: 'With 1 third "x", choose multiples of 3, so "y" comes out whole.', caption: 'With (1/3)x, choose multiples of 3, so y comes out whole.', show: 'sum.1' },
        { say: 'Plot the points, and join them with a straight line.', show: 'sum.2' },
        { say: 'And check where the line crosses the "y" axis. For more on graphing and analyzing linear relations, watch this lesson\'s explainer video on Gradileo.', caption: 'And check where the line crosses the y-axis. For more on graphing and analyzing linear relations, watch this lesson’s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
