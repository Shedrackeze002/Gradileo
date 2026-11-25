import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';

// Exam question for Math 8 lesson 6.1 (linear relations and tables of values). The free textbooks
// we use have no question that builds a table of values from a story at this level, so Gradileo
// wrote it in the style of a Grade 8 unit test. h = 4 + 3w; w = 0 to 4 gives 4, 7, 10, 13, 16;
// carrying on, 19, 22, 25, so the plant is 25 cm after 7 weeks.

const QUESTION =
  'A plant is 4 cm tall when Leah buys it, and it grows 3 cm every week. (a) Write an equation for the plant’s height, h centimetres, after w weeks. (b) Make a table of values for w = 0, 1, 2, 3 and 4. (c) After how many weeks will the plant be 25 cm tall?';

const W = [0, 1, 2, 3, 4, 5, 6, 7];
const H = W.map((w) => 4 + 3 * w);
const table = (id: string) =>
  figure(id, [valueTable({ x: { title: 'w', values: W }, y: { title: 'h', values: H }, dy: Array(7).fill('+3'), extra: 3, titleW: 1.1, cellW: 1.35 })], 280);

const graph = (id: string) => {
  const g = plane({ x: [0, 8], y: [0, 28], yStep: 4, width: 10, height: 8, titles: { x: 'w \\text{ (weeks)}', y: 'h \\text{ (cm)}' } });
  return figure(
    id,
    [g, plot(g, { id: 'ln', f: (w) => 4 + 3 * w, from: 0, to: 8, tone: 'good' }), dots(g, W.map((w, i) => ({ id: `p${i}`, x: w, y: H[i], tone: i === 7 ? ('theta' as const) : ('good' as const) })))],
    440,
  );
};

