import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 7.1 (characteristics of exponential functions). The question
// is an exercise from OpenStax College Algebra 2e, word for word (section 6.1, Exponential
// Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. In y = a·b^t the base
// b = 0.97 is between 0 and 1, so y = 11,701(0.97)^t is exponential decay, as in the book's answer.
// The graph starts at (0, 11 701), falls by 3% each step and approaches the asymptote y = 0.

const thousands = (y: number) => (y === 0 ? '0' : `${y / 1000}{,}000`);
const g = plane({ x: [-4, 82], y: [-800, 14500], xStep: 10, yStep: 2000, every: 2, width: 12, height: 7.5, titles: { x: 't', y: 'y' }, yTex: thousands });

/** y = 11,701(0.97)^t (`f`), its y-intercept (`p0`) and the value at t = 10 (`p10`). */
const graph = (height = 470, more = true) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'f', f: (t) => 11701 * 0.97 ** t, from: 0, to: 80, tone: 'good', samples: 120 }),
      dots(g, [
        { id: 'p0', x: 0, y: 11701, tex: '(0, 11\\,701)', tone: 'good', place: 'above right' },
        ...(more ? [{ id: 'p10', x: 10, y: 11701 * 0.97 ** 10, tex: '(10, 8\\,628)', tone: 'adj' as const, place: 'right' as const }] : []),
      ]),
    ],
    height,
  );

const QUESTION = 'Determine whether the equation represents exponential growth, exponential decay, or neither. Explain. y = 11,701(0.97)^t';

