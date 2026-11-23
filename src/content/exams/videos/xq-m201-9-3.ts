import type { Explainer } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';
import { dots, plane, plot, type Plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 9.3 (quadratic inequalities in two variables): graph
// x² + y < 9. The question is an exercise from OpenStax College Algebra 2e, word for word apart
// from "For the following exercises," (section 7.3, Systems of Nonlinear Equations and Inequalities:
// Two Variables, CC BY-NC-SA 4.0). It is y < 9 − x²: a dashed parabola with vertex (0, 9) and
// x-intercepts ±3, shaded below, on the side of the origin.

const f = (x: number) => 9 - x * x;
const EDGE = Math.sqrt(15); // where the parabola leaves the bottom of the grid, y = −6

/** The region under the parabola, down to the bottom of the grid. */
const under = (g: Plane): Part => {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 40; i++) {
    const x = -EDGE + (2 * EDGE * i) / 40;
    pts.push([x, f(x)]);
  }
  const points: Record<string, [number, number]> = {};
  pts.forEach(([x, y], i) => (points[g.n(`sol-${i}`)] = g.map(x, y)));
  return { points, items: [{ kind: 'region', id: g.n('sol'), points: pts.map((_, i) => g.n(`sol-${i}`)), tone: 'good', shade: 0.2 }] };
};

const g = plane({ x: [-5, 5], y: [-6, 10], yStep: 2, every: 1, width: 8, height: 7 });

/** The dashed boundary y = 9 − x², its key points, the test point and (when `shaded`) the solutions. */
const graph = (shaded: boolean) =>
  figure(
    'gr',
    [
      g,
      ...(shaded ? [under(g)] : []),
      plot(g, { id: 'par', f, tone: 'brand', dashed: true }),
      dots(g, [
        { id: 'V', x: 0, y: 9, tex: '(0, 9)', tone: 'brand', place: 'right', group: 'keys' },
        { id: 'L', x: -3, y: 0, tex: '(-3, 0)', tone: 'brand', place: 'above left', group: 'keys' },
        { id: 'R', x: 3, y: 0, tex: '(3, 0)', tone: 'brand', place: 'above right', group: 'keys' },
        { id: 'O', x: 0, y: 0, tone: 'good' },
      ]),
    ],
    480,
  );

const QUESTION = 'Graph the inequality. x² + y < 9';

