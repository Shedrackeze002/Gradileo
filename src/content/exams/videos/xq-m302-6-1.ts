import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-2 lesson 6.1 (exponential functions). The question is an exercise from
// OpenStax College Algebra 2e, word for word (section 6.1, Exponential Functions, CC BY-NC-SA 4.0).
// A 9% yearly growth rate gives the growth factor 1.09, and 2020 is 8 years after 2012, so the
// population is P(8) = 23,900(1.09)^8 ≈ 47,622 foxes, as in the book's answer. The check lists the
// count year by year and shows the curve.

const QUESTION =
  'The fox population in a certain region has an annual growth rate of 9% per year. In the year 2012, there were 23,900 fox counted in the area. What is the fox population predicted to be in the year 2020?';

/** The population in thousands, t years after 2012. */
const P = (t: number) => 23.9 * 1.09 ** t;
const g = plane({ x: [-0.6, 9.4], y: [-6, 56], yStep: 10, every: 2, width: 11, height: 8, titles: { x: 't \\text{ (years after 2012)}', y: 'P \\text{ (thousands)}' } });

/** The curve P(t) with the start and the 2020 value. */
const graph = (height = 440) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'p', f: P, from: 0, to: 9, tone: 'adj', samples: 120 }),
      dots(g, [
        { id: 's', x: 0, y: 23.9, tex: '(0, 23{,}900)', tone: 'muted', place: 'below right' },
        { id: 'e', x: 8, y: P(8), tex: '(8, 47{,}622)', tone: 'good', place: 'above left' },
      ]),
    ],
    height,
  );

const YEARS = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((t) => [`${2012 + t}`, `${t}`, Math.round(23900 * 1.09 ** t).toLocaleString('en-US')]);

