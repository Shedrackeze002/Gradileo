import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { toothpicks } from '@/content/math7/videos/lib/m7-5-figures.ts';

// Figures 1 to 4 of the toothpick squares, with their counts.
const figures = (id: string) =>
  figure(
    id,
    [
      toothpicks({ name: 'f1', squares: 1, at: [0, 0], label: '\\text{Figure 1}', count: '4' }),
      toothpicks({ name: 'f2', squares: 2, at: [2.2, 0], label: '\\text{Figure 2}', count: '7' }),
      toothpicks({ name: 'f3', squares: 3, at: [5.4, 0], label: '\\text{Figure 3}', count: '10' }),
      toothpicks({ name: 'f4', squares: 4, at: [9.6, 0], label: '\\text{Figure 4}', count: '13' }),
    ],
    260,
  );

// Figure 3: one toothpick to start the row (orange), then three for each square.
const built = (id: string) =>
  figure(id, [toothpicks({ name: 'g', squares: 3, size: 1.4, leftTone: 'opp', label: '\\text{Figure 3}', count: '1 + 3 + 3 + 3 = 10' })], 300);

const table = (id: string) =>
  figure(
    id,
    [valueTable({ x: { title: '\\text{Figure, } n', values: [1, 2, 3, 4] }, y: { title: '\\text{Toothpicks, } t', values: [4, 7, 10, 13] }, dy: ['+3', '+3', '+3'], titleW: 3.8, cellW: 1.5 })],
    250,
  );

// The four points (n, t) lie on a straight line.
const graph = (id: string) => {
  const g = plane({ x: [0, 5], y: [0, 16], yStep: 2, width: 6, height: 7, titles: { x: 'n', y: 't' } });
  return figure(
    id,
    [
      g,
      polyline(g, { id: 'ln', points: [[0, 1], [5, 16]], tone: 'brand', dashed: true }),
      dots(g, [[1, 4], [2, 7], [3, 10], [4, 13]].map(([x, y], i) => ({ id: `p${i}`, x, y, tex: `(${x},\\ ${y})`, place: 'below right' as const }))),
    ],
    520,
  );
};

