import type { DiagramItem, Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 9.1 (area between curves). The question is an exercise from
// OpenStax Calculus Volume 1 (section 6.1, Areas between Curves, CC BY-NC-SA 4.0): the book's
// instruction "For the following exercises, graph the equations and shade the area of the region
// between the curves. Determine its area by integrating over the x-axis." is put with the one pair
// of curves it asks about. They meet at x = 0 and x = 9, and ∫₀⁹ (18x − 2x²) dx = 729 − 486 = 243,
// as in the book's answer. Check: the parabola-segment rule (2/3 × base × height of a parabolic
// cap) gives 2/3 × 9 × 40.5 = 243 too, since 18x − 2x² peaks at 40.5 when x = 4.5.

const QUESTION =
  'Graph the equations and shade the area of the region between the curves. Determine its area by integrating over the x-axis. y = x² and y = −x² + 18x';

const top = (x: number) => -x * x + 18 * x;
const bot = (x: number) => x * x;
const g = plane({ x: [0, 10], y: [0, 100], xStep: 1, yStep: 10, every: 2, width: 8, height: 7 });

/** The region between the curves from x = 0 to x = 9. */
const region = () => {
  const points: Record<string, [number, number]> = {};
  const ids: string[] = [];
  for (let i = 0; i <= 30; i++) {
    const x = (9 * i) / 30;
    points[`t${i}`] = g.map(x, top(x));
    ids.push(`t${i}`);
  }
  for (let i = 30; i >= 0; i--) {
    const x = (9 * i) / 30;
    points[`b${i}`] = g.map(x, bot(x));
    ids.push(`b${i}`);
  }
  const items: DiagramItem[] = [{ kind: 'region', id: 'area', points: ids, tone: 'theta', shade: 0.3 } as DiagramItem];
  return { points, items };
};

const graph = (height = 460) =>
  figure(
    'g',
    [
      g,
      region(),
      plot(g, { id: 'top', f: top, from: 0, to: 10, tone: 'opp' }),
      plot(g, { id: 'bot', f: bot, from: 0, to: 10, tone: 'adj' }),
      dots(g, [
        { id: 'p0', x: 0, y: 0, tex: '(0, 0)', tone: 'theta', place: 'above left' },
        { id: 'p9', x: 9, y: 81, tex: '(9, 81)', tone: 'theta', place: 'left' },
      ]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-9-1',
  lessonId: '',
  exam: {
    lesson: 'm31-9-1',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 6.1, Areas between Curves',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/6-1-areas-between-curves',
    question: QUESTION,
  },
  title: 'Exam Question: The Area Between y = x² and y = −x² + 18x (Area Between Curves)',
  thumbnailTitle: 'Top Minus Bottom',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: graph y = x² and y = −x² + 18x, shade the region between them, and find its area by integrating over the x-axis. The curves meet where x² = −x² + 18x, at x = 0 and x = 9. Between them, −x² + 18x is on top, so the area is the integral from 0 to 9 of (18x − 2x²) dx = 729 − 486 = 243 square units. Then we check with a shortcut for parabolas and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Top Minus Bottom', subtitle: 'Area between curves, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the area between two curves. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Graph the equations and shade the area of the region between the curves. Determine its area by integrating over the $x$-axis. $y = x^2$ and $y = -x^2 + 18x$',
          answer: '$243$ square units',
          working: '$\\displaystyle\\int_0^9 \\left(18x - 2x^2\\right)dx$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Graph the equations, and shade the region between the curves. Find its area by integrating over the x axis. The curves are y equals x squared, and y equals negative x squared plus 18x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Orange: $y = -x^2 + 18x$. Blue: $y = x^2$. The region is closed in between the two meeting points. We need **where** they meet and **which** curve is on top.' }],
      lines: [
        { say: 'Here is y equals x squared, in blue, a parabola opening up.', show: ['g.grid', 'g.axes', 'g.bot'] },
        { say: 'And here is negative x squared plus 18x, in orange, a parabola opening down.', show: 'g.top' },
        { say: 'They close in a region between the points where they meet. That is the area we want.', show: ['g.area', 'g.p0', 'g.p9', 't'] },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['A = \\int_a^b \\big[f(x) - g(x)\\big]\\,dx'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'Top minus bottom', md: '$f$ is the **top** curve and $g$ the **bottom** on $[a, b]$. The limits are where the curves **meet**.' },
      ],
      lines: [
        { say: 'Here is what we need. The area between two curves is the integral of the top curve minus the bottom curve.', show: 'f' },
        { say: 'f is the curve on top, g is the one below, and the limits are where they meet.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Set the curves **equal**: find where they meet', 'Decide which is on **top**', 'Integrate **top minus bottom**'] }],
      lines: [
        { say: 'Here is the plan. Set the two curves equal, to find where they meet.', show: 'plan.0' },
        { say: 'Decide which one is on top.', show: 'plan.1' },
        { say: 'Then integrate top minus bottom.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Where they meet',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 = -x^2 + 18x', '2x^2 - 18x = 0 \\implies 2x(x - 9) = 0', 'x = \\good{0} \\ \\text{and} \\ x = \\good{9}'] }],
      lines: [
        { say: 'Step one. Set them equal: x squared equals negative x squared plus 18x.', show: 'm.0' },
        { say: 'Move everything to one side: 2 x squared minus 18x equals 0. Factor out 2x.', show: 'm.1' },
        { say: 'So they meet at x equals 0 and x equals 9.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Which is on top?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 1: \\ x^2 = 1, \\quad {-x^2} + 18x = 17', '\\text{top} - \\text{bottom} = (-x^2 + 18x) - x^2 = \\good{18x - 2x^2}'] }],
      lines: [
        { say: 'Step two. Test any x between 0 and 9, say 1. x squared is 1, and negative 1 plus 18 is 17. So negative x squared plus 18x is on top.', show: 'm.0' },
        { say: 'Top minus bottom is negative x squared plus 18x, minus x squared: 18x minus 2 x squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Integrate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['A = \\int_0^9 \\left(18x - 2x^2\\right)dx = \\Big[9x^2 - \\tfrac{2}{3}x^3\\Big]_0^9', '= 9(81) - \\tfrac{2}{3}(729) - 0 = 729 - 486', '= \\good{243 \\text{ square units}}'] }],
      lines: [
        { say: 'Step three. The antiderivative of 18x is 9 x squared, and of 2 x squared is two thirds x cubed.', show: 'm.0' },
        { say: 'At 9: 9 times 81 is 729, and two thirds of 729 is 486. At 0, everything is 0.', show: 'm.1' },
        { say: '729 minus 486 is 243 square units.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['18x - 2x^2 \\text{ is largest at } x = 4.5: \\ 40.5', '\\tfrac{2}{3} \\times \\text{width} \\times \\text{height} = \\tfrac{2}{3} \\times 9 \\times 40.5 = 243 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a shortcut. The gap, 18x minus 2 x squared, is itself a parabola. It is widest halfway, at 4.5, where it is 40.5.', show: 'm.0' },
        { say: 'The area under a parabola arch is two thirds of the width times the height: two thirds of 9 times 40.5, which is 243. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['Bottom minus top', 'gives $-243$: an area is **positive**'],
            ['$x^2 = -x^2 + 18x \\implies x = 9$ only', 'dividing by $x$ **loses** $x = 0$'],
            ['$\\int_0^9 (18x) \\, dx$', 'subtract the **whole** bottom curve: $-2x^2$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Bottom minus top gives negative 243. Areas are positive, so it is top minus bottom.' },
        { say: 'Dividing by x loses the meeting point at 0. Factor instead.' },
        { say: 'And subtract the whole bottom curve: negative x squared minus x squared is negative 2 x squared.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the area between $y = x$ and $y = x^2$.',
          choices: ['$\\dfrac{1}{2}$', '$\\dfrac{1}{6}$', '$\\dfrac{1}{3}$', '$\\dfrac{5}{6}$'],
          answer: 1,
          working: 'They meet at $x = 0, 1$, and $x$ is on top: $\\displaystyle\\int_0^1 (x - x^2)\\,dx = \\dfrac{1}{2} - \\dfrac{1}{3} = \\dfrac{1}{6}$',
        },
      ],
      lines: [
        { say: 'Your turn. Find the area between y equals x and y equals x squared. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'They meet at 0 and 1, and between them, x is on top. The integral of x minus x squared from 0 to 1 is one half minus one third, which is one sixth. Choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Set the curves equal to find the **limits**', 'Test a point to find the **top** curve', '$A = \\displaystyle\\int_a^b (\\text{top} - \\text{bottom})\\,dx$', 'An area is always **positive**'] }],
      lines: [
        { say: 'Here is what to remember. Set the curves equal to find the limits.', show: 'sum.0' },
        { say: 'Test a point in between to find the top curve.', show: 'sum.1' },
        { say: 'The area is the integral of top minus bottom.', show: 'sum.2' },
        { say: 'And an area is always positive. For more on the area between curves, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