const video: Explainer = {
  id: 'xq-m302-6-1',
  lessonId: '',
  exam: {
    lesson: 'm302-6-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 6.1, Exponential Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/6-1-exponential-functions',
    question: QUESTION,
  },
  title: 'Exam Question: How Many Foxes in 2020? (Exponential Functions)',
  thumbnailTitle: 'How Many Foxes in 2020?',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: a fox population of 23,900 in 2012 grows by 9% per year. What is it predicted to be in 2020? The growth factor is 1 + 0.09 = 1.09 and 2020 is 8 years later, so P(8) = 23,900(1.09)^8 ≈ 47,622 foxes. Then we check year by year and on a graph, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'How Many Foxes in 2020?', subtitle: 'Exponential functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about exponential functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: QUESTION,
          answer: '$23{,}900(1.09)^8 \\approx 47{,}622$ foxes',
          working: 'Growth factor $1.09$, and $2020 - 2012 = 8$ years.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it.', show: 'q' },
        { say: 'The fox population in a certain region has an annual growth rate of 9% per year. In the year twenty twelve, there were 23,900 fox counted in the area. What is the fox population predicted to be in the year twenty twenty?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Start with $23{,}900$ foxes in $2012$. Every year the number grows by $9\\%$ **of what is there**. How many in $2020$?' }],
      lines: [
        { say: 'We start with 23,900 foxes in twenty twelve.', show: 't' },
        { say: 'Every year, the number grows by 9% of whatever is there that year. We need the number in twenty twenty.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'model', tone: 'key', title: 'Growth by a fixed percent', md: '$P(t) = P_0(1 + r)^t$: $\\ P_0$ is the **start**, $r$ the rate as a **decimal**, $t$ the number of years.' },
        { kind: 'callout', id: 'why', tone: 'tip', title: 'Why multiply?', md: 'Growing by $9\\%$ means keeping $100\\%$ and adding $9\\%$: **multiply by** $1.09$ each year.' },
      ],
      lines: [
        { say: 'Here is what we need. When something grows by a fixed percent each year, P of t equals P nought times 1 plus r, to the power t. P nought is the starting amount, r is the rate as a decimal, and t is the number of years.', show: 'model' },
        { say: 'Why multiply? Growing by 9% means we keep the whole 100% and add 9% more. That is the same as multiplying by 1.09, once every year.', show: 'why' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **start**, the **growth factor** and the **time**', 'Write the **function**', '**Evaluate** it for $2020$'] }],
      lines: [
        { say: 'Here is the plan. First, find the start, the growth factor and the time.', show: 'plan.0' },
        { say: 'Second, write the function.', show: 'plan.1' },
        { say: 'Third, evaluate it for twenty twenty.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P_0 = 23{,}900', 'r = 9\\% = 0.09, \\quad 1 + r = \\good{1.09}', 't = 2020 - 2012 = \\good{8}'] }],
      lines: [
        { say: 'Step one. The start is 23,900 foxes, in twenty twelve.', show: 'm.0' },
        { say: 'The rate is 9%, which is 0.09 as a decimal. So the growth factor is 1 plus 0.09, which is 1.09.', show: 'm.1' },
        { say: 'And t counts years after twenty twelve. Twenty twenty minus twenty twelve is 8, so t is 8.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The function',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(t) = 23{,}900(1.09)^t'] }],
      lines: [
        { say: 'Step two. Put the numbers into the model: P of t equals 23,900 times 1.09 to the power t.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Evaluate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['P(8) = 23{,}900(1.09)^8', '\\approx 23{,}900 \\times 1.99256', '\\approx \\good{47{,}622} \\text{ foxes}'] }],
      lines: [
        { say: 'Step three. Put in t equals 8: 23,900 times 1.09 to the power 8.', show: 'm.0' },
        { say: '1.09 to the power 8 is about 1.99256. Do the power first, then multiply.', show: 'm.1' },
        { say: 'That gives about 47,622 foxes in twenty twenty.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        { kind: 'table', id: 'yrs', head: ['Year', '$t$', 'Foxes'], rows: YEARS },
      ],
      lines: [
        { say: 'Let us check by growing the population one year at a time. Each row is the row before, times 1.09.', show: 'yrs' },
        { say: '23,900 becomes 26,051, then 28,396, and so on. After 8 years, in twenty twenty, we reach 47,622. It checks out.' },
      ],
    },
    {
      chapter: 'On a graph',
      layout: 'center',
      main: [graph()],
      lines: [
        { say: 'Here is the same growth on a graph, in thousands of foxes. The curve starts at 23,900.', show: ['gr.grid', 'gr.axes', 'gr.p', 'gr.s'] },
        { say: 'It bends upward, because 9% of a bigger number is a bigger jump. At t equals 8, it reaches 47,622, almost double the start.', show: 'gr.e', focus: 'gr.e' },
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
            ['$23{,}900(0.09)^8$', 'the factor is $1 + 0.09 = 1.09$, not $0.09$'],
            ['$t = 2020$', '$t$ counts years **after** $2012$: $t = 8$'],
            ['$23{,}900 + 8(0.09)(23{,}900) = 41{,}108$', 'the $9\\%$ grows each year: **multiply** by $1.09$ eight times'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Multiplying by 0.09 would keep only 9% each year, and the foxes would almost vanish. The growth factor is 1.09.' },
        { say: 't is not the year itself. It counts the years after twenty twelve, so t is 8.' },
        { say: 'And adding the same 9% of 23,900 every year gives only 41,108. Each year the 9% is taken of a bigger number, so we multiply by 1.09 eight times.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A town of $12{,}000$ people grows by $3\\%$ per year. Which expression gives its population after $5$ years?',
          choices: ['$12{,}000(0.03)^5$', '$12{,}000(1.3)^5$', '$12{,}000(1.03)^5$', '$12{,}000 + 0.03(5)$'],
          answer: 2,
          working: '$3\\% = 0.03$, so the growth factor is $1.03$, for $5$ years.',
        },
      ],
      lines: [
        { say: 'Your turn. A town of 12,000 people grows by 3% per year. Which expression gives its population after 5 years? Pause the video and try it.', show: 'q2', wait: 7 },
        { say: '3% is 0.03, so the growth factor is 1.03, and t is 5. That is 12,000 times 1.03 to the power 5: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Growth by a fixed percent: $P(t) = P_0(1 + r)^t$', 'Write the rate as a **decimal**, then add $1$', '$t$ counts the years **from the start**', 'Do the **power** first, then multiply'] }],
      lines: [
        { say: 'Here is what to remember. Growth by a fixed percent is P nought times 1 plus r, to the power t.', show: 'sum.0' },
        { say: 'Write the rate as a decimal, then add 1 to get the growth factor.', show: 'sum.1' },
        { say: 't counts the years from the start, not the year itself.', show: 'sum.2' },
        { say: 'And do the power first, then multiply. For more on exponential functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
