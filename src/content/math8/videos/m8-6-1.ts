import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { squares, tileSteps } from './lib/m8-6-figures.ts';

// Taxi fares as tiles, one tile for each dollar: $4 to start (orange) and $2 more for each kilometre (green).
const fares = (id: string) =>
  figure(
    id,
    [
      tileSteps({
        steps: 4,
        start: 4,
        per: 2,
        captions: ['0\\text{ km: }\\$4', '1\\text{ km: }\\$6', '2\\text{ km: }\\$8', '3\\text{ km: }\\$10'],
      }),
    ],
    250,
  );

// F = 2d + 4 for d = 0 to 3.
const PAIRS: [number, number][] = [[0, 4], [1, 6], [2, 8], [3, 10]];
const table = (id: string) =>
  figure(
    id,
    [valueTable({ x: { title: 'd', values: PAIRS.map((p) => p[0]) }, y: { title: 'F', values: PAIRS.map((p) => p[1]) }, dy: ['+2', '+2', '+2'], titleW: 1.2, cellW: 1.4 })],
    300,
  );
const graph = (id: string) => {
  const g = plane({ x: [0, 5], y: [0, 14], yStep: 2, width: 6, height: 7, titles: { x: 'd', y: 'F' } });
  return figure(id, [g, polyline(g, { id: 'ln', points: [[0, 4], [5, 14]], tone: 'brand', dashed: true }), dots(g, PAIRS.map(([x, y], i) => ({ id: `p${i}`, x, y })))], 520);
};

// Squares of tiles, 1, 4, 9 and 16, and their table: the changes are not all the same.
const growing = (id: string) =>
  figure(id, [squares({ sizes: [1, 2, 3, 4], gap: 1.2, captions: ['1', '4', '9', '16'] })], 220);
const squareTable = (id: string) =>
  figure(
    id,
    [valueTable({ x: { title: '\\text{side}', values: [1, 2, 3, 4] }, y: { title: '\\text{tiles}', values: [1, 4, 9, 16] }, dy: ['+3', '+5', '+7'], dyTones: ['bad', 'bad', 'bad'], titleW: 2, cellW: 1.4 })],
    260,
  );

