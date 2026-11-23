import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 7.7 (logarithmic and exponential equations). The question is
// an exercise from OpenStax College Algebra 2e, word for word (section 6.6, Exponential and
// Logarithmic Equations, CC BY-NC-SA 4.0), with its set's instruction in front of it. The product
// law gives ln(x(x − 3)) = ln(7x), so x² − 3x = 7x, x(x − 10) = 0 and x = 0 or x = 10. ln 0 is
// undefined, so x = 0 is extraneous and x = 10, as in the book's answer. The two sides, graphed,
// meet only at (10, ln 70).

const g = plane({ x: [-0.8, 14], y: [-2.5, 6], xStep: 1, yStep: 1, every: 2, width: 12, height: 7 });

/** y = ln x + ln(x − 3) (`l`), y = ln(7x) (`r`) and where they meet (`p`). */
const graph = (height = 430) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'l', f: (x) => Math.log(x) + Math.log(x - 3), from: 3.005, to: 14, tone: 'adj', samples: 300, label: '\\ln x + \\ln(x - 3)', labelAt: 0.35, side: 'right' }),
      plot(g, { id: 'r', f: (x) => Math.log(7 * x), from: 0.02, to: 14, tone: 'theta', samples: 300, label: '\\ln(7x)', labelAt: 0.5, side: 'left' }),
      dots(g, [{ id: 'p', x: 10, y: Math.log(70), tex: '(10, \\ln 70)', tone: 'good', place: 'below right' }]),
    ],
    height,
  );

const QUESTION = 'Solve each equation for x. ln(x) + ln(x − 3) = ln(7x)';

