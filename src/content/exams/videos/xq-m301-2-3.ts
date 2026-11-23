import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 2.3 (solving radical equations graphically). The question is
// an exercise from OpenStax College Algebra 2e, word for word (section 2.6, Other Types of
// Equations, CC BY-NC-SA 4.0), with its set's instruction in front of it. Squaring gives
// x² + x − 12 = 0, so x = 3 or x = −4; √16 = 4 ≠ −4, so −4 is extraneous and x = 3, as in the
// book's answer. The graphs of y = √(12 − x) and y = x meet once, at (3, 3).

const g = plane({ x: [-7, 6.5], y: [-6, 5.5], every: 2, width: 13.5, height: 11.5 });

/** y = √(12 − x) (`root`), y = x (`line`), the meeting point (`hit`) and the two points at x = −4 (`miss`). */
const graph = (height = 460) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'root', f: (x) => Math.sqrt(12 - x), from: -7, to: 6.5, tone: 'adj', samples: 60 }),
      polyline(g, { id: 'line', points: [[-5, -5], [5.5, 5.5]], tone: 'opp' }),
      dots(g, [
        { id: 'hit', x: 3, y: 3, tex: '(3, 3)', tone: 'good', place: 'below right' },
        { id: 'm0', x: -4, y: 4, tex: '(-4, 4)', tone: 'bad', place: 'below', group: 'miss' },
        { id: 'm1', x: -4, y: -4, tex: '(-4, -4)', tone: 'bad', place: 'above left', group: 'miss' },
      ]),
    ],
    height,
  );

const QUESTION = 'Solve the radical equation. Be sure to check all solutions to eliminate extraneous solutions. √(12 − x) = x';

