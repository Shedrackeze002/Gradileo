import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// Exam question for Math 9 lesson 4.2 (graphing linear relations). The question is a Try It from
// OpenStax Elementary Algebra 2e, word for word (section 4.2, Graph Linear Equations in Two
// Variables, CC BY-NC-SA 4.0). For x = 0, 1, 2, 3, y = 2x − 3 gives −3, −1, 1, 3. Plot the points
// and draw the line through them. Check with x = −1: y = −5, which is on the same line.

const QUESTION = 'Graph the equation by plotting points: y = 2x − 3.';

const PTS: [number, number][] = [[0, -3], [1, -1], [2, 1], [3, 3]];
const TEX = ['(0,\\ {-3})', '(1,\\ {-1})', '(2,\\ 1)', '(3,\\ 3)'];

const table = (id: string) =>
  figure(
    id,
    [valueTable({ x: { title: 'x', values: PTS.map((p) => p[0]) }, y: { title: 'y', values: PTS.map((p) => p[1]) }, dy: ['+2', '+2', '+2'], titleW: 1.2, cellW: 1.6 })],
    220,
  );

const graph = (id: string) => {
  const g = plane({ x: [-2, 5], y: [-6, 5], width: 6.4, height: 7.6 });
  return figure(
    id,
    [
      g,
      polyline(g, { id: 'ln', points: [[-1.5, -6], [4, 5]], tone: 'good' }),
      dots(g, PTS.map(([x, y], i) => ({ id: `p${i}`, x, y, tex: TEX[i], tone: 'opp' as const, place: 'below right' as const }))),
      dots(g, [{ id: 'chk', x: -1, y: -5, tex: '({-1},\\ {-5})', tone: 'adj', place: 'below right' }]),
    ],
    560,
  );
};

