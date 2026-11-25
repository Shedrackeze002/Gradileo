import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { barIds, bars } from '@/content/math8/videos/lib/m8-10-figures.ts';

// Exam question for Math 8 lesson 10.1 (critiquing graphs). The free textbooks we use have no
// question like it at this level, so Gradileo wrote it in the style of a Grade 8 unit test. The
// scale starts at 46, so the pizza bar is 52 − 46 = 6 units tall and the tacos bar 48 − 46 = 2:
// it looks 3 times as tall, but only 4 more students chose pizza (52 ÷ 48 ≈ 1.08).

const QUESTION =
  'The bar graph shows how many students chose each lunch: 52 students chose pizza and 48 chose tacos. [The figure: a bar graph with a vertical scale from 46 to 54, in steps of 2. The pizza bar reaches 52 and the tacos bar reaches 48.] (a) How many times as tall as the tacos bar does the pizza bar look? (b) How many more students chose pizza than tacos? (c) Explain why the graph is misleading, and how to redraw it so that it is fair.';

const FOODS = ['Pizza', 'Tacos'];
const VOTES = [52, 48];
const cut = (id: string) => figure(id, [bars({ categories: FOODS, values: VOTES, min: 46, max: 54, step: 2, height: 3.5, titles: { y: 'Students' } })], 420);
const fair = (id: string) => figure(id, [bars({ categories: FOODS, values: VOTES, max: 60, step: 10, height: 3.5, tone: 'good', titles: { y: 'Students' } })], 420);