const video: Explainer = {
  id: 'xq-m201-9-3',
  lessonId: '',
  exam: {
    lesson: 'm201-9-3',
    source: 'OpenStax, College Algebra 2e, Exercise in section 7.3, Systems of Nonlinear Equations and Inequalities: Two Variables',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/7-3-systems-of-nonlinear-equations-and-inequalities-two-variables',
    question: QUESTION,
  },
  title: 'Exam Question: Graph x² + y < 9 (Quadratic Inequalities in Two Variables)',
  thumbnailTitle: 'Graph x² + y < 9',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: graph the inequality x² + y < 9. We solve for y to get y < 9 − x², draw the boundary parabola with vertex (0, 9) and x-intercepts ±3 as a dashed curve, test the origin, and shade the region below the parabola. Then we check two points and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Graph the Quadratic Inequality', subtitle: 'Quadratic inequalities in two variables, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about quadratic inequalities in two variables. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Graph the inequality. $x^2 + y < 9$',
          answer: 'Shade **below** the dashed parabola $y = 9 - x^2$',
          working: '$y < 9 - x^2$; the test point $(0, 0)$ gives $0 < 9$, which is true.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Graph the inequality x squared plus y is less than 9.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Shade **every** point $(x, y)$ that makes $x^2 + y < 9$ true. The edge of that region is a **parabola**.' }],
      lines: [{ say: 'We need to shade every point x, y that makes the inequality true. The edge of that region will be a parabola.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'bd', tone: 'definition', title: 'The boundary', md: 'Replace $<$ with $=$ to get the boundary curve. Draw it **dashed** for $<$ or $>$, and **solid** for $\\le$ or $\\ge$.' },
        { kind: 'callout', id: 'test', tone: 'key', title: 'A test point', md: 'A point **not** on the curve, such as $(0, 0)$, decides the side: shade its side if it makes the inequality **true**.' },
      ],
      lines: [
        { say: 'Here is what we need. Replacing the inequality sign with an equals sign gives the boundary curve. Draw it dashed for strictly less than or greater than, because points on it are not included, and solid for or equal to.', show: 'bd' },
        { say: 'Then test a point that is not on the curve, such as the origin. If it makes the inequality true, shade its side.', show: 'test' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Solve for $y$', 'Draw the **boundary** parabola, dashed', '**Test** a point and shade'] }],
      lines: [
        { say: 'Here is the plan. First, solve the inequality for y.', show: 'plan.0' },
        { say: 'Second, draw the boundary parabola, dashed.', show: 'plan.1' },
        { say: 'Third, test a point and shade the right side.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Solve for y',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 + y < 9', '\\good{y < 9 - x^2}'] }],
      lines: [
        { say: 'Step one. Start with x squared plus y is less than 9.', show: 'm.0' },
        { say: 'Subtract x squared from both sides: y is less than 9 minus x squared. Subtracting does not flip the sign.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The boundary',
      layout: 'split',
      leftWidth: 620,
      left: [graph(false)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['y = 9 - x^2', '\\text{vertex } (0, 9)', '9 - x^2 = 0: \\ x = \\pm 3'] }],
      lines: [
        { say: 'Step two. The boundary is the parabola y equals 9 minus x squared. It opens down.', show: ['m.0', 'gr.grid', 'gr.axes'] },
        { say: 'Its vertex is at the point at 0, 9.', show: ['m.1', 'gr.V'] },
        { say: 'It crosses the x-axis where 9 minus x squared is 0, at x equals 3 and negative 3.', show: ['m.2', 'gr.L', 'gr.R'] },
        { say: 'Draw it dashed, because the sign is strictly less than: points on the parabola are not solutions.', show: 'gr.par', focus: 'gr.par' },
      ],
    },
    {
      chapter: 'Step 3: Test and shade',
      layout: 'split',
      leftWidth: 620,
      left: [graph(true)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['(0, 0): \\ 0^2 + 0 < 9?', '0 < 9 \\quad \\text{true}'] }],
      lines: [
        { say: 'Step three. Here is the boundary again.', show: ['gr.grid', 'gr.axes', 'gr.par', 'gr.keys'] },
        { say: 'Test the origin: 0 squared plus 0 is 0.', show: ['m.0', 'gr.O'] },
        { say: '0 is less than 9, so the origin is a solution.', show: 'm.1' },
        { say: 'So shade the side of the parabola that holds the origin: everything below it. That is the graph.', show: 'gr.sol', focus: 'gr.sol' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(2, 1): \\ 4 + 1 = 5 < 9 \\ \\checkmark \\quad \\text{(below: shaded)}', '(1, 9): \\ 1 + 9 = 10 \\not< 9 \\quad \\text{(above: not shaded)}'] }],
      lines: [
        { say: 'Let us check two more points. The point at 2, 1 is below the parabola. 4 plus 1 is 5, which is less than 9, so it is a solution, and it is shaded.', show: 'm.0' },
        { say: 'The point at 1, 9 is above the parabola. 1 plus 9 is 10, which is not less than 9, so it is not a solution, and it is not shaded. The graph is right.', show: 'm.1' },
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
            ['a **solid** parabola', '$<$ leaves the curve out: draw it **dashed**'],
            ['$y < x^2 - 9$', 'subtract $x^2$: $y < 9 - x^2$, opening **down**'],
            ['shading **above**', '$(0, 0)$ is a solution, and it is **below**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The sign is strictly less than, so points on the parabola do not count. Draw it dashed.' },
        { say: 'Move x squared correctly. Subtracting it gives 9 minus x squared, which opens down, not x squared minus 9.' },
        { say: 'And test a point before shading. The origin is a solution, and it is below the parabola.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which point is a solution of $y \\ge x^2 - 4$?',
          choices: ['$(1, 0)$', '$(3, 4)$', '$(-3, 2)$', '$(0, -5)$'],
          answer: 0,
          working: '$1 - 4 = -3$, and $0 \\ge -3$ is true.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is a solution of y is greater than or equal to x squared minus 4? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'For the point at 1, 0: 1 squared minus 4 is negative 3, and 0 is greater than or equal to negative 3. So it is a solution, choice A. B and C give 5 on the right, and D gives negative 5, which is less than negative 4.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Solve for $y$', 'Boundary: **dashed** for $<, >$; **solid** for $\\le, \\ge$', '**Test** a point not on the curve', 'Shade the side that makes it **true**'] }],
      lines: [
        { say: 'Here is what to remember. Solve the inequality for y.', show: 'sum.0' },
        { say: 'Draw the boundary parabola, dashed for strictly less than or greater than, and solid for or equal to.', show: 'sum.1' },
        { say: 'Test a point that is not on the curve.', show: 'sum.2' },
        { say: 'And shade the side that makes the inequality true. For more on quadratic inequalities in two variables, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