const video: Explainer = {
  id: 'xq-m9-4-2',
  lessonId: '',
  exam: {
    lesson: 'm9-4-2',
    source: 'OpenStax, Elementary Algebra 2e, Try It in section 4.2, Graph Linear Equations in Two Variables',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/4-2-graph-linear-equations-in-two-variables',
    question: QUESTION,
  },
  title: 'Exam Question: Graph y = 2x − 3 (Graphing Linear Relations)',
  thumbnailTitle: 'Graph y = 2x − 3',
  thumbnail: 'st',
  summary:
    'A real test question, solved one small step at a time: graph the equation y = 2x − 3 by plotting points. We choose x = 0, 1, 2 and 3, and work out y = −3, −1, 1 and 3. We plot the points (0, −3), (1, −1), (2, 1) and (3, 3), and draw a straight line through them. Then we check with another point and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Graph y = 2x − 3', subtitle: 'Graphing linear relations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about graphing linear relations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Graph the equation by plotting points: $y = 2x - 3$.',
          answer: 'a straight line through $(0, -3)$, $(1, -1)$, $(2, 1)$ and $(3, 3)$',
          working: 'x = 0, 1, 2, 3 gives y = −3, −1, 1, 3',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book.', show: 'q' },
        { say: 'Graph the equation by plotting points: "y" equals 2 "x" minus 3.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = 2x - 3'] },
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Linear relation', md: 'In a **linear relation**, $y$ changes by the **same amount** each time $x$ goes up by $1$, so its graph is a **straight line**. Each point on the line makes the equation **true**.' },
      ],
      lines: [
        { say: 'The equation tells us how to get "y" from "x": double "x", then subtract 3.', show: 'm.0' },
        { say: 'In a linear relation, "y" changes by the same amount each time "x" goes up by 1, so the graph is a straight line. Each point on the line makes the equation true.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{choose } x \\to \\text{work out } y \\to \\text{plot } (x,\\ y)', '\\text{a straight line needs } 2 \\text{ points; use } 3 \\text{ or more to check}'] }],
      lines: [
        { say: 'Here is what we need. Choose a value of "x", work out "y", and plot the point with those coordinates.', show: 'm.0' },
        { say: 'Two points are enough for a straight line, but a third point checks for mistakes.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Make a **table** of values', '**Plot** the points', 'Draw a **straight line** through them'] }],
      lines: [
        { say: 'Here is the plan. Make a table of values.', show: 'plan.0' },
        { say: 'Plot the points.', show: 'plan.1' },
        { say: 'Then draw a straight line through them.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: A table of values',
      layout: 'split',
      leftWidth: 520,
      left: [table('tb')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 0: \\ 2(0) - 3 = {-3}', 'x = 1: \\ 2(1) - 3 = {-1}', 'x = 2: \\ 2(2) - 3 = 1', 'x = 3: \\ 2(3) - 3 = 3'] }],
      lines: [
        { say: 'Step one. Choose easy values for "x": 0, 1, 2 and 3.', show: ['tb.frame', 'tb.xs'] },
        { say: 'When "x" is 0: 2 times 0 is 0, minus 3 is negative 3.', show: ['m.0', 'tb.y0'], focus: 'm.0' },
        { say: 'When "x" is 1: 2 times 1 is 2, minus 3 is negative 1.', show: ['m.1', 'tb.y1'], focus: 'm.1' },
        { say: 'When "x" is 2: 4 minus 3 is 1. When "x" is 3: 6 minus 3 is 3.', show: ['m.2', 'm.3', 'tb.y2', 'tb.y3'], focus: ['m.2', 'm.3'] },
        { say: 'Each time "x" goes up by 1, "y" goes up by 2. That is what a linear relation does.', show: 'tb.dys', focus: 'tb.dys' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: Plot and draw',
      layout: 'split',
      leftWidth: 560,
      left: [graph('st')],
      right: [{ kind: 'callout', id: 'c', tone: 'key', title: 'The graph', md: 'A straight line through $(0, -3)$, $(1, -1)$, $(2, 1)$ and $(3, 3)$, with arrows: it keeps going.' }],
      lines: [
        { say: 'Step two. Plot the points on a grid.', show: ['st.grid', 'st.axes'] },
        { say: 'The point at 0, negative 3 is on the "y" axis, 3 below the origin. The point at 1, negative 1 is 1 right and 1 down.', show: ['st.p0', 'st.p1'], focus: ['st.p0', 'st.p1'] },
        { say: 'The point at 2, 1, and the point at 3, 3.', show: ['st.p2', 'st.p3'], focus: ['st.p2', 'st.p3'] },
        { say: 'Step three. The points line up, so draw a straight line through them. That line is the graph of "y" equals 2 "x" minus 3.', show: ['st.ln', 'c'], focus: 'st.ln' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 560,
      left: [graph('ck')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = {-1}: \\ 2({-1}) - 3 = {-5}', '({-1},\\ {-5}) \\text{ is on the line } \\checkmark'] }],
      lines: [
        { say: 'Let us check with a new point.', show: ['ck.grid', 'ck.axes', 'ck.p0', 'ck.p1', 'ck.p2', 'ck.p3', 'ck.ln'] },
        { say: 'When "x" is negative 1: 2 times negative 1 is negative 2, minus 3 is negative 5.', show: 'm.0', focus: 'm.0' },
        { say: 'The point at negative 1, negative 5 lands right on the line. It checks out.', show: ['ck.chk', 'm.1'], focus: ['ck.chk', 'm.1'] },
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
            ['$(-3, 0)$', 'swapped the coordinates: write $(x, y)$, so $(0, -3)$'],
            ['$y = -1$ at $x = 0$', 'did $2(0 - 3)$ wrongly: multiply first, $0 - 3 = -3$'],
            ['a crooked line', 'a point is off: check it with the **equation**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Plotting the point at negative 3, 0 swaps the coordinates. The "x" value comes first, so the point is at 0, negative 3.' },
        { say: 'Getting negative 1 when "x" is 0 is an arithmetic slip. 2 times 0 is 0, and 0 minus 3 is negative 3.' },
        { say: 'And if your points do not line up, one of them is wrong. Check each one with the equation.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which point is on the graph of $y = -2x + 4$?',
          choices: ['$(2, 8)$', '$(4, 0)$', '$(1, 6)$', '$(3, -2)$'],
          answer: 3,
          working: 'x = 3: −2(3) + 4 = −6 + 4 = −2, so (3, −2) is on the line.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is on the graph of "y" equals negative 2 "x" plus 4? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Substitute each "x". When "x" is 3, negative 2 times 3 is negative 6, plus 4 is negative 2. So the point at 3, negative 2 is on the line. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Make a **table**: choose $x$, find $y$', 'Plot $(x, y)$: $x$ **first**', 'Draw a **straight line**', 'Check with **another point**'] }],
      lines: [
        { say: 'Here is what to remember. Make a table: choose values of "x", and work out "y".', show: 'sum.0' },
        { say: 'Plot each point, with "x" first.', show: 'sum.1' },
        { say: 'Draw a straight line through the points.', show: 'sum.2' },
        { say: 'And check with another point. For more on graphing linear relations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
