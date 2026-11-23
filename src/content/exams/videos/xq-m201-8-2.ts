import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 8.2 (solving systems algebraically): 3x − y = −2 and
// 2x² − y = 0 by substitution. The question is a Try It from OpenStax College Algebra 2e, word for
// word (section 7.3, Systems of Nonlinear Equations and Inequalities: Two Variables, CC BY-NC-SA 4.0),
// whose answer is (−1/2, 1/2) and (2, 8): y = 3x + 2, so 2x² − 3x − 2 = (2x + 1)(x − 2) = 0.

const g = plane({ x: [-2, 3], y: [-1, 10], yStep: 1, every: 1, width: 9, height: 7 });

/** The parabola y = 2x² and the line y = 3x + 2, meeting at (−1/2, 1/2) and (2, 8). */
const graph = () =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'par', f: (x) => 2 * x * x, tone: 'brand', label: 'y = 2x^2', labelAt: 0.1, side: 'right' }),
      plot(g, { id: 'line', f: (x) => 3 * x + 2, tone: 'opp', label: 'y = 3x + 2', labelAt: 0.95, side: 'right' }),
      dots(g, [
        { id: 'A', x: -0.5, y: 0.5, tone: 'good', group: 'meet' },
        { id: 'B', x: 2, y: 8, tex: '(2, 8)', tone: 'good', place: 'left', group: 'meet' },
      ]),
    ],
    480,
  );

const QUESTION = 'Solve the given system of equations by substitution. 3x − y = −2 and 2x² − y = 0';

