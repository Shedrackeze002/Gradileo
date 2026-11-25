import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 5.3 (implicit differentiation and higher derivatives). The
// question is an exercise from OpenStax Calculus Volume 1 (section 3.8, Implicit Differentiation,
// CC BY-NC-SA 4.0), word for word with its parts lettered (a) to (c). y = 0 gives x = ±√7;
// dy/dx = −(2x + y)/(x + 2y) is −2 at both, so the tangents are parallel, as in the book's
// answers. Check: the curve is unchanged by (x, y) → (−x, −y), so opposite points have equal slopes.

const QUESTION =
  'For the equation x² + xy + y² = 7, (a) Find the x-intercept(s). (b) Find the slope of the tangent line(s) at the x-intercept(s). (c) What does the value(s) in b. indicate about the tangent line(s)?';

const R7 = Math.sqrt(7);
const XM = Math.sqrt(28 / 3) - 1e-4;
const g = plane({ x: [-4, 4], y: [-4, 4], xStep: 1, yStep: 1, width: 7, height: 7 });

/** The tilted ellipse x² + xy + y² = 7 (two halves) and its tangents of slope −2 at (±√7, 0). */
const graph = (height = 470) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 'up', f: (x) => (-x + Math.sqrt(Math.max(0, 28 - 3 * x * x))) / 2, from: -XM, to: XM, tone: 'adj', samples: 200 }),
      plot(g, { id: 'down', f: (x) => (-x - Math.sqrt(Math.max(0, 28 - 3 * x * x))) / 2, from: -XM, to: XM, tone: 'adj', samples: 200 }),
      plot(g, { id: 't1', f: (x) => -2 * (x - R7), from: R7 - 1.6, to: R7 + 1.3, tone: 'theta' }),
      plot(g, { id: 't2', f: (x) => -2 * (x + R7), from: -R7 - 1.3, to: -R7 + 1.6, tone: 'theta' }),
      dots(g, [
        { id: 'p1', x: R7, y: 0, tex: '(\\sqrt{7}, 0)', tone: 'theta', place: 'above right' },
        { id: 'p2', x: -R7, y: 0, tex: '(-\\sqrt{7}, 0)', tone: 'theta', place: 'below left' },
      ]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-5-3',
  lessonId: '',
  exam: {
    lesson: 'm31-5-3',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 3.8, Implicit Differentiation',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/3-8-implicit-differentiation',
    question: QUESTION,
  },
  title: 'Exam Question: Tangent Slopes on x² + xy + y² = 7 (Implicit Differentiation)',
  thumbnailTitle: 'When y Will Not Stand Alone',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: for the curve x² + xy + y² = 7, (a) find the x-intercepts, (b) find the slopes of the tangent lines there, and (c) say what those slopes tell us. Setting y = 0 gives x = ±√7. Implicit differentiation gives dy/dx = −(2x + y)/(x + 2y), which is −2 at both intercepts, so the two tangent lines are parallel. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'When y Will Not Stand Alone', subtitle: 'Implicit differentiation, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about implicit differentiation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'For the equation $x^2 + xy + y^2 = 7$, (a) Find the $x$-intercept(s). (b) Find the slope of the tangent line(s) at the $x$-intercept(s). (c) What does the value(s) in b. indicate about the tangent line(s)?',
          answer: '(a) $(\\pm\\sqrt{7}, 0)$ (b) $-2$ at both (c) The tangent lines are parallel.',
          working: '$\\dfrac{dy}{dx} = -\\dfrac{2x + y}{x + 2y}$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'For the equation x squared plus x y plus y squared equals 7. Part "a": find the x intercepts. Part b: find the slope of the tangent lines at the x intercepts. Part c: what do the values in part b tell us about the tangent lines?' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The curve is a **tilted oval**. It is not a function, and $y$ is hard to get on its own, so we differentiate the equation **as it is**.' }],
      lines: [
        { say: 'Here is the curve. It is a tilted oval.', show: ['g.grid', 'g.axes', 'g.up', 'g.down'] },
        { say: 'We want where it crosses the x axis, and how steep it is there.', show: ['g.p1', 'g.p2'] },
        { say: 'It is not a function, and y is hard to get on its own. So we differentiate the equation as it is. That is implicit differentiation.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\dfrac{d}{dx}\\left(y^2\\right) = 2y\\dfrac{dy}{dx}', '\\dfrac{d}{dx}(xy) = 1 \\cdot y + x\\dfrac{dy}{dx}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Implicit differentiation', md: 'Treat $y$ as a function of $x$. Every time you differentiate something with $y$ in it, the **chain rule** adds a $\\dfrac{dy}{dx}$.' },
      ],
      lines: [
        { say: 'Here is what we need. y is a function of x, so the derivative of y squared is 2y times dy by dx, by the chain rule.', show: 'f.0' },
        { say: 'And x y is a product: 1 times y, plus x times dy by dx.', show: 'f.1' },
        { say: 'So every time we differentiate something with y in it, a dy by dx appears.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['(a) Put $y = 0$ and solve for $x$', '(b) Differentiate **both sides**, solve for $\\dfrac{dy}{dx}$, substitute each point', '(c) Compare the slopes'] }],
      lines: [
        { say: 'Here is the plan. For part "a", put y equals 0, and solve for x.', show: 'plan.0' },
        { say: 'For part b, differentiate both sides, solve for dy by dx, and substitute each point.', show: 'plan.1' },
        { say: 'For part c, compare the slopes.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The intercepts',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y = 0: \\ x^2 + 0 + 0 = 7', 'x = \\pm\\sqrt{7}', '\\good{(\\sqrt{7}, 0), \\ (-\\sqrt{7}, 0)}'] }],
      lines: [
        { say: 'Step one, part "a". On the x axis, y is 0. The x y and the y squared both vanish, leaving x squared equals 7.', show: 'm.0' },
        { say: 'So x is plus or minus root 7.', show: 'm.1' },
        { say: 'The x intercepts are root 7 comma 0, and negative root 7 comma 0.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Differentiate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2x + y + x\\dfrac{dy}{dx} + 2y\\dfrac{dy}{dx} = 0', '(x + 2y)\\dfrac{dy}{dx} = -(2x + y)', '\\good{\\dfrac{dy}{dx} = -\\dfrac{2x + y}{x + 2y}}'] }],
      lines: [
        { say: 'Step two. Differentiate both sides. x squared gives 2x. x y gives y plus x dy by dx. y squared gives 2y dy by dx. And 7 gives 0.', show: 'm.0' },
        { say: 'Keep the dy by dx terms on the left, and move the rest across. Factor out dy by dx.', show: 'm.1' },
        { say: 'Divide: dy by dx is negative 2x plus y, over x plus 2y.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: The slopes',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(\\sqrt{7}, 0): \\ -\\dfrac{2\\sqrt{7}}{\\sqrt{7}} = \\good{-2}', '(-\\sqrt{7}, 0): \\ -\\dfrac{-2\\sqrt{7}}{-\\sqrt{7}} = \\good{-2}', '\\text{same slope} \\implies \\good{\\text{the tangents are parallel}}'] }],
      lines: [
        { say: 'Step three, part b. At root 7 comma 0: negative 2 root 7 over root 7, which is negative 2.', show: 'm.0' },
        { say: 'At negative root 7 comma 0: negative, negative 2 root 7, over negative root 7. The signs cancel to give negative 2 again.', show: 'm.1' },
        { say: 'Part c. Both slopes are negative 2. Lines with the same slope are parallel, so the two tangent lines are parallel.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Turning the oval **half a turn** about the origin gives the same oval, so opposite points always have the **same slope**.' }],
      lines: [
        { say: 'Let us check on the graph.', show: ['g.grid', 'g.axes', 'g.up', 'g.down', 'g.p1', 'g.p2'] },
        { say: 'Here are the two tangent lines. Both slope down 2 for every 1 across, and they never meet.', show: ['g.t1', 'g.t2'] },
        { say: 'It makes sense too. Swapping x for negative x and y for negative y leaves the equation the same. So the oval looks the same after half a turn, and opposite points have the same slope. It checks out.', show: 't' },
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
            ['$\\dfrac{d}{dx}(y^2) = 2y$', 'the chain rule adds a $\\dfrac{dy}{dx}$'],
            ['$\\dfrac{d}{dx}(xy) = \\dfrac{dy}{dx}$', '$xy$ is a **product**: $y + x\\dfrac{dy}{dx}$'],
            ['$\\dfrac{d}{dx}(7) = 7$', 'a constant differentiates to $0$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'The derivative of y squared is not just 2y. y depends on x, so the chain rule adds a dy by dx.' },
        { say: 'x y is a product, so use the product rule: y plus x dy by dx.' },
        { say: 'And the 7 on the right differentiates to 0.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the slope of the tangent line to $x^2 + y^2 = 25$ at the point $(3, 4)$.',
          choices: ['$\\dfrac{3}{4}$', '$-\\dfrac{4}{3}$', '$-\\dfrac{3}{4}$', '$\\dfrac{4}{3}$'],
          answer: 2,
          working: '$2x + 2y\\dfrac{dy}{dx} = 0$, so $\\dfrac{dy}{dx} = -\\dfrac{x}{y} = -\\dfrac{3}{4}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the slope of the tangent line to x squared plus y squared equals 25, at the point where x is 3 and y is 4. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Differentiate: 2x plus 2y dy by dx equals 0, so dy by dx is negative x over y. At 3 comma 4, that is negative 3 quarters. Choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Differentiate **both sides** with respect to $x$', 'Each $y$ term gets a $\\dfrac{dy}{dx}$ (chain rule)', 'Collect the $\\dfrac{dy}{dx}$ terms and **factor**', 'Substitute **both** $x$ and $y$ of the point'] }],
      lines: [
        { say: 'Here is what to remember. Differentiate both sides with respect to x.', show: 'sum.0' },
        { say: 'Each term with y in it gets a dy by dx, by the chain rule.', show: 'sum.1' },
        { say: 'Collect the dy by dx terms on one side and factor.', show: 'sum.2' },
        { say: 'Then substitute both coordinates of the point. For more on implicit differentiation, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
