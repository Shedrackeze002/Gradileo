import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 5.3 (radical equations): √(x + 3) = 3x − 1. The question is a
// Try It from OpenStax College Algebra 2e, word for word (section 2.6, Other Types of Equations,
// CC BY-NC-SA 4.0), whose answer gives x = 1, with −2/9 extraneous. Squaring gives
// 9x² − 7x − 2 = (9x + 2)(x − 1) = 0; at x = −2/9 the left side is 5/3 and the right side −5/3.

const g = plane({ x: [-3.5, 2.5], y: [-2, 3], every: 1, width: 9, height: 7 });

/** y = √(x + 3) and y = 3x − 1, which meet only at (1, 2); `false` marks x = −2/9 on both. */
const graph = (fake = true) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'root', f: (x) => Math.sqrt(Math.max(0, x + 3)), from: -3, to: 2.5, tone: 'adj', label: 'y = \\sqrt{x + 3}', labelAt: 0.12, side: 'right' }),
      plot(g, { id: 'line', f: (x) => 3 * x - 1, tone: 'opp', label: 'y = 3x - 1', labelAt: 0.92, side: 'right' }),
      dots(g, [{ id: 'P', x: 1, y: 2, tex: '(1, 2)', tone: 'good', place: 'right' }]),
      ...(fake
        ? [
            dots(g, [
              { id: 'f1', x: -2 / 9, y: 5 / 3, tone: 'bad', group: 'fake' },
              { id: 'f2', x: -2 / 9, y: -5 / 3, tone: 'bad', group: 'fake' },
            ]),
          ]
        : []),
    ],
    480,
  );

const QUESTION = 'Solve the radical equation: √(x + 3) = 3x − 1';