const video: Explainer = {
  id: 'xq-m201-8-2',
  lessonId: '',
  exam: {
    lesson: 'm201-8-2',
    source: 'OpenStax, College Algebra 2e, Try It in section 7.3, Systems of Nonlinear Equations and Inequalities: Two Variables',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/7-3-systems-of-nonlinear-equations-and-inequalities-two-variables',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 3x − y = −2 and 2x² − y = 0 by Substitution (Solving Systems Algebraically)',
  thumbnailTitle: 'Solve the System by Substitution',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: solve the system 3x − y = −2 and 2x² − y = 0 by substitution. We solve the line for y = 3x + 2, substitute into the parabola to get 2x² − 3x − 2 = 0, factor it as (2x + 1)(x − 2) = 0, and find the two solutions (−1/2, 1/2) and (2, 8). Then we check them in both equations and on a graph, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve by Substitution', subtitle: 'Solving systems algebraically, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about solving a system of equations algebraically. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve the given system of equations by substitution. $\\begin{aligned} 3x - y &= -2 \\\\ 2x^2 - y &= 0 \\end{aligned}$',
          answer: '$\\left(-\\tfrac{1}{2}, \\tfrac{1}{2}\\right)$ and $(2, 8)$',
          working: '$y = 3x + 2$, so $2x^2 - 3x - 2 = (2x + 1)(x - 2) = 0$.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Solve the system by substitution: 3 x minus y equals negative 2, and 2 x squared minus y equals 0.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find every pair $(x, y)$ that makes **both** equations true. One is a **line** and one is a **parabola**, so there can be $0$, $1$ or $2$ solutions.' }],
      lines: [{ say: 'We need every pair x, y that makes both equations true at the same time. The first is a line and the second is a parabola, so there could be no solutions, one, or two.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'sub', tone: 'definition', title: 'Substitution', md: 'Solve one equation for a variable, then **replace** that variable in the other equation.' },
        { kind: 'callout', id: 'dec', tone: 'key', title: 'Factoring by decomposition', md: '$2x^2 - 3x - 2$: $2 \\times (-2) = -4$, and $-4 + 1 = -3$.' },
      ],
      lines: [
        { say: 'Here is what we need. Substitution means solving one equation for one variable, then putting that expression into the other equation in its place.', show: 'sub' },
        { say: 'And we will factor a quadratic by decomposition. For 2 x squared minus 3 x minus 2, multiply 2 by negative 2 to get negative 4, and find two numbers that multiply to negative 4 and add to negative 3: negative 4 and 1.', show: 'dec' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Solve the **line** for $y$', '**Substitute** into the parabola and solve for $x$', 'Find each $y$ from the **line**'] }],
      lines: [
        { say: 'Here is the plan. First, solve the linear equation for y.', show: 'plan.0' },
        { say: 'Second, substitute it into the quadratic equation, and solve for x.', show: 'plan.1' },
        { say: 'Third, find each matching y from the line.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Solve the line for y',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3x - y = -2', '3x + 2 = y', '\\good{y = 3x + 2}'] }],
      lines: [
        { say: 'Step one. Start with the line: 3 x minus y equals negative 2.', show: 'm.0' },
        { say: 'Add y and add 2 to both sides: 3 x plus 2 equals y.', show: 'm.1' },
        { say: 'So y equals 3 x plus 2.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Substitute and solve',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'lg',
          lines: [
            '2x^2 - (3x + 2) = 0',
            '2x^2 - 3x - 2 = 0',
            '2x^2 - 4x + x - 2 = 2x(x - 2) + (x - 2) = 0',
            '(2x + 1)(x - 2) = 0',
            'x = \\good{-\\tfrac{1}{2}} \\quad \\text{or} \\quad x = \\good{2}',
          ],
        },
      ],
      lines: [
        { say: 'Step two. In the second equation, replace y with 3 x plus 2, in brackets.', show: 'm.0' },
        { say: 'Remove the brackets. The minus sign changes both signs: 2 x squared minus 3 x minus 2 equals 0.', show: 'm.1' },
        { say: 'Split the middle term into negative 4 x plus x, and group: 2 x times x minus 2, plus 1 times x minus 2.', show: 'm.2' },
        { say: 'So it factors as 2 x plus 1, times x minus 2.', show: 'm.3' },
        { say: 'Each factor can be 0, so x is negative 1 half, or x is 2.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Step 3: Find each y',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = -\\tfrac{1}{2}: \\quad y = 3\\left(-\\tfrac{1}{2}\\right) + 2 = \\tfrac{1}{2}', 'x = 2: \\quad y = 3(2) + 2 = 8', '\\good{\\left(-\\tfrac{1}{2}, \\tfrac{1}{2}\\right) \\ \\text{and} \\ (2, 8)}'] }],
      lines: [
        { say: 'Step three. Put each x into y equals 3 x plus 2. For negative 1 half, y is negative 3 halves plus 2, which is 1 half.', show: 'm.0' },
        { say: 'For 2, y is 6 plus 2, which is 8.', show: 'm.1' },
        { say: 'So the solutions are the point at negative 1 half, 1 half, and the point at 2, 8.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 640,
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['(2, 8): \\ 6 - 8 = -2 \\ \\checkmark', '2(4) - 8 = 0 \\ \\checkmark', '\\left(-\\tfrac{1}{2}, \\tfrac{1}{2}\\right): \\ -\\tfrac{3}{2} - \\tfrac{1}{2} = -2 \\ \\checkmark', '2\\left(\\tfrac{1}{4}\\right) - \\tfrac{1}{2} = 0 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check both points in both equations. For the point at 2, 8: 3 times 2 minus 8 is negative 2, and 2 times 4 minus 8 is 0.', show: ['m.0', 'm.1'] },
        { say: 'For the point at negative 1 half, 1 half: negative 3 halves minus 1 half is negative 2, and 2 times 1 quarter minus 1 half is 0. Both work.', show: ['m.2', 'm.3'] },
        { say: 'On a graph, here is the parabola y equals 2 x squared, and the line y equals 3 x plus 2.', show: ['gr.grid', 'gr.axes', 'gr.par', 'gr.line'] },
        { say: 'They cross at exactly our two points.', show: 'gr.meet', focus: 'gr.meet' },
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
            ['$2x^2 - 3x + 2 = 0$', 'the minus reaches **both** terms of $3x + 2$'],
            ['$y = 3x - 2$', '$3x - y = -2$ gives $y = 3x + 2$'],
            ['$x = -\\tfrac{1}{2}$ and $x = 2$ only', 'a solution is a **pair**: find each $y$ too'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Keep the brackets when you substitute. The minus sign changes both the 3 x and the 2.' },
        { say: 'Rearrange the line carefully. 3 x minus y equals negative 2 gives y equals 3 x plus 2, not 3 x minus 2.' },
        { say: 'And a solution of a system is a pair. After finding x, find the matching y.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve the system $y = x^2 + 1$ and $y = 2x$.',
          choices: ['$(1, 2)$ and $(-1, 2)$', '$(1, 2)$ only', 'no solution', '$(0, 1)$ and $(1, 2)$'],
          answer: 1,
          working: '$x^2 + 1 = 2x$, so $x^2 - 2x + 1 = (x - 1)^2 = 0$: $x = 1$, $y = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve the system y equals x squared plus 1, and y equals 2 x. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Substitute: x squared plus 1 equals 2 x, so x squared minus 2 x plus 1 equals 0. That is x minus 1, squared, so x is only 1, and y is 2. The line just touches the parabola at the point at 1, 2, choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Solve the **line** for one variable', '**Substitute** with brackets', 'Solve the quadratic for $x$', 'Find each $y$, and **check** in both'] }],
      lines: [
        { say: 'Here is what to remember. Solve the linear equation for one variable.', show: 'sum.0' },
        { say: 'Substitute it into the other equation, in brackets.', show: 'sum.1' },
        { say: 'Solve the quadratic for x.', show: 'sum.2' },
        { say: 'Then find each y, and check every pair in both equations. For more on solving systems algebraically, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