const video: Explainer = {
  id: 'xq-m8-6-1',
  lessonId: '',
  exam: {
    lesson: 'm8-6-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Leah’s Growing Plant (Linear Relations and Tables of Values)',
  thumbnailTitle: 'Leah’s Growing Plant',
  thumbnail: 'ck',
  summary:
    'An exam-style question, solved one small step at a time: a plant is 4 cm tall when Leah buys it, and it grows 3 cm every week. Write an equation for its height h after w weeks, make a table of values for w = 0 to 4, and find when it will be 25 cm tall. The height starts at 4 and goes up 3 each week, so h = 4 + 3w. The table gives 4, 7, 10, 13 and 16 cm. Carrying on, 19, 22, 25: the plant is 25 cm tall after 7 weeks. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Leah’s Growing Plant', subtitle: 'Linear relations and tables of values, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about linear relations and tables of values. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a unit test, because the free textbooks we use have no question like it.' },
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
          prompt: 'A plant is $4$ cm tall when Leah buys it, and it grows $3$ cm every week. (a) Write an equation for the plant’s height, $h$ centimetres, after $w$ weeks. (b) Make a table of values for $w = 0, 1, 2, 3$ and $4$. (c) After how many weeks will the plant be $25$ cm tall?',
          answer: '(a) $h = 4 + 3w$ (b) $4, 7, 10, 13, 16$ (c) $7$ weeks',
          working: 'start 4, add 3 each week',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'A plant is 4 centimetres tall when Leah buys it, and it grows 3 centimetres every week.' },
        { say: 'Part a: write an equation for the plant\'s height, "h" centimetres, after "w" weeks. Part b: make a table of values for "w" equals 0, 1, 2, 3 and 4. Part c: after how many weeks will the plant be 25 centimetres tall?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'A linear relation', md: 'The height **starts** at $4$ cm and goes up by the **same amount**, $3$ cm, every week. When one quantity changes by the same amount each step, the relation is **linear**: its graph is a straight line. A **table of values** lists the height for each number of weeks.' }],
      lines: [
        { say: 'The height starts at 4 centimetres, and goes up by the same amount, 3 centimetres, every week.', show: 'c' },
        { say: 'When one quantity changes by the same amount at each step, the relation is linear: its graph is a straight line. A table of values lists the height for each number of weeks.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{value} = \\text{start} + \\text{change each step} \\times \\text{steps}', 'h = 4 + 3w'] }],
      lines: [
        { say: 'Here is what we need. The value after some steps is the starting value, plus the change each step times the number of steps.', show: 'm.0' },
        { say: 'Here the start is 4, the change each week is 3, and the number of weeks is "w".', show: 'm.1' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) **Start** plus **change** times weeks', '(b) **Substitute** $w = 0$ to $4$', '(c) **Continue** the table to $25$'] }],
      lines: [
        { say: 'Here is the plan. For part a, write the start plus the change times the weeks.', show: 'plan.0' },
        { say: 'For part b, substitute "w" equals 0 to 4.', show: 'plan.1' },
        { say: 'For part c, continue the table until the height reaches 25.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Equation, table, 25 cm',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{(a) } \\good{h = 4 + 3w}', '\\text{(b) } w = 3: \\ h = 4 + 3 \\times 3 = 13'] }, table('tb'), { kind: 'math', id: 'n', size: 'md', lines: ['\\text{(c) } h = 25 \\text{ when } \\good{w = 7 \\text{ weeks}}'] }],
      lines: [
        { say: 'Step one, part a. The height starts at 4 and adds 3 for each week. So "h" equals 4 plus 3 "w".', show: 'm.0', focus: 'm.0' },
        { say: 'Step two, part b. Substitute each number of weeks. For example, when "w" is 3, "h" is 4 plus 3 times 3, which is 13.', show: 'm.1', focus: 'm.1' },
        { say: 'So the table goes 4, 7, 10, 13 and 16 centimetres, going up by 3 each time.', show: ['tb.frame', 'tb.xs', 'tb.ys', 'tb.dys'], focus: 'tb.ys' },
        { say: 'Step three, part c. Keep adding 3: 19, 22, 25. The height is 25 centimetres when "w" is 7. So after 7 weeks.', show: ['tb.more', 'n.0'], focus: ['tb.more', 'n.0'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 560,
      left: [graph('ck')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['w = 7: \\ 4 + 3 \\times 7', '= 4 + 21 = 25 \\ \\checkmark', '\\text{a straight line} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Put 7 into the equation: 4 plus 3 times 7 is 4 plus 21, which is 25.', show: ['ck.grid', 'ck.axes', 'm.0', 'm.1'], focus: 'm.1' },
        { say: 'And the points from the table lie on a straight line, as a linear relation should. The point for 7 weeks is at a height of 25. It checks out.', show: ['ck.ln', 'ck.p0', 'ck.p1', 'ck.p2', 'ck.p3', 'ck.p4', 'ck.p5', 'ck.p6', 'ck.p7', 'm.2'], focus: 'ck.p7' },
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
            ['$h = 4w + 3$', 'swapped the numbers: $4$ is the **start**, $3$ is added **each week**'],
            ['$3, 6, 9, 12, 15$', 'forgot the **start**: at $w = 0$ the plant is already $4$ cm'],
            ['$8$ weeks', 'divided $25$ by $3$: the first $4$ cm were already there'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '"h" equals 4 "w" plus 3 swaps the numbers. The plant starts at 4, and 3 is what it adds each week.' },
        { say: '3, 6, 9, 12, 15 forgets the start. When "w" is 0, the plant is already 4 centimetres tall.' },
        { say: 'And about 8 weeks divides 25 by 3. But the first 4 centimetres were there at the start. The plant only has to grow 21 more, which takes 7 weeks.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A tank holds $50$ L of water and drains $5$ L every minute. Which equation gives the water, $V$ litres, after $t$ minutes?',
          choices: ['$V = 5t - 50$', '$V = 50t - 5$', '$V = 5 - 50t$', '$V = 50 - 5t$'],
          answer: 3,
          working: 'It starts at 50 and loses 5 each minute: V = 50 − 5t.',
        },
      ],
      lines: [
        { say: 'Your turn. A tank holds 50 litres of water, and drains 5 litres every minute. Which equation gives the water, "V" litres, after "t" minutes? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The water starts at 50, and loses 5 each minute. So "V" equals 50 minus 5 "t". Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Value $=$ **start** $+$ **change** $\\times$ steps', 'Table: **substitute** each value', 'Same change each step: **linear**', 'Continue the pattern to answer "when"'] }],
      lines: [
        { say: 'Here is what to remember. The value is the start, plus the change each step times the number of steps.', show: 'sum.0' },
        { say: 'To make a table, substitute each value.', show: 'sum.1' },
        { say: 'The same change at each step means the relation is linear.', show: 'sum.2' },
        { say: 'And continue the pattern to answer a "when" question. For more on linear relations and tables of values, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