const video: Explainer = {
  id: 'xq-m301-7-7',
  lessonId: '',
  exam: {
    lesson: 'm301-7-7',
    source: 'OpenStax, College Algebra 2e, Exercise in section 6.6, Exponential and Logarithmic Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/6-6-exponential-and-logarithmic-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve ln(x) + ln(x − 3) = ln(7x) (Logarithmic and Exponential Equations)',
  thumbnailTitle: 'Solve ln x + ln(x − 3) = ln 7x',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: solve ln(x) + ln(x − 3) = ln(7x). The product law turns the left side into one log, so x(x − 3) = 7x. That quadratic gives x = 0 or x = 10, but ln 0 is undefined, so x = 0 is extraneous and the answer is x = 10. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve ln x + ln(x − 3) = ln 7x', subtitle: 'Logarithmic and exponential equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about logarithmic equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve each equation for $x$. $\\ln(x) + \\ln(x - 3) = \\ln(7x)$',
          answer: '$x = 10$ ($x = 0$ is extraneous)',
          working: '$\\ln(x(x - 3)) = \\ln(7x)$, so $x^2 - 3x = 7x$ and $x(x - 10) = 0$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Solve each equation for x. Natural log of x, plus natural log of x minus 3, equals natural log of 7 x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find every $x$ that makes both sides equal, **and** keeps every log **defined**: each log needs a **positive** input.' }],
      lines: [
        { say: 'We need every x that makes the two sides equal.', show: 't' },
        { say: 'But there is a catch. Every log in the equation needs a positive input, so some answers from the algebra might not be allowed.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'laws', size: 'lg', lines: ['\\ln M + \\ln N = \\ln(MN)', '\\ln A = \\ln B \\ \\Rightarrow \\ A = B'] },
        { kind: 'callout', id: 'ext', tone: 'mistake', title: 'Extraneous roots', md: 'An answer that makes **any** log input $0$ or negative must be **rejected**.' },
      ],
      lines: [
        { say: 'Here is what we need. The product law: a sum of logs is the log of the product.', show: 'laws.0' },
        { say: 'If two natural logs are equal, their inputs are equal. That is the one-to-one property.', show: 'laws.1' },
        { say: 'And an answer that makes any log input 0 or negative is extraneous. We must reject it.', show: 'ext' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Combine the left side into **one log**', 'Set the **insides equal** and solve', '**Check** every answer in the original'] }],
      lines: [
        { say: 'Here is the plan. First, combine the left side into one log.', show: 'plan.0' },
        { say: 'Second, set the insides equal and solve.', show: 'plan.1' },
        { say: 'Third, check every answer in the original equation.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: One log',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\ln x + \\ln(x - 3) = \\ln(7x)', '\\good{\\ln\\big(x(x - 3)\\big)} = \\ln(7x)'] }],
      lines: [
        { say: 'Step one. Start with the equation.', show: 'm.0' },
        { say: 'By the product law, log x plus log of x minus 3 is the log of x times x minus 3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x(x - 3) = 7x', 'x^2 - 3x - 7x = 0 \\ \\Rightarrow \\ x^2 - 10x = 0', 'x(x - 10) = 0 \\ \\Rightarrow \\ x = 0 \\ \\text{or} \\ x = 10'] }],
      lines: [
        { say: 'Step two. Both sides are a single natural log, so the insides are equal: x times x minus 3 equals 7 x.', show: 'm.0' },
        { say: 'Expand and move everything to one side: x squared minus 3 x minus 7 x equals 0, which is x squared minus 10 x equals 0.', show: 'm.1' },
        { say: 'Factor out x: x times x minus 10 equals 0. So x is 0 or x is 10.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Check both',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 0: \\ \\ln 0 \\ \\text{is undefined} \\ \\Rightarrow \\ \\bad{\\text{reject}}', 'x = 10: \\ \\ln 10 + \\ln 7 = \\ln 70 = \\ln(7 \\cdot 10) \\ \\checkmark', 'x = \\good{10}'] }],
      lines: [
        { say: 'Step three. Check x equals 0. The first term would be the natural log of 0, which is undefined. So x equals 0 is extraneous, and we reject it.', show: 'm.0' },
        { say: 'Check x equals 10. The left side is log 10 plus log 7, which is log 70. The right side is log of 7 times 10, which is also log 70. It works.', show: 'm.1' },
        { say: 'So the only solution is x equals 10.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph()],
      lines: [
        { say: 'Let us check on a graph. Here is the left side, log x plus log of x minus 3. It only starts at x equals 3, because x minus 3 must be positive.', show: ['gr.grid', 'gr.axes', 'gr.l'] },
        { say: 'And here is the right side, log of 7 x.', show: 'gr.r' },
        { say: 'They meet at only one point, where x is 10. Nothing happens at x equals 0, because the left side does not even exist there.', show: 'gr.p', focus: 'gr.p' },
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
            ['$\\ln x + \\ln(x - 3) = \\ln(2x - 3)$', 'adding logs **multiplies** the insides'],
            ['$\\ln(x - 3) = \\ln x - \\ln 3$', 'no law splits a log of a **difference**'],
            ['$x = 0$ or $x = 10$', '$\\ln 0$ is undefined: **reject** $x = 0$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Adding logs multiplies the insides. It does not add them.' },
        { say: 'There is no law for the log of a difference. Log of x minus 3 is not log x minus log 3.' },
        { say: 'And always check. x equals 0 solves the quadratic, but not the original equation.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $\\log_2 x + \\log_2(x - 2) = 3$.',
          choices: ['$x = 4$', '$x = -2$ and $x = 4$', '$x = -2$', '$x = 6$'],
          answer: 0,
          working: '$x(x - 2) = 2^3 = 8$, so $(x - 4)(x + 2) = 0$. $x = -2$ makes $\\log_2 x$ undefined, so $x = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve log base 2 of x, plus log base 2 of x minus 2, equals 3. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Combine: log base 2 of x times x minus 2 equals 3, so x times x minus 2 equals 2 cubed, which is 8. That factors as x minus 4, times x plus 2. Negative 2 would need the log of a negative number, so we reject it. x equals 4: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Combine logs into **one log** with the log laws', 'One log on each side: set the **insides equal**', 'Solve the equation that is left', '**Reject** answers that make a log input $\\le 0$'] }],
      lines: [
        { say: 'Here is what to remember. Combine logs into one log with the log laws.', show: 'sum.0' },
        { say: 'With one log on each side, set the insides equal.', show: 'sum.1' },
        { say: 'Solve the equation that is left.', show: 'sum.2' },
        { say: 'And reject any answer that makes a log input 0 or negative. For more on logarithmic and exponential equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
