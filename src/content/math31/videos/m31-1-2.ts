import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { guide, numbers, piece, plane, spot, tag } from './lib/m31-2-graphs.ts';

// y = eˣ and y = ln x, mirror images in the line y = x.
const g = plane({ x: [-3, 5], y: [-3, 5], every: 0 });
const mirror = figure('ex', [
  g,
  numbers(g, 1, 1),
  guide(g, 'yx', [-3, -3], [5, 5], 'muted'),
  tag(g, 'yx-name', 4.55, 3.6, 'y = x', 'center', 'muted'),
  piece(g, { id: 'exp', f: Math.exp, from: -3, to: Math.log(5) }),
  piece(g, { id: 'ln', f: Math.log, from: Math.exp(-3), to: 5, tone: 'opp', samples: 600 }),
  tag(g, 'exp-name', 1.9, 4.5, 'y = e^x', 'right', 'brand'),
  tag(g, 'ln-name', 3.0, -0.7, 'y = \\ln x', 'right', 'opp'),
  spot(g, 'A', 0, 1, { tex: '(0, 1)', place: 'above left', tone: 'brand' }),
  spot(g, 'B', 1, 0, { tex: '(1, 0)', place: 'below right', tone: 'opp' }),
]);

const video: Explainer = {
  id: 'm31-1-2',
  lessonId: 'm31-1-2',
  title: 'Trigonometry and Logarithms for Calculus, Part 1: The Natural Logarithm',
  thumbnailTitle: 'The Natural Logarithm',
  thumbnail: 'ex',
  summary: 'The number e ≈ 2.71828 and the natural logarithm ln x = logₑ x, the inverse of eˣ: ln(eˣ) = x and e^(ln x) = x. The laws of logarithms for ln, finding ln(a³/b) = 5.5 from ln a = 2 and ln b = 0.5, and why ln(x + 2) is not ln x + ln 2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Precalculus Review · Part 1', title: 'The Natural Logarithm', subtitle: 'Logarithms with base e' }],
      lines: [
        { say: 'Exponential functions and logarithms can use any positive base, such as two or ten. But calculus has a favourite base, a number called e.', show: 'title' },
        { say: 'In this video, you will meet the number e and its logarithm, the natural logarithm, and use the laws of logarithms with it.' },
      ],
    },
    {
      chapter: 'The number e',
      layout: 'center',
      main: [
        { kind: 'math', id: 'e', size: 'md', lines: ['\\left(1 + \\dfrac{1}{n}\\right)^n'] },
        { kind: 'table', id: 't', head: ['$n$', 'Value'], rows: [['$1$', '$2$'], ['$10$', '$2.59374\\ldots$'], ['$100$', '$2.70481\\ldots$'], ['$1000$', '$2.71692\\ldots$'], ['$10\\,000$', '$2.71815\\ldots$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['e \\approx 2.71828'] },
      ],
      lines: [
        { say: 'Where does e come from? Look at the expression one plus one over n, all to the power n, as n gets bigger and bigger.', show: ['e', 't'] },
        { say: 'When n is one, it is two. When n is ten, it is about 2.594. When n is a hundred, about 2.705.', show: ['t.0', 't.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'For a thousand, it is about 2.717, and for ten thousand, about 2.718. The values close in on one number.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'That number is e. It is about 2.71828, and like pi, its decimals go on forever without repeating.', show: 'm', focus: 'm' },
        { say: 'The number e turns up whenever something grows in proportion to its size, and calculus formulas come out simplest with base e.' },
      ],
    },
    {
      chapter: 'The natural logarithm',
      layout: 'split',
      leftWidth: 540,
      left: [mirror],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Natural logarithm', md: '$\\ln x = \\log_e x$, the logarithm with base $e$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\ln(e^x) = x \\quad \\text{for every } x', 'e^{\\ln x} = x \\quad \\text{for } x > 0'] },
      ],
      lines: [
        { say: 'The logarithm with base e is called the natural logarithm. We write it L N, and say the natural log. So the natural log of x means log base e of x.', show: 'def' },
        { say: 'Here is the graph of y equals e to the x. It passes through the point at zero, one, because e to the power zero is one.', show: ['ex.grid', 'ex.axes', 'ex.exp', 'ex.exp-name', 'ex.A'], focus: ['ex.exp', 'ex.A'] },
        { say: 'The natural log undoes e to the x, so its graph is the mirror image in the line y equals x. It passes through the point at one, zero, because the natural log of one is zero.', show: ['ex.yx', 'ex.yx-name', 'ex.ln', 'ex.ln-name', 'ex.B'], focus: ['ex.ln', 'ex.B'] },
        { say: 'Because they are inverses, each one undoes the other. The natural log of e to the x is x, for every x.', show: 'm.0', focus: 'm.0' },
        { say: 'And e to the power natural log of x is x, as long as x is positive. The natural log only accepts positive numbers, which you can see on the graph: it lives to the right of the y-axis.', show: 'm.1', focus: ['m.1', 'ex.ln'] },
      ],
    },
    {
      chapter: 'The laws of logarithms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\ln(MN) = \\ln M + \\ln N', '\\ln\\left(\\dfrac{M}{N}\\right) = \\ln M - \\ln N', '\\ln(M^k) = k\\ln M'] },
        { kind: 'text', id: 't', size: 'md', md: 'for $M > 0$ and $N > 0$' },
      ],
      lines: [
        { say: 'The laws of logarithms you already know work for the natural log too, as long as M and N are positive.', show: 't' },
        { say: 'The product law: the natural log of M times N is the natural log of M, plus the natural log of N. Multiplying inside becomes adding outside.', show: 'm.0', focus: 'm.0' },
        { say: 'The quotient law: the natural log of M over N is the natural log of M, minus the natural log of N. Dividing inside becomes subtracting outside.', show: 'm.1', focus: 'm.1' },
        { say: 'And the power law: the natural log of M to the power k is k times the natural log of M. A power inside comes out in front as a multiplier.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Using the laws',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\ln a = 2, \\quad \\ln b = 0.5', '\\ln\\left(\\dfrac{a^3}{b}\\right) = \\ln(a^3) - \\ln b', '= 3\\ln a - \\ln b', '= 3(2) - 0.5 = 5.5'] }],
      lines: [
        { say: 'Given that the natural log of "a" is two, and the natural log of b is 0.5, evaluate the natural log of "a" cubed over b.', show: 'm.0', focus: 'm.0' },
        { say: 'The quotient law splits it: the natural log of "a" cubed, minus the natural log of b.', show: 'm.1', focus: 'm.1' },
        { say: 'The power law brings the three out in front: three times the natural log of "a", minus the natural log of b.', show: 'm.2', focus: 'm.2' },
        { say: 'Now substitute. Three times two, minus 0.5, is 5.5.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The log of a sum', md: 'There is **no** law for $\\ln(M + N)$. In particular, $\\ln(x + 2) \\ne \\ln x + \\ln 2$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 1\\colon \\quad \\ln(1 + 2) = \\ln 3 \\approx 1.099', '\\ln 1 + \\ln 2 = 0 + \\ln 2 \\approx 0.693'] },
      ],
      lines: [
        { say: 'A common mistake is to split the log of a sum. There is no law for the natural log of M plus N. In particular, the natural log of x plus two is not the natural log of x, plus the natural log of two.', show: 'oops' },
        { say: 'Try x equals one. The natural log of one plus two is the natural log of three, about 1.099.', show: 'm.0', focus: 'm.0' },
        { say: 'But the natural log of one, plus the natural log of two, is zero plus about 0.693. The two answers are different.', show: 'm.1', focus: 'm.1' },
        { say: 'The laws only turn products, quotients and powers inside a log into something simpler. A sum inside a log stays as it is.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Given $\\ln a = 4$ and $\\ln b = 1.5$, evaluate $\\ln\\left(\\dfrac{a^2}{b^3}\\right)$.',
          choices: ['$3.5$', '$6.5$', '$12.5$', '$1.78$'],
          answer: 0,
          working: '$\\ln\\left(\\dfrac{a^2}{b^3}\\right) = 2\\ln a - 3\\ln b = 2(4) - 3(1.5) = 8 - 4.5 = 3.5$',
        },
      ],
      lines: [
        { say: 'Your turn. Given that the natural log of "a" is four, and the natural log of b is 1.5, evaluate the natural log of "a" squared over b cubed. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The laws give two times the natural log of "a", minus three times the natural log of b. That is eight minus 4.5, which is 3.5. Choice C adds the two logs, but dividing inside a log means subtracting.', show: 'q.answer' },
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
          items: ['$e \\approx 2.71828$, and $\\ln x = \\log_e x$.', '$\\ln$ and $e^x$ are inverses: $\\ln(e^x) = x$ and $e^{\\ln x} = x$ for $x > 0$.', 'Product, quotient and power laws: $\\ln(MN) = \\ln M + \\ln N$, $\\ln\\dfrac{M}{N} = \\ln M - \\ln N$, $\\ln M^k = k\\ln M$.', 'There is no law for $\\ln(M + N)$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The number e is about 2.71828, and the natural log is the logarithm with base e.', show: 'sum.0' },
        { say: 'The natural log and e to the x are inverses, so each undoes the other.', show: 'sum.1' },
        { say: 'The product, quotient and power laws work for the natural log.', show: 'sum.2' },
        { say: 'But there is no law for the log of a sum. In the next part, we use the natural log to solve equations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