const video: Explainer = {
  id: 'xq-m201-5-3',
  lessonId: '',
  exam: {
    lesson: 'm201-5-3',
    source: 'OpenStax, College Algebra 2e, Try It in section 2.6, Other Types of Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/2-6-other-types-of-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve √(x + 3) = 3x − 1 (Radical Equations and Extraneous Roots)',
  thumbnailTitle: 'Solve √(x + 3) = 3x − 1',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: solve √(x + 3) = 3x − 1. We state the restrictions, square both sides, and solve 9x² − 7x − 2 = 0 to get x = 1 or x = −2/9. Checking both in the original equation shows that −2/9 is extraneous, so the only solution is x = 1. Then we see why on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve the Radical Equation', subtitle: 'Radical equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about radical equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve the radical equation: $\\sqrt{x + 3} = 3x - 1$',
          answer: '$x = 1$ (the value $x = -\\dfrac{2}{9}$ is extraneous)',
          working: '$x + 3 = 9x^2 - 6x + 1$, so $(9x + 2)(x - 1) = 0$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Solve the radical equation: root x plus 3 equals 3 x minus 1.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find every $x$ that makes both sides **equal**. Squaring removes the root, but it can also add a **fake** solution, so we must check.' }],
      lines: [{ say: 'We want every value of x that makes the two sides equal. Squaring both sides gets rid of the root, but squaring can also create a fake solution, called an extraneous root. So we must check every answer.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'res', tone: 'definition', title: 'Restrictions', md: 'A square root needs a radicand $\\ge 0$, and its value is never negative: here $x + 3 \\ge 0$ and $3x - 1 \\ge 0$.' },
        { kind: 'callout', id: 'ext', tone: 'mistake', title: 'Extraneous roots', md: 'Squaring can turn a **false** equation into a true one: $5 \\ne -5$, but $25 = 25$. Check every root in the **original** equation.' },
      ],
      lines: [
        { say: 'Here is what we need. The number under a square root cannot be negative, and the square root itself is never negative. So x plus 3 must be at least 0, and 3 x minus 1 must be at least 0, which means x is at least 1 third.', show: 'res' },
        { say: 'And squaring can make a false statement true. 5 does not equal negative 5, but 25 equals 25. So check every root in the original equation.', show: 'ext' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Square** both sides', 'Solve the **quadratic**', '**Check** each root in the original'] }],
      lines: [
        { say: 'Here is the plan. First, square both sides.', show: 'plan.0' },
        { say: 'Second, solve the quadratic equation that appears.', show: 'plan.1' },
        { say: 'Third, check each root in the original equation.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Square both sides',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\left(\\sqrt{x + 3}\\right)^2 = (3x - 1)^2', 'x + 3 = 9x^2 - 6x + 1', '0 = 9x^2 - 7x - 2'] }],
      lines: [
        { say: 'Step one. Square both sides. Squaring the root just leaves x plus 3.', show: 'm.0' },
        { say: 'On the right, 3 x minus 1, squared, is 9 x squared minus 6 x plus 1. Do not forget the middle term.', show: 'm.1' },
        { say: 'Move x plus 3 to the right side: 9 x squared minus 7 x minus 2 equals 0.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Solve the quadratic',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['9x^2 - 9x + 2x - 2 = 0', '9x(x - 1) + 2(x - 1) = 0', '(9x + 2)(x - 1) = 0', 'x = -\\dfrac{2}{9} \\quad \\text{or} \\quad x = 1'] }],
      lines: [
        { say: 'Step two. Factor by decomposition. \"a\" times c is negative 18, and negative 9 and 2 multiply to negative 18 and add to negative 7. Split the middle term.', show: 'm.0' },
        { say: 'Group the pairs: 9 x times x minus 1, plus 2 times x minus 1.', show: 'm.1' },
        { say: 'So 9 x plus 2, times x minus 1, equals 0.', show: 'm.2' },
        { say: 'The roots are x equals negative 2 ninths and x equals 1. But we are not done.', show: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: Check each root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 1: \\ \\sqrt{4} = 2, \\quad 3(1) - 1 = 2 \\ \\checkmark', 'x = -\\tfrac{2}{9}: \\ \\sqrt{\\tfrac{25}{9}} = \\tfrac{5}{3}, \\quad 3\\left(-\\tfrac{2}{9}\\right) - 1 = -\\tfrac{5}{3} \\ \\times', '\\good{x = 1}'] }],
      lines: [
        { say: 'Step three. Check x equals 1. The left side is root 4, which is 2. The right side is 3 minus 1, which is 2. They match.', show: 'm.0' },
        { say: 'Check x equals negative 2 ninths. The left side is root 25 ninths, which is 5 thirds. The right side is negative 2 thirds minus 1, which is negative 5 thirds. They do not match, so negative 2 ninths is extraneous. It also breaks the restriction, x at least 1 third.', show: 'm.1' },
        { say: 'So the only solution is x equals 1. That is the answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The graphs meet **once**, at $(1, 2)$. At $x = -\\tfrac{2}{9}$ the two sides are $\\tfrac{5}{3}$ and $-\\tfrac{5}{3}$: opposites, which only **squaring** makes equal.' }],
      lines: [
        { say: 'Let us see it on a graph. Here is y equals root x plus 3, and y equals 3 x minus 1.', show: ['gr.grid', 'gr.axes', 'gr.root', 'gr.line'] },
        { say: 'They cross only once, at the point at 1, 2. So x equals 1 is the only solution.', show: 'gr.P', focus: 'gr.P' },
        { say: 'At x equals negative 2 ninths, the curve is at 5 thirds and the line is at negative 5 thirds. They are opposites, not equal. Squaring both made 25 ninths, which is how the fake root crept in.', show: ['gr.fake', 't'], focus: 'gr.fake' },
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
            ['$(3x - 1)^2 = 9x^2 + 1$', 'the square of a binomial has a **middle term**, $-6x$'],
            ['$x = 1$ or $x = -\\tfrac{2}{9}$', '$-\\tfrac{2}{9}$ fails the **check**: it is extraneous'],
            ['checking in $9x^2 - 7x - 2 = 0$', 'check in the **original** equation, with the root'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: '3 x minus 1, squared, is not 9 x squared plus 1. It has a middle term, negative 6 x.' },
        { say: 'Do not give both roots. Negative 2 ninths fails the check, so it is not a solution.' },
        { say: 'And check in the original equation, with the square root. Both roots satisfy the squared equation, so checking there proves nothing.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $\\sqrt{x + 7} = x + 1$.',
          choices: ['$x = 2$ or $x = -3$', '$x = 2$', '$x = -3$', 'no solution'],
          answer: 1,
          working: '$x + 7 = x^2 + 2x + 1$, so $x^2 + x - 6 = (x + 3)(x - 2) = 0$. At $x = -3$: $\\sqrt{4} = 2$ but $-3 + 1 = -2$, so $-3$ is extraneous.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve root x plus 7 equals x plus 1. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Square both sides: x plus 7 equals x squared plus 2 x plus 1, so x squared plus x minus 6 equals 0. That factors as x plus 3, times x minus 2, so x is negative 3 or 2. Check: at 2, root 9 is 3, and 2 plus 1 is 3. At negative 3, root 4 is 2, but negative 3 plus 1 is negative 2. So only x equals 2 works, choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['State the **restrictions**', '**Square** both sides, with the middle term', 'Solve the quadratic', '**Check** every root in the original equation'] }],
      lines: [
        { say: 'Here is what to remember. State the restrictions first.', show: 'sum.0' },
        { say: 'Square both sides, and remember the middle term.', show: 'sum.1' },
        { say: 'Solve the quadratic equation.', show: 'sum.2' },
        { say: 'And check every root in the original equation, to throw out any extraneous ones. For more on radical equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