const video: Explainer = {
  id: 'm9-4-1',
  lessonId: 'm9-4-1',
  title: 'Writing Equations to Describe Patterns, Part 1: From a Pattern to an Equation',
  thumbnailTitle: 'From a Pattern to an Equation',
  thumbnail: 'fg',
  summary:
    'Squares in a row made of toothpicks use 4, 7, 10 and 13 toothpicks in Figures 1 to 4: each new square shares a side with the one before, so it adds 3 toothpicks. The number added each time multiplies the figure number n, and the constant makes the first figure right: 3(1) = 3, but Figure 1 has 4, so add 1. The equation is t = 3n + 1, a linear equation: its graph is a straight line, and n is not squared or in a denominator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 1', title: 'From a Pattern to an Equation', subtitle: 'Find any figure without drawing it' }],
      lines: [
        { say: 'Toothpick patterns, gym memberships and growing plants all follow rules. If you can write the rule as an equation, you can find any figure in a pattern, even Figure one hundred, without drawing it.', show: 'title' },
        { say: 'In this part, you will write an equation for a toothpick pattern.' },
      ],
    },
    {
      chapter: 'Toothpick squares',
      layout: 'center',
      main: [figures('fg')],
      lines: [
        { say: 'Squares made of toothpicks are joined in a row. Figure one is one square. Each side is one toothpick, so it uses four toothpicks.', show: ['fg.f1-sq0', 'fg.f1-label', 'fg.f1-count'] },
        { say: 'Figure two has two squares. They share a side, so Figure two uses seven toothpicks, not eight.', show: ['fg.f2-sq0', 'fg.f2-sq1', 'fg.f2-label', 'fg.f2-count'] },
        { say: 'Figure three has three squares and uses ten toothpicks. Figure four has four squares and uses thirteen.', show: ['fg.f3-sq0', 'fg.f3-sq1', 'fg.f3-sq2', 'fg.f3-label', 'fg.f3-count', 'fg.f4-sq0', 'fg.f4-sq1', 'fg.f4-sq2', 'fg.f4-sq3', 'fg.f4-label', 'fg.f4-count'] },
        { say: 'How many toothpicks would Figure one hundred need? Drawing it would take a long time. An equation can tell us much faster.' },
      ],
    },
    {
      chapter: 'Three more each time',
      layout: 'center',
      main: [table('tb'), built('bt')],
      lines: [
        { say: 'Put the counts in a table of values. Let n stand for the figure number, and t stand for the number of toothpicks.', show: ['tb.frame', 'tb.xs', 'tb.ys'] },
        { say: 'Each figure has three more toothpicks than the one before.', show: 'tb.dys', focus: 'tb.dys' },
        { say: 'Here is why. Look at Figure three. One toothpick starts the row on the left.', show: ['bt.g-sq0-left', 'bt.g-label'], focus: 'bt.g-sq0-left' },
        { say: 'Then each square adds three toothpicks: one on top, one on the bottom, and one on the right. The left side of each square is already there.', show: ['bt.g-sq0-top', 'bt.g-sq0-bottom', 'bt.g-sq0-right', 'bt.g-sq1', 'bt.g-sq2'] },
        { say: 'So Figure three uses one, plus three, plus three, plus three: ten toothpicks.', show: 'bt.g-count', focus: 'bt.g-count' },
      ],
    },
    {
      chapter: 'Write the equation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Writing the equation', md: 'The amount added each time **multiplies** $n$. Then fix the **constant** so the first figure is right.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['t = 3n + \\ ?', 'n = 1: \\quad 3(1) = 3, \\text{ but Figure 1 has } 4', 't = 3n + 1'] },
      ],
      lines: [
        { say: 'Here is how to turn the pattern into an equation. The amount added each time multiplies n.', show: 'key' },
        { say: 'The pattern adds three toothpicks each time, so the equation has three n: three times the figure number.', show: 'm.0', focus: 'm.0' },
        { say: 'Then fix the constant, the number on its own, so the first figure is right. For Figure one, three times one is three. But Figure one has four toothpicks, so add one.', show: 'm.1', focus: 'm.1' },
        { say: 'The equation is t equals three n plus one. The one is the toothpick that starts the row, and three n counts three toothpicks for each square.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Linear equations',
      layout: 'split',
      leftWidth: 500,
      left: [graph('gr')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Linear equation', md: 'A **linear equation** describes a linear relation, such as $t = 3n + 1$. Its graph is a **straight line**, and the variable is not squared or in a denominator.' },
      ],
      lines: [
        { say: 'Plot the pairs from the table: one and four, two and seven, three and ten, four and thirteen.', show: ['gr.grid', 'gr.axes', 'gr.p0', 'gr.p1', 'gr.p2', 'gr.p3'] },
        { say: 'The points lie on a straight line. That is because t goes up by the same amount, three, each time n goes up by one.', show: 'gr.ln', focus: 'gr.ln' },
        { say: 'An equation like t equals three n plus one is called a linear equation. It describes a linear relation, and its graph is a straight line.', show: 'def' },
        { say: 'In a linear equation, the variable is not squared, and it is not on the bottom of a fraction.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Figures $1$, $2$, $3$ and $4$ of a tile pattern have $5$, $9$, $13$ and $17$ tiles. Which equation gives the number of tiles, $t$, in Figure $n$?',
          choices: ['$t = n + 4$', '$t = 5n$', '$t = 4n + 1$', '$t = 4n + 5$'],
          answer: 2,
          working: 'The pattern adds $4$ each time, so the equation has $4n$. For Figure 1, $4(1) = 4$, but there are $5$ tiles, so add $1$: $t = 4n + 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Figures one, two, three and four of a tile pattern have five, nine, thirteen and seventeen tiles. Which equation gives the number of tiles, t, in Figure n? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, t equals four n plus one. The pattern adds four each time, so the equation has four n. For Figure one, four times one is four, but there are five tiles, so add one. Choice D uses five as the constant, but that gives nine tiles for Figure one, not five.', show: 'q.answer' },
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
            'Make a table, and find the amount added each time.',
            'That amount multiplies the variable: $3n$.',
            'Fix the constant so the first figure is right: $t = 3n + 1$.',
            'A linear equation has a straight-line graph.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Make a table, and find the amount added each time.', show: 'sum.0' },
        { say: 'That amount multiplies the variable.', show: 'sum.1' },
        { say: 'Then fix the constant so the first figure is right.', show: 'sum.2' },
        { say: 'An equation like this is a linear equation, and its graph is a straight line. In the next part, you will check, or verify, an equation. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