const video: Explainer = {
  id: 'm8-6-1',
  lessonId: 'm8-6-1',
  title: 'Linear Relations and Tables of Values, Part 1: Linear Relations',
  thumbnailTitle: 'Linear Relations',
  thumbnail: 'ft',
  summary:
    'A taxi that charges $4 to start and $2 for every kilometre makes a growing pattern: $4, $6, $8, $10, two more dollars for each kilometre. A relation connects two variables; this one is F = 2d + 4. In a linear relation, one variable changes by the same amount each time the other goes up by 1, and its graph is a straight line. Squares of tiles (1, 4, 9, 16) grow by 3, 5 and 7, so they are not linear.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 1', title: 'Linear Relations', subtitle: 'Patterns that grow by the same amount' }],
      lines: [
        { say: 'A taxi charges four dollars to start, plus two dollars for every kilometre. How much does a ride cost? And how does the cost grow as the ride gets longer?', show: 'title' },
        { say: 'In this part, you will see how a pattern like this becomes a relation, and why it is called a linear relation.' },
      ],
    },
    {
      chapter: 'A growing pattern',
      layout: 'center',
      main: [fares('ft')],
      lines: [
        { say: 'Let’s picture the fares with tiles. Each tile stands for one dollar.' },
        { say: 'Before the taxi moves at all, the fare is four dollars: four orange tiles.', show: ['ft.s0', 'ft.c0'], focus: 'ft.s0' },
        { say: 'A one kilometre ride adds two green tiles. That makes six dollars.', show: ['ft.s1', 'ft.c1'], focus: 'ft.s1' },
        { say: 'A two kilometre ride adds two more green tiles, for eight dollars. And a three kilometre ride costs ten dollars.', show: ['ft.s2', 'ft.c2', 'ft.s3', 'ft.c3'], focus: ['ft.s2', 'ft.s3'] },
        { say: 'Each step adds the same amount: two more tiles, or two more dollars, for each kilometre.', focus: 'ft' },
      ],
    },
    {
      chapter: 'A relation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Relation', md: 'A **relation** connects two **variables**: letters that stand for amounts that can change. Here, the fare depends on the distance.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['F = 2d + 4', '2d \\text{ means } 2 \\times d', 'd = 3: \\quad F = 2(3) + 4 = 10'] },
      ],
      lines: [
        { say: 'The fare depends on the distance. When two amounts are connected like this, we have a relation. A relation connects two variables: letters that stand for amounts that can change.', show: 'def' },
        { say: 'Let d stand for the distance in kilometres, and let F stand for the fare in dollars. Then F equals two d plus four.', show: 'm.0', focus: 'm.0' },
        { say: 'Two d means two times d: two dollars for each kilometre. The plus four is the starting fee, paid once.', show: 'm.1', focus: 'm.1' },
        { say: 'Try it for three kilometres. F equals two times three, plus four, which is ten dollars. That matches the tiles.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A table and a graph',
      layout: 'split',
      leftWidth: 500,
      left: [graph('gr')],
      right: [table('tb')],
      lines: [
        { say: 'Here are the fares in a table of values. The distances are in the top row, and the matching fares are below them.', show: ['tb.frame', 'tb.xs', 'tb.ys'] },
        { say: 'Each time the distance goes up by one kilometre, the fare goes up by two dollars.', show: 'tb.dys', focus: 'tb.dys' },
        { say: 'Now plot each pair on a grid: the distance goes across, and the fare goes up.', show: ['gr.grid', 'gr.axes', 'gr.p0', 'gr.p1', 'gr.p2', 'gr.p3'] },
        { say: 'Look: the points lie on a straight line.', show: 'gr.ln', focus: 'gr.ln' },
      ],
    },
    {
      chapter: 'Linear relations',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Linear relation', md: 'In a **linear relation**, one variable changes by the **same amount** each time the other variable goes up by $1$. When you graph it, the points lie on a **straight line**.' }],
      lines: [
        { say: 'A relation like this is called a linear relation. One variable changes by the same amount each time the other variable goes up by one.', show: 'def' },
        { say: 'When you graph a linear relation, its points lie on a straight line. That is where the name comes from: linear means like a line.' },
      ],
    },
    {
      chapter: 'Not linear',
      layout: 'center',
      main: [growing('sq'), squareTable('st')],
      lines: [
        { say: 'Not every pattern is linear. Look at these squares of tiles. The sides are one, two, three and four tiles long, so they use one, four, nine and sixteen tiles.', show: ['sq', 'st.frame', 'st.xs', 'st.ys'] },
        { say: 'The number of tiles goes up by three, then by five, then by seven. The change is not the same each time.', show: 'st.dys', focus: 'st.dys' },
        { say: 'So this pattern is not linear. If you graphed it, the points would bend into a curve, instead of lying on a straight line.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $x = 0,\\ 1,\\ 2,\\ 3$, which list of $y$-values could come from a linear relation?',
          choices: ['$1,\\ 2,\\ 4,\\ 8$', '$0,\\ 1,\\ 4,\\ 9$', '$2,\\ 5,\\ 8,\\ 11$', '$5,\\ 4,\\ 2,\\ 1$'],
          answer: 2,
          working: '$2,\\ 5,\\ 8,\\ 11$ goes up by $3$ every time $x$ goes up by $1$. The other lists change by different amounts.',
        },
      ],
      lines: [
        { say: 'Your turn. For x equals zero, one, two and three, which list of y values could come from a linear relation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: two, five, eight, eleven. It goes up by three every time. Choice A doubles: it goes up by one, then by two, then by four, so the change is not the same.', show: 'q.answer' },
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
            'A relation connects two variables, such as the distance $d$ and the fare $F$.',
            'The taxi fare relation is $F = 2d + 4$.',
            'In a linear relation, one variable changes by the same amount each time the other goes up by $1$.',
            'The graph of a linear relation is a straight line.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A relation connects two variables, like the distance and the fare.', show: 'sum.0' },
        { say: 'The taxi fare relation is F equals two d plus four.', show: 'sum.1' },
        { say: 'In a linear relation, one variable changes by the same amount each time the other goes up by one.', show: 'sum.2' },
        { say: 'And the graph of a linear relation is a straight line. In the next part, you will make a table of values from an equation. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
