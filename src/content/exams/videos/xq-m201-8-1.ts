import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 8.1 (solving systems graphically): a laptop company's cost
// C(x) = 3x² − 10x + 200 and revenue R(x) = −2x² + 100x + 50. The question is an exercise from
// OpenStax College Algebra 2e, word for word apart from "For the following exercises," (section 7.3,
// Systems of Nonlinear Equations and Inequalities: Two Variables, CC BY-NC-SA 4.0), whose answer key
// gives 2–20 computers: the parabolas cross where x² − 22x + 30 = 0, at x = 11 ± √91 ≈ 1.46 and
// 20.54, and revenue is above cost between them.

const C = (x: number) => 3 * x * x - 10 * x + 200;
const R = (x: number) => -2 * x * x + 100 * x + 50;
const X1 = 11 - Math.sqrt(91);
const X2 = 11 + Math.sqrt(91);

const g = plane({
  x: [0, 22],
  y: [0, 1600],
  xStep: 2,
  yStep: 200,
  every: 2,
  width: 9,
  height: 7,
  yTex: (y) => (y >= 1000 ? `${Math.floor(y / 1000)}{,}${String(y % 1000).padStart(3, '0')}` : String(y)),
});

/** The cost and revenue parabolas, with the two break-even points where they cross. */
const graph = () =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'C', f: C, from: 0, to: 22, tone: 'opp', label: 'C(x)', labelAt: 0.97, side: 'right' }),
      plot(g, { id: 'R', f: R, from: 0, to: 22, tone: 'good', label: 'R(x)', labelAt: 0.5 }),
      dots(g, [
        { id: 'A', x: X1, y: C(X1), tone: 'brand', group: 'meet' },
        { id: 'B', x: X2, y: C(X2), tone: 'brand', group: 'meet' },
      ]),
    ],
    460,
  );

const QUESTION =
  'Construct a system of nonlinear equations to describe the given behavior, then solve for the requested solutions. A laptop company has discovered their cost and revenue functions for each day: C(x) = 3x² − 10x + 200 and R(x) = −2x² + 100x + 50. If they want to make a profit, what is the range of laptops per day that they should produce? Round to the nearest number which would generate profit.';

