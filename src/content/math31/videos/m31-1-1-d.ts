import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { riseRun } from '@/content/math30-3/videos/lib/m303-5-graphs.ts';
import { lineThrough, numbers, piece, plane, spot } from './lib/m31-2-graphs.ts';

// f(x) = x² − 2x + 2 with P(1, 1) and Q(3, 5) on it, and the secant line PQ, y = 2x − 1.
const g = plane({ x: [-1, 5], y: [-1, 7], every: 0 });
const f = (x: number) => x * x - 2 * x + 2;
const secant = (id: string, run: string, rise: string) =>
  figure(id, [
    g,
    numbers(g, 1, 1),
    piece(g, { id: 'c', f }),
    lineThrough(g, { id: 'sec', a: [1, 1], b: [3, 5], from: 0, to: 4 }),
    riseRun(g, { id: 'rr', from: [1, 1], to: [3, 5], run, rise }),
    spot(g, 'P', 1, 1, { tex: 'P', place: 'above left', tone: 'theta' }),
    spot(g, 'Q', 3, 5, { tex: 'Q', place: 'above left', tone: 'theta' }),
  ]);

const video: Explainer = {
  id: 'm31-1-1-d',
  lessonId: 'm31-1-1',
  title: 'Functions for Calculus, Part 4: The Difference Quotient',
  thumbnailTitle: 'The Difference Quotient',
  thumbnail: 's1',
  summary: 'The slope of the secant line through (x, f(x)) and (x + h, f(x + h)) is the difference quotient (f(x + h) − f(x))/h. On f(x) = x² − 2x + 2 the secant through P(1, 1) and Q(3, 5) has slope 2, and for f(x) = x² − 3x the difference quotient simplifies to 2x + h − 3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Precalculus Review · Part 4', title: 'The Difference Quotient', subtitle: 'The slope between two points on a curve' }],
      lines: [
        { say: 'For a straight line, the slope tells you how fast it rises: the rise divided by the run. But a curve bends, so its steepness keeps changing.', show: 'title' },
        { say: 'In this video, you will measure how fast a function changes between two points on its graph. That measurement, the difference quotient, is the expression that grows into the derivative later in calculus.' },
      ],
    },
    {
      chapter: 'Slope between two points',
      layout: 'split',
      leftWidth: 560,
      left: [secant('s1', '\\text{run} = 2', '\\text{rise} = 4')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: '$f(x) = x^2 - 2x + 2$ with $P(1, 1)$ and $Q(3, 5)$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{slope of } PQ = \\dfrac{5 - 1}{3 - 1} = \\dfrac{4}{2} = 2'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Secant line', md: 'A line through two points of a curve.' },
      ],
      lines: [
        { say: 'Here is the graph of f of x equals x squared, minus two x, plus two. Two points are marked on it: P at one, one, and Q at three, five.', show: ['s1.grid', 's1.axes', 's1.c', 's1.P', 's1.Q', 't'] },
        { say: 'Join them with a straight line. A line through two points of a curve is called a secant line.', show: ['s1.sec', 'def'], focus: 's1.sec' },
        { say: 'From P to Q, the run is three minus one, which is two. The rise is five minus one, which is four.', show: 's1.rr', focus: 's1.rr' },
        { say: 'So the slope of the secant line is four over two, which is two. Between x equals one and x equals three, f goes up, on average, two units for every one unit across.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Points x and x + h',
      layout: 'split',
      leftWidth: 560,
      left: [secant('s2', 'h', 'f(x + h) - f(x)')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P\\,(\\adj{x},\\ f(x))', 'Q\\,(\\adj{x + h},\\ f(x + h))', '\\text{run} = (x + h) - x = \\adj{h}', '\\text{rise} = \\opp{f(x + h) - f(x)}'] }],
      lines: [
        { say: 'Now make it general. Call the x-value of the first point just x. Then P is the point x, f of x.', show: ['s2.grid', 's2.axes', 's2.c', 's2.P', 'm.0'], focus: ['s2.P', 'm.0'] },
        { say: 'Let the second point be a distance h further along. Its x-value is x plus h, so Q is the point x plus h, f of x plus h.', show: ['s2.Q', 'm.1'], focus: ['s2.Q', 'm.1'] },
        { say: 'The run is x plus h, minus x, which is just h.', show: ['s2.rr-run', 'm.2'], focus: ['s2.rr-run', 'm.2'] },
        { say: 'The rise is the difference in heights: f of x plus h, minus f of x.', show: ['s2.rr-rise', 's2.sec', 'm.3'], focus: ['s2.rr-rise', 'm.3'] },
      ],
    },
    {
      chapter: 'The difference quotient',
      layout: 'center',
      main: [
        { kind: 'math', id: 'q', size: 'lg', lines: ['\\dfrac{f(x + h) - f(x)}{h}, \\quad h \\ne 0'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Difference quotient', md: 'The slope of the secant line through $(x, f(x))$ and $(x + h, f(x + h))$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 1,\\ h = 2\\colon \\quad \\dfrac{f(3) - f(1)}{2} = \\dfrac{5 - 1}{2} = 2'] },
      ],
      lines: [
        { say: 'Rise over run gives the difference quotient: f of x plus h, minus f of x, all over h.', show: ['q', 'def'], focus: 'q' },
        { say: 'It is the slope of the secant line through the two points. And h cannot be zero, because then the two points would be the same point, and we would divide by zero.' },
        { say: 'Check it with P and Q. There, x is one and h is two. f of three minus f of one is five minus one, which is four, and four over two is two: the slope we found from the graph.', show: 'm', focus: 'm' },
        { say: 'Later in calculus, we will let h shrink toward zero, so the second point slides toward the first. The secant line then becomes the tangent line, and its slope becomes the derivative.' },
      ],
    },
    {
      chapter: 'Expanding f(x + h)',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = x^2 - 3x', 'f(\\adj{x + h}) = (\\adj{x + h})^2 - 3(\\adj{x + h})', '= x^2 + 2xh + h^2 - 3x - 3h'] },
      ],
      lines: [
        { say: 'Let’s simplify a difference quotient. Take f of x equals x squared minus three x.', show: 'm.0', focus: 'm.0' },
        { say: 'First, find f of x plus h. Replace every x in the formula with x plus h, in brackets: x plus h, all squared, minus three times x plus h.', show: 'm.1', focus: 'm.1' },
        { say: 'Expand. x plus h, squared, is x squared, plus two x h, plus h squared. And three times x plus h is three x plus three h.', show: 'm.2', focus: 'm.2' },
        { say: 'So f of x plus h is x squared, plus two x h, plus h squared, minus three x, minus three h.', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Subtract, factor and cancel',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['f(x + h) - f(x) = (x^2 + 2xh + h^2 - 3x - 3h) - (x^2 - 3x)', '= 2xh + h^2 - 3h', '\\dfrac{f(x + h) - f(x)}{h} = \\dfrac{h(2x + h - 3)}{h} = 2x + h - 3'],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A built-in check', md: 'After you subtract $f(x)$, every term left should contain $h$. If a term without $h$ survives, look for a slip.' },
      ],
      lines: [
        { say: 'Next, subtract f of x. The x squared and the x squared cancel, and so do the negative three x and the negative three x.', show: 'm.0', focus: 'm.0' },
        { say: 'What is left is two x h, plus h squared, minus three h.', show: 'm.1', focus: 'm.1' },
        { say: 'Every term has a factor of h. Take it out: h times two x, plus h, minus three. Then divide by h. The h on top cancels with the h on the bottom, which is allowed because h is not zero.', show: 'm.2', focus: 'm.2' },
        { say: 'So the difference quotient is two x, plus h, minus three.', focus: 'm.2' },
        { say: 'Notice the check built into this method. After you subtract f of x, every term left should contain h. If a term without h survives, there is an algebra slip somewhere.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify the difference quotient $\\dfrac{f(x + h) - f(x)}{h}$ for $f(x) = x^2 + 5x$.',
          choices: ['$2x + 5$', '$2x + h$', '$2x + h + 5$', '$h + 5$'],
          answer: 2,
          working: 'Subtracting $f(x)$ leaves $2xh + h^2 + 5h = h(2x + h + 5)$. Divide by $h$: $2x + h + 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify the difference quotient for f of x equals x squared plus five x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. After subtracting f of x, you are left with two x h, plus h squared, plus five h. Factor out h and cancel it, to get two x, plus h, plus five. Choice D comes from writing x plus h, all squared, as x squared plus h squared, which loses the two x h.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['The difference quotient $\\dfrac{f(x + h) - f(x)}{h}$ is the slope of a secant line.', 'Find $f(x + h)$ by replacing every $x$ with $(x + h)$.', 'Expand, subtract $f(x)$, factor out $h$, and cancel.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The difference quotient, f of x plus h, minus f of x, over h, is the slope of the secant line through two points on the graph.', show: 'sum.0' },
        { say: 'To find f of x plus h, replace every x with x plus h, in brackets.', show: 'sum.1' },
        { say: 'Then expand, subtract f of x, factor out h, and cancel. In the next part, we simplify the difference quotient of a fraction, and look at the mistakes to avoid. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