const video: Explainer = {
  id: 'xq-m301-2-3',
  lessonId: '',
  exam: {
    lesson: 'm301-2-3',
    source: 'OpenStax, College Algebra 2e, Exercise in section 2.6, Other Types of Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/2-6-other-types-of-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve √(12 − x) = x and Spot the Extraneous Root (Solving Radical Equations Graphically)',
  thumbnailTitle: 'Solve √(12 − x) = x',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: solve √(12 − x) = x and check for extraneous solutions. Squaring gives x² + x − 12 = 0, so x = 3 or x = −4, but only x = 3 works. Then we see why on a graph: y = √(12 − x) and y = x meet only once, at (3, 3). Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve √(12 − x) = x', subtitle: 'Solving radical equations graphically, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about radical equations, with algebra and with a graph. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Solve the radical equation. Be sure to check all solutions to eliminate extraneous solutions. $\\sqrt{12 - x} = x$',
          answer: '$x = 3$ (and $x = -4$ is extraneous)',
          working: 'Square: $12 - x = x^2$, so $(x + 4)(x - 3) = 0$. Check: $\\sqrt{9} = 3$ works, $\\sqrt{16} = 4 \\neq -4$ does not.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Solve the radical equation. Be sure to check all solutions to eliminate extraneous solutions. The square root of 12 minus x equals x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find every $x$ that makes **both sides equal**. Squaring can add a **fake** answer, so every answer must be **checked** in the original equation.' }],
      lines: [
        { say: 'We need every value of x that makes the two sides equal.', show: 't' },
        { say: 'Squaring both sides can add a fake answer, called an extraneous solution. So we must check every answer in the original equation.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'sq', tone: 'key', title: 'Squaring both sides', md: 'Squaring removes the root, but it also lets in answers to $-\\sqrt{12 - x} = x$. Those are **extraneous**.' },
        { kind: 'callout', id: 'gr', tone: 'tip', title: 'Solving graphically', md: 'Graph $y = $ left side and $y = $ right side. Each **intersection** gives one solution: its $x$-coordinate.' },
      ],
      lines: [
        { say: 'Here is what we need. Squaring both sides removes the square root. But a negative right side squares to the same thing as a positive one, so squaring can let in answers that do not really work. Those are extraneous.', show: 'sq' },
        { say: 'To solve graphically, graph the left side and the right side as two functions. Each point where they meet gives one solution: its x-coordinate.', show: 'gr' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Square** both sides and solve', '**Check** each answer in the original', '**See** it on a graph'] }],
      lines: [
        { say: 'Here is the plan. First, square both sides and solve the equation we get.', show: 'plan.0' },
        { say: 'Second, check each answer in the original equation.', show: 'plan.1' },
        { say: 'Third, see the same answer on a graph.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Square and solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\left(\\sqrt{12 - x}\\right)^2 = x^2', '12 - x = x^2', 'x^2 + x - 12 = 0', '(x + 4)(x - 3) = 0 \\quad \\Rightarrow \\quad x = {-4} \\text{ or } x = 3'] }],
      lines: [
        { say: 'Step one. Square both sides.', show: 'm.0' },
        { say: 'The square root and the square cancel: 12 minus x equals x squared.', show: 'm.1' },
        { say: 'Move everything to one side: x squared, plus x, minus 12, equals 0.', show: 'm.2' },
        { say: 'Factor: x plus 4, times x minus 3, equals 0. So x is negative 4 or 3. But we are not done yet.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Step 2: Check both',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 3: \\quad \\sqrt{12 - 3} = \\sqrt{9} = 3 \\ \\checkmark', 'x = {-4}: \\quad \\sqrt{12 + 4} = \\sqrt{16} = 4 \\neq {-4} \\ \\bad{\\times}', '\\good{x = 3}'] }],
      lines: [
        { say: 'Step two. Check x equals 3. The square root of 12 minus 3 is the square root of 9, which is 3. That matches the right side, so 3 works.', show: 'm.0' },
        { say: 'Check x equals negative 4. The square root of 12 plus 4 is the square root of 16, which is 4. But the right side is negative 4. A square root is never negative, so negative 4 is extraneous.', show: 'm.1' },
        { say: 'So the only solution is x equals 3.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: See it on a graph',
      layout: 'center',
      main: [graph(470)],
      lines: [
        { say: 'Step three. Graph the left side, y equals the square root of 12 minus x. It is always above the x-axis.', show: ['gr.grid', 'gr.axes', 'gr.root'] },
        { say: 'Now graph the right side, y equals x.', show: 'gr.line' },
        { say: 'They meet only once, at the point at 3, 3. So there is only one solution, x equals 3.', show: 'gr.hit', focus: 'gr.hit' },
        { say: 'At x equals negative 4, the root is at 4 but the line is at negative 4. The graphs do not meet there, so negative 4 is not a solution.', show: 'gr.miss', focus: 'gr.miss' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\sqrt{12 - 3} = 3 \\ \\checkmark', '\\text{graphs meet once, at } (3, 3) \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. x equals 3 makes both sides equal to 3.', show: 'm.0' },
        { say: 'And the graph shows exactly one meeting point, at x equals 3, so there are no other solutions. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$x = -4$ or $x = 3$', 'not checked: $\\sqrt{16} = 4$, **not** $-4$'],
            ['$12 - x = x$', 'square **both** sides: the right side becomes $x^2$'],
            ['$\\sqrt{12} - \\sqrt{x} = x$', 'a root of a difference does **not** split'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not stop after solving. Negative 4 looks like an answer, but the check shows it is extraneous.' },
        { say: 'Square both sides. The right side, x, becomes x squared.' },
        { say: 'And the square root of 12 minus x cannot be split into root 12 minus root x.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $\\sqrt{x + 6} = x$.',
          choices: ['$x = 3$', '$x = -2$ or $x = 3$', '$x = -2$', 'no solution'],
          answer: 0,
          working: 'Square: $x + 6 = x^2$, so $(x - 3)(x + 2) = 0$. Check: $\\sqrt{9} = 3$ works, $\\sqrt{4} = 2 \\neq -2$ does not.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve the square root of x plus 6 equals x. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Square both sides: x plus 6 equals x squared, so x is 3 or negative 2. The square root of 9 is 3, which works. The square root of 4 is 2, not negative 2, so negative 2 is extraneous. Only x equals 3: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Square** both sides to remove the root', '**Check** every answer in the original equation', 'A square root is **never negative**', 'On a graph, count the **intersections**'] }],
      lines: [
        { say: 'Here is what to remember. Square both sides to remove the root.', show: 'sum.0' },
        { say: 'Check every answer in the original equation.', show: 'sum.1' },
        { say: 'A square root is never negative, so an answer that needs one is extraneous.', show: 'sum.2' },
        { say: 'And on a graph, count the intersections: that is how many solutions there are. For more on solving radical equations graphically, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