const video: Explainer = {
  id: 'xq-m201-8-1',
  lessonId: '',
  exam: {
    lesson: 'm201-8-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 7.3, Systems of Nonlinear Equations and Inequalities: Two Variables',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/7-3-systems-of-nonlinear-equations-and-inequalities-two-variables',
    question: QUESTION,
  },
  title: 'Exam Question: When Does the Laptop Company Make a Profit? (Linear-Quadratic and Quadratic-Quadratic Systems)',
  thumbnailTitle: 'When Is There a Profit?',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: a laptop company has daily cost C(x) = 3x² − 10x + 200 and revenue R(x) = −2x² + 100x + 50. We graph the two parabolas as a system, find where they cross by solving x² − 22x + 30 = 0, get x = 11 ± √91 (about 1.46 and 20.54), and see that revenue beats cost between them, so the company should make 2 to 20 laptops a day. Then we check the ends and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'When Is There a Profit?', subtitle: 'Systems of equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about a system of two quadratic equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt:
            'Construct a system of nonlinear equations to describe the given behavior, then solve for the requested solutions. A laptop company has discovered their cost and revenue functions for each day: $C(x) = 3x^2 - 10x + 200$ and $R(x) = -2x^2 + 100x + 50$. If they want to make a profit, what is the range of laptops per day that they should produce? Round to the nearest number which would generate profit.',
          answer: '$2$ to $20$ laptops per day',
          working: '$C = R$ when $x^2 - 22x + 30 = 0$, so $x = 11 \\pm \\sqrt{91} \\approx 1.46$ or $20.54$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'A laptop company makes x laptops a day. Its daily cost is C of x equals 3 x squared, minus 10 x, plus 200. Its daily revenue is R of x equals negative 2 x squared, plus 100 x, plus 50. To make a profit, how many laptops a day should it make? Round to whole numbers that give a profit.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'A **profit** means revenue is **more** than cost: $R(x) > C(x)$. The edges of that range are where $R(x) = C(x)$, the **break-even** points.' }],
      lines: [{ say: 'The company makes a profit when the money coming in, the revenue, is more than the money going out, the cost. The edges of that range are where revenue equals cost. These are called the break-even points.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'sys', tone: 'definition', title: 'A system', md: 'Two equations in the same variables. Its **solutions** are the points where the two **graphs meet**.' },
        { kind: 'callout', id: 'sub', tone: 'key', title: 'Solving by setting equal', md: 'When both equations say $y = \\ldots$, set the right sides **equal** and solve for $x$.' },
      ],
      lines: [
        { say: 'Here is what we need. A system is two equations in the same variables. Its solutions are the points where the two graphs meet.', show: 'sys' },
        { say: 'When both equations are written as y equals something, we can set the two right sides equal to each other and solve for x.', show: 'sub' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write the **system** and **graph** it', 'Find the **break-even** points', 'Read off the **profit** range and round'] }],
      lines: [
        { say: 'Here is the plan. First, write the system, and graph both parabolas.', show: 'plan.0' },
        { say: 'Second, find where they meet, the break-even points.', show: 'plan.1' },
        { say: 'Third, read off where revenue is above cost, and round to whole laptops.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Graph the system',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['y = 3x^2 - 10x + 200', 'y = -2x^2 + 100x + 50'] }],
      lines: [
        { say: 'Step one. The system is y equals the cost, and y equals the revenue.', show: ['m.0', 'm.1'] },
        { say: 'Here are the axes: laptops across, dollars up.', show: ['gr.grid', 'gr.axes'] },
        { say: 'The cost is a parabola opening up. It starts at 200 dollars, even with no laptops made.', show: 'gr.C' },
        { say: 'The revenue is a parabola opening down. It rises, then falls when too many laptops are made.', show: 'gr.R' },
        { say: 'They cross twice: once near 1 or 2 laptops, and once near 20 laptops. Between the crossings, revenue is above cost.', show: 'gr.meet', focus: 'gr.meet' },
      ],
    },
    {
      chapter: 'Step 2: The break-even points',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '3x^2 - 10x + 200 = -2x^2 + 100x + 50',
            '5x^2 - 110x + 150 = 0',
            'x^2 - 22x + 30 = 0',
            'x = \\dfrac{22 \\pm \\sqrt{484 - 120}}{2} = 11 \\pm \\sqrt{91}',
            'x \\approx \\good{1.46} \\quad \\text{or} \\quad x \\approx \\good{20.54}',
          ],
        },
      ],
      lines: [
        { say: 'Step two. To find the crossings exactly, set cost equal to revenue.', show: 'm.0' },
        { say: 'Move everything to the left: add 2 x squared, subtract 100 x, and subtract 50. That gives 5 x squared minus 110 x plus 150 equals 0.', show: 'm.1' },
        { say: 'Divide by 5: x squared minus 22 x plus 30 equals 0.', show: 'm.2' },
        { say: 'This does not factor, so use the quadratic formula: 22, plus or minus the square root of 484 minus 120, over 2. That is 11 plus or minus root 91.', show: 'm.3' },
        { say: 'Root 91 is about 9.54, so x is about 1.46 or about 20.54.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Step 3: The profit range',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1.46 < x < 20.54', 'x \\text{ is a whole number: } \\good{2 \\le x \\le 20}'] }],
      lines: [
        { say: 'Step three. Revenue is above cost between the two break-even points: x between 1.46 and 20.54.', show: 'm.0' },
        { say: 'x counts laptops, so it is a whole number. The whole numbers in that range are 2 to 20. So the company should make 2 to 20 laptops a day.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['$x$', '$C(x)$', '$R(x)$', 'profit?'],
          rows: [
            ['$1$', '$193$', '$148$', 'no'],
            ['$2$', '$192$', '$242$', '**yes**'],
            ['$20$', '$1{,}200$', '$1{,}250$', '**yes**'],
            ['$21$', '$1{,}313$', '$1{,}268$', 'no'],
          ],
        },
      ],
      lines: [
        { say: 'Let us check the ends. At 1 laptop, the cost is 193 and the revenue is only 148. That is a loss.', show: 'tab' },
        { say: 'At 2 laptops, the cost is 192 and the revenue is 242. A profit of 50.' },
        { say: 'At 20 laptops, the cost is 1,200 and the revenue is 1,250. Still a profit of 50.' },
        { say: 'At 21 laptops, the cost is 1,313 and the revenue is 1,268. A loss again. So 2 to 20 is right.' },
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
            ['$1$ to $21$ laptops', 'round **inward**: $1$ and $21$ both lose money'],
            ['$-2x^2 - 3x^2 = -x^2$', 'moving $-2x^2$ across **adds** $2x^2$: $5x^2$'],
            ['outside the crossings', 'cost is **above** revenue there: a loss'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not round 1.46 down to 1, or 20.54 up to 21. Both lose money. Round inward, to the whole numbers inside the range.' },
        { say: 'When you move negative 2 x squared to the left, you add 2 x squared, which gives 5 x squared, not x squared.' },
        { say: 'And the profit is between the crossings, not outside them. Outside, the cost parabola is on top.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Where do $y = x^2$ and $y = x + 6$ meet?',
          choices: ['$(-2, 4)$ and $(3, 9)$', '$(2, 4)$ and $(-3, 9)$', '$(-2, 4)$ only', '$(3, 9)$ only'],
          answer: 0,
          working: '$x^2 = x + 6$, so $x^2 - x - 6 = (x - 3)(x + 2) = 0$: $x = 3$ or $x = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Where do the parabola y equals x squared and the line y equals x plus 6 meet? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Set them equal: x squared equals x plus 6, so x squared minus x minus 6 equals 0. That factors as x minus 3, times x plus 2, so x is 3 or negative 2. Then y is 9 or 4. The points are negative 2, 4 and 3, 9, choice A. B swaps the signs of x.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A system\'s solutions are where the **graphs meet**', 'Set the two sides **equal** and solve', 'Profit: **between** the break-even points', 'Round **inward** to whole numbers'] }],
      lines: [
        { say: 'Here is what to remember. The solutions of a system are the points where the graphs meet.', show: 'sum.0' },
        { say: 'To find them exactly, set the two sides equal and solve the quadratic.', show: 'sum.1' },
        { say: 'Here, the profit is between the two break-even points.', show: 'sum.2' },
        { say: 'And when the answer counts things, round inward to whole numbers. For more on solving systems of equations graphically, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