const video: Explainer = {
  id: 'xq-m301-7-1',
  lessonId: '',
  exam: {
    lesson: 'm301-7-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 6.1, Exponential Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/6-1-exponential-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Is y = 11,701(0.97)^t Growth or Decay? (Characteristics of Exponential Functions)',
  thumbnailTitle: 'Growth or Decay?',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: does y = 11,701(0.97)^t show exponential growth, exponential decay, or neither? The base 0.97 is between 0 and 1, so every step keeps 97% of the value, and it is exponential decay. Then we check on a graph, list the characteristics of the function, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Growth or Decay?', subtitle: 'Characteristics of exponential functions, step by step' }],
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
          prompt: 'Determine whether the equation represents exponential growth, exponential decay, or neither. Explain. $y = 11{,}701(0.97)^t$',
          answer: 'exponential **decay**: the base $0.97$ is between $0$ and $1$',
          working: 'In $y = a \\cdot b^t$, growth when $b > 1$ and decay when $0 < b < 1$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Determine whether the equation represents exponential growth, exponential decay, or neither. Explain. y equals 11,701 times 0.97 to the power t.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'As $t$ goes up by $1$, does $y$ get **bigger** (growth), get **smaller** (decay), or **neither**? And we must say **why**.' }],
      lines: [
        { say: 'As t goes up one step at a time, does y keep getting bigger, which is growth, or keep getting smaller, which is decay?', show: 't' },
        { say: 'And the question says explain, so we must give the reason too.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'form', tone: 'key', title: 'Exponential function', md: '$y = a \\cdot b^t$: $a$ is the **starting value** (at $t = 0$), and $b$ is the **base**, the number $y$ is multiplied by at each step.' },
        { kind: 'callout', id: 'rule', tone: 'definition', title: 'Growth or decay', md: '$b > 1$: **growth**. $\\ 0 < b < 1$: **decay**. $\\ b = 1$: **neither** (a constant).' },
      ],
      lines: [
        { say: 'Here is what we need. An exponential function looks like y equals "a" times b to the power t. "a" is the starting value, when t is 0. b is the base: at each step, y is multiplied by b.', show: 'form' },
        { say: 'If b is bigger than 1, y grows. If b is between 0 and 1, y shrinks, so it is decay. And if b is 1, y never changes.', show: 'rule' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Read $a$ and $b$', 'Compare $b$ with $0$ and $1$', '**Explain** with one step of the multiplying'] }],
      lines: [
        { say: 'Here is the plan. First, read "a" and b from the equation.', show: 'plan.0' },
        { say: 'Second, compare b with 0 and 1.', show: 'plan.1' },
        { say: 'Third, explain what happens at each step.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Read a and b',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = \\underbrace{11{,}701}_{a} \\cdot (\\underbrace{0.97}_{b})^t', 'a = 11{,}701, \\quad \\good{b = 0.97}'] }],
      lines: [
        { say: 'Step one. Match it to y equals "a" times b to the power t. The number in front is 11,701, and the number being raised to the power t is 0.97.', show: 'm.0' },
        { say: 'So "a" is 11,701, the starting value, and the base b is 0.97.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Compare b',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['0 < 0.97 < 1', '\\Rightarrow \\ \\good{\\text{exponential decay}}'] }],
      lines: [
        { say: 'Step two. 0.97 is more than 0 but less than 1.', show: 'm.0' },
        { say: 'So the equation represents exponential decay.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Explain',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['t = 0: \\ y = 11{,}701', 't = 1: \\ y = 11{,}701 \\times 0.97 \\approx 11{,}350', '\\text{each step keeps } 97\\%, \\text{ so } y \\text{ falls by } \\good{3\\%}'] }],
      lines: [
        { say: 'Step three. Explain it. When t is 0, y is 11,701.', show: 'm.0' },
        { say: 'When t is 1, we multiply by 0.97, and y is about 11,350. It went down.', show: 'm.1' },
        { say: 'Each step keeps 97 percent of the value, so y falls by 3 percent every step. Multiplying by a number between 0 and 1 always makes it smaller. That is the explanation.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(), { kind: 'text', id: 't', size: 'md', md: '**Decreasing**, $y$-intercept $11{,}701$, domain all real numbers, range $y > 0$, asymptote $y = 0$.' }],
      lines: [
        { say: 'Let us check on a graph. It starts at 11,701 when t is 0.', show: ['gr.grid', 'gr.axes', 'gr.p0'] },
        { say: 'Then it falls, quickly at first and then more slowly. After 10 steps it is down to about 8,628.', show: ['gr.f', 'gr.p10'], focus: 'gr.f' },
        { say: 'It keeps falling, closer and closer to 0, but never reaches it. So the graph is decreasing: it is decay.' },
        { say: 'Here are its characteristics. The y-intercept is 11,701, the domain is all real numbers, the range is y greater than 0, and the horizontal asymptote is y equals 0.', show: 't' },
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
            ['"$11{,}701$ is big, so growth"', '$a$ is only the **start**: the base $b$ decides'],
            ['"$0.97$ is close to $1$, so neither"', 'any $b$ below $1$ is decay, even a slow one'],
            ['"it falls by $97\\%$ each step"', 'it **keeps** $97\\%$, so it falls by $3\\%$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The big number in front does not decide anything. It is only where y starts. The base decides growth or decay.' },
        { say: 'A base close to 1 is still decay. It is slow decay, but it is decay. Only a base of exactly 1 is neither.' },
        { say: 'And a base of 0.97 keeps 97 percent each step, so the drop is 3 percent, not 97 percent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which equation represents exponential **growth**?',
          choices: ['$y = 5(0.8)^x$', '$y = 90(0.5)^x$', '$y = 0.5(1.2)^x$', '$y = 3(1)^x$'],
          answer: 2,
          working: 'Only $y = 0.5(1.2)^x$ has a base greater than $1$. The small starting value $0.5$ does not matter.',
        },
      ],
      lines: [
        { say: 'Your turn. Which equation represents exponential growth? Pause the video and try it.', show: 'q2', wait: 7 },
        { say: 'Look only at the bases. 0.8 and 0.5 are less than 1, so those are decay. A base of 1 is neither. Only 1.2 is bigger than 1: choice C, even though it starts small.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = a \\cdot b^t$: $a$ is the start, $b$ is the multiplier', '$b > 1$: **growth**', '$0 < b < 1$: **decay**', 'Explain with what happens at **each step**'] }],
      lines: [
        { say: 'Here is what to remember. In y equals "a" times b to the power t, "a" is the start and b is what y is multiplied by at each step.', show: 'sum.0' },
        { say: 'If b is bigger than 1, it is growth.', show: 'sum.1' },
        { say: 'If b is between 0 and 1, it is decay.', show: 'sum.2' },
        { say: 'And explain it with what happens at each step. For more on the characteristics of exponential functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