const video: Explainer = {
  id: 'xq-m8-10-1',
  lessonId: '',
  exam: {
    lesson: 'm8-10-1',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 8 mathematics unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: The Misleading Lunch Graph (Critiquing Graphs)',
  thumbnailTitle: 'The Misleading Lunch Graph',
  thumbnail: 'ask',
  summary:
    'An exam-style question, solved one small step at a time: a bar graph shows that 52 students chose pizza and 48 chose tacos, but its scale starts at 46. (a) How many times as tall does the pizza bar look? (b) How many more students chose pizza? (c) Why is the graph misleading, and how do you fix it? From 46, the pizza bar is 6 units tall and the tacos bar is 2, so pizza looks 3 times as popular. But only 4 more students chose pizza. The scale cuts off the bottom of each bar; starting it at 0 makes the bars almost the same height. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Misleading Lunch Graph', subtitle: 'Critiquing graphs, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam style question about critiquing graphs. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'A bar graph shows that $52$ students chose pizza and $48$ chose tacos. Its vertical scale goes from $46$ to $54$. (a) How many times as tall as the tacos bar does the pizza bar look? (b) How many more students chose pizza than tacos? (c) Explain why the graph is misleading, and how to redraw it so that it is fair.',
          answer: '(a) $3$ times (b) $4$ more (c) the scale starts at $46$, not $0$: start it at $0$',
          working: 'bars: 52 − 46 = 6 and 48 − 46 = 2',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'The bar graph shows how many students chose each lunch. 52 students chose pizza, and 48 chose tacos. The vertical scale goes from 46 to 54.' },
        { say: 'Part a: how many times as tall as the tacos bar does the pizza bar look? Part b: how many more students chose pizza than tacos? Part c: explain why the graph is misleading, and how to redraw it so that it is fair.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 520,
      left: [cut('ask')],
      right: [{ kind: 'callout', id: 'c', tone: 'definition', title: 'A misleading graph', md: 'A graph is **misleading** when its picture gives the wrong idea, even though its numbers are right. Always **read the scale** before you compare the bars.' }],
      lines: [
        { say: 'Here is the graph. The pizza bar reaches 52, and the tacos bar reaches 48.', show: [...barIds('ask', 2), 'ask.v0', 'ask.v1'] },
        { say: 'A graph is misleading when its picture gives the wrong idea, even though its numbers are right. So always read the scale before you compare the bars.', show: 'c' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{a bar is only fair if it starts at } 0', '\\text{a scale that starts higher cuts off the bottom of every bar}', '\\text{compare the values, not the heights}'] }],
      lines: [
        { say: 'Here is what we need. The height of a bar is only fair if the scale starts at 0.', show: 'm.0' },
        { say: 'A scale that starts higher cuts off the bottom of every bar, so small differences look big.', show: 'm.1' },
        { say: 'So compare the values themselves, not just the heights of the bars.', show: 'm.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Measure each bar from the **bottom** of the graph', '(b) **Subtract** the values', '(c) Find what the **scale** does, and fix it'] }],
      lines: [
        { say: 'Here is the plan. For part a, measure how tall each bar is, from the bottom of the graph.', show: 'plan.0' },
        { say: 'For part b, subtract the values.', show: 'plan.1' },
        { say: 'For part c, find what the scale does to the picture, and fix it.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Steps 1 to 3: Heights, values, scale',
      layout: 'split',
      leftWidth: 520,
      left: [cut('st')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{pizza bar: } 52 - 46 = 6', '\\text{tacos bar: } 48 - 46 = 2', '\\text{(a) } 6 \\div 2 = \\good{3 \\text{ times}}', '\\text{(b) } 52 - 48 = \\good{4 \\text{ more}}', '\\text{(c) starts at } 46: \\text{ start at } \\good{0}'] }],
      lines: [
        { say: 'Here is the graph again.', show: [...barIds('st', 2), 'st.v0', 'st.v1'] },
        { say: 'Step one, part a. The bottom of the graph is at 46, not 0. So the pizza bar is only 52 minus 46, which is 6 units tall.', show: 'm.0', focus: ['st.b0', 'm.0'] },
        { say: 'The tacos bar is 48 minus 46, which is 2 units tall.', show: 'm.1', focus: ['st.b1', 'm.1'] },
        { say: '6 divided by 2 is 3. So the pizza bar looks 3 times as tall as the tacos bar.', show: 'm.2', focus: 'm.2' },
        { say: 'Step two, part b. But 52 minus 48 is only 4. Just 4 more students chose pizza.', show: 'm.3', focus: 'm.3' },
        { say: 'Step three, part c. The graph is misleading because its scale starts at 46, which cuts off the bottom of both bars. That makes a small difference look big. To make it fair, start the scale at 0.', show: 'm.4', focus: ['st.scale', 'm.4'] },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 520,
      left: [fair('ck')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['52 \\div 48 \\approx 1.08', '\\text{almost the same height} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by redrawing the graph with the scale starting at 0.', show: [...barIds('ck', 2), 'ck.v0', 'ck.v1'] },
        { say: 'Now the bars are almost the same height. 52 divided by 48 is only about 1.08, so pizza is just a little more popular, not 3 times as popular. It checks out.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
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
            ['"3 times as many chose pizza"', 'that is the **heights**: the **values** are $52$ and $48$'],
            ['"the numbers are wrong"', 'the values are right: the **scale** misleads'],
            ['"make the bars thinner"', 'the fix is to start the scale at **0**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Saying 3 times as many students chose pizza reads the heights of the bars. The values are 52 and 48, which are close.' },
        { say: 'Saying the numbers are wrong misses the point. The values are right. It is the scale that misleads.' },
        { say: 'And making the bars thinner, or changing their colour, does not fix it. The fix is to start the scale at 0.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A bar graph’s scale starts at $90$. Bar A shows $100$ and bar B shows $95$. How many times as tall as bar B does bar A **look**?',
          choices: ['$1.05$ times', '$5$ times', '$10$ times', '$2$ times'],
          answer: 3,
          working: 'Bar A is 100 − 90 = 10 tall, and bar B is 95 − 90 = 5 tall: 10 ÷ 5 = 2.',
        },
      ],
      lines: [
        { say: 'Your turn. A bar graph\'s scale starts at 90. Bar "A" shows 100, and bar "B" shows 95. How many times as tall as bar "B" does bar "A" look? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Measured from 90, bar "A" is 10 tall, and bar "B" is 5 tall. 10 divided by 5 is 2, so it looks 2 times as tall, even though 100 is only a little more than 95. Choice "D".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Read the scale** before comparing bars', 'A scale not starting at $0$ **cuts off** the bars', 'Compare the **values**, not the heights', 'Fix it: start the scale at **0**'] }],
      lines: [
        { say: 'Here is what to remember. Read the scale before you compare the bars.', show: 'sum.0' },
        { say: 'A scale that does not start at 0 cuts off the bottom of the bars, so small differences look big.', show: 'sum.1' },
        { say: 'Compare the values, not just the heights.', show: 'sum.2' },
        { say: 'And to fix it, start the scale at 0. For more on critiquing graphs, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
