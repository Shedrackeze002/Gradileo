import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, guide, name, numbers, plane, plot, tag } from './lib/m302-6-graphs.ts';

// y = 4(1/2)^x, which gets closer and closer to the x-axis without touching it.
const g = plane({ x: [-3, 5], y: [-1, 9], every: 0, width: 8, height: 8 });
const f = (x: number) => 4 * 0.5 ** x;

const video: Explainer = {
  id: 'm302-6-1-b',
  lessonId: 'm302-6-1',
  title: 'Exponential Functions, Part 2: Features of the Graph',
  thumbnailTitle: 'Features of an Exponential Graph',
  thumbnail: 'ft',
  summary: 'The domain, range, y-intercept, x-intercept and horizontal asymptote of y = 4(½)ˣ, why the graph of y = a(b)ˣ with a > 0 gets closer and closer to the x-axis but never touches it, the features every such graph shares, and why the range is y > 0, not y ≥ 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 2', title: 'Features of the Graph', subtitle: 'Domain, range, intercepts and asymptote' }],
      lines: [
        { say: 'Every exponential graph, growing or decaying, shares the same features. Once you know them, you can describe any of these graphs in seconds.', show: 'title' },
        { say: 'In this video, you will find the domain, range, intercepts and asymptote of an exponential function, and see why its graph never reaches the x-axis.' },
      ],
    },
    {
      chapter: 'Halving forever',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$x$', '$0$', '$1$', '$2$', '$3$', '$4$', '$5$', '$10$'], rows: [['$y = 4\\left(\\frac{1}{2}\\right)^x$', '$4$', '$2$', '$1$', '$0.5$', '$0.25$', '$0.125$', '$0.0039\\ldots$']] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Never zero', md: 'A positive number times a power of a positive number is always positive. The $y$-values get closer and closer to $0$, but never reach it.' },
      ],
      lines: [
        { say: 'Take y equals four times one half to the power x. Start at four, and halve it each step: two, one, 0.5, 0.25, 0.125.', show: 't.0', focus: 't.0' },
        { say: 'By x equals ten, y is less than 0.004. The values get closer and closer to zero.' },
        { say: 'But they never reach it. Halving a positive number always leaves a positive number. In general, a positive number times a power of a positive number is always positive.', show: 'key' },
      ],
    },
    {
      chapter: 'The features',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('ft', [
          g,
          numbers(g, 1, 2),
          guide(g, 'asy', [-3, 0], [5, 0], 'theta', { weight: 4 }),
          tag(g, 'asy-t', 4.9, 0, 'y = 0', 'below left', 'theta'),
          plot(g, { id: 'curve', f, samples: 200 }),
          name(g, 'curve-t', 1.4, 2.4, 'y = 4\\left(\\tfrac{1}{2}\\right)^x', 'right'),
          dots(g, [{ id: 'Y', x: 0, y: 4, tex: '(0, 4)', tone: 'good', place: 'above right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Domain: } \\{x \\mid x \\in \\mathbb{R}\\}', '\\text{Range: } \\{y \\mid y > 0,\\ y \\in \\mathbb{R}\\}', 'y\\text{-intercept: } 4', 'x\\text{-intercept: none}', '\\text{Asymptote: } y = 0', '\\text{Decreasing}'] }],
      lines: [
        { say: 'Here is the graph of y equals four times one half to the power x. Let’s list its features.', show: ['ft.grid', 'ft.axes', 'ft.curve', 'ft.curve-t'] },
        { say: 'Any real number can be an exponent, so you can substitute any x-value. The domain is all real numbers.', show: 'm.0', focus: 'm.0' },
        { say: 'Every y-value is positive, so the range is all real numbers greater than zero.', show: 'm.1', focus: 'm.1' },
        { say: 'At x equals zero, y is four, so the y-intercept is four: the value of "a".', show: ['m.2', 'ft.Y'], focus: ['m.2', 'ft.Y'] },
        { say: 'Since y is never zero, the graph never crosses the x-axis. There is no x-intercept.', show: 'm.3', focus: 'm.3' },
        { say: 'Instead, the curve gets closer and closer to the x-axis as x increases. A line that a graph approaches like this is an asymptote. Here the horizontal asymptote is y equals zero: the x-axis itself.', show: ['m.4', 'ft.asy', 'ft.asy-t'], focus: ['m.4', 'ft.asy'] },
        { say: 'And since the base, one half, is between zero and one, the function is decreasing.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'Every exponential graph',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Feature', '$y = a(b)^x$, with $a > 0$'],
          rows: [
            ['Domain', '$\\{x \\mid x \\in \\mathbb{R}\\}$'],
            ['Range', '$\\{y \\mid y > 0,\\ y \\in \\mathbb{R}\\}$'],
            ['$y$-intercept', '$a$'],
            ['$x$-intercept', 'none'],
            ['Horizontal asymptote', '$y = 0$ (the $x$-axis)'],
            ['Increasing or decreasing', 'increasing if $b > 1$, decreasing if $0 < b < 1$'],
          ],
        },
      ],
      lines: [
        { say: 'The same is true of every exponential function y equals "a" times b to the power x, when "a" is positive.', show: 't.0', focus: 't.0' },
        { say: 'The domain is always all real numbers, and the range is always y greater than zero.', show: 't.1', focus: 't.1' },
        { say: 'The y-intercept is "a", and there is no x-intercept.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'The horizontal asymptote is y equals zero, the x-axis.', show: 't.4', focus: 't.4' },
        { say: 'The only difference between growth and decay is the direction. The function is increasing if b is greater than one, and decreasing if b is between zero and one.', show: 't.5', focus: 't.5' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Including zero in the range', md: 'The range is $y > 0$, not $y \\ge 0$. The graph never reaches the asymptote, so $y = 0$ is never an output.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\good{\\{y \\mid y > 0,\\ y \\in \\mathbb{R}\\}} \\qquad \\bad{\\{y \\mid y \\ge 0,\\ y \\in \\mathbb{R}\\}}'] },
      ],
      lines: [
        { say: 'A common mistake is to include zero in the range, and write y greater than or equal to zero.', show: 'oops' },
        { say: 'But the graph never reaches the asymptote. No value of x gives y equals zero. So the range is y greater than zero, with a strict inequality.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'State the range of $y = 5(3)^x$.',
          choices: ['$\\{y \\mid y > 0,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\ge 0,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\ge 5,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\in \\mathbb{R}\\}$'],
          answer: 0,
          working: 'Every $y$-value is positive, and the graph approaches the asymptote $y = 0$ without reaching it. Values less than $5$ occur when $x < 0$, for example $y = 5(3)^{-1} = \\frac{5}{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. State the range of y equals five times three to the power x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Every y-value is positive, and the graph gets closer and closer to the x-axis without touching it. Choice B includes zero, but zero is never an output. And choice C forgets the negative x-values: at x equals negative one, y is five thirds, which is less than five.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['For $y = a(b)^x$ with $a > 0$: domain all real numbers, range $y > 0$.', 'The $y$-intercept is $a$; there is no $x$-intercept.', 'The horizontal asymptote is $y = 0$, the $x$-axis.', 'Increasing if $b > 1$; decreasing if $0 < b < 1$.'] }],
      lines: [
        { say: 'Let’s sum up. For y equals "a" times b to the power x, with "a" positive, the domain is all real numbers, and the range is y greater than zero.', show: 'sum.0' },
        { say: 'The y-intercept is "a", and there is no x-intercept.', show: 'sum.1' },
        { say: 'The horizontal asymptote is y equals zero, the x-axis.', show: 'sum.2' },
        { say: 'And the function is increasing if b is greater than one, and decreasing if b is between zero and one. In the next part, we find "a" and b from a table of values. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
