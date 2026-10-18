import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, guide, numbers, plane, plot, tag } from './lib/m302-6-graphs.ts';

// y = 3(2)^x through (0, 3), (1, 6), (2, 12) and (3, 24).
const g = plane({ x: [-1, 3.5], y: [0, 26], yStep: 2, every: 0, width: 7, height: 8 });

const video: Explainer = {
  id: 'm302-6-1-c',
  lessonId: 'm302-6-1',
  title: 'Exponential Functions, Part 3: Finding the Equation from a Table or a Graph',
  thumbnailTitle: 'Finding a and b',
  thumbnail: 'gr',
  summary: 'Why consecutive y-values of an exponential function have a constant ratio, b, and the value at x = 0 is a; finding y = 3(2)ˣ from a table and from its graph, then y = 192 at x = 6; and telling a constant ratio (exponential) from a constant difference (linear).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 3', title: 'Finding the Equation', subtitle: 'Reading a and b from a table or a graph' }],
      lines: [
        { say: 'If you know a few values of an exponential function, you can find its equation. And with the equation, you can find any other value.', show: 'title' },
        { say: 'In this video, you will find "a" and b from a table of values and from a graph, and tell an exponential pattern from a linear one.' },
      ],
    },
    {
      chapter: 'A constant ratio',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$x$', '$0$', '$1$', '$2$', '$3$'], rows: [['$y = a(b)^x$', '$a$', '$ab$', '$ab^2$', '$ab^3$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{ab}{a} = \\dfrac{ab^2}{ab} = \\dfrac{ab^3}{ab^2} = \\opp{b}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Reading a and b', md: 'The $y$-value at $x = 0$ is $a$. The **ratio** of consecutive $y$-values (each divided by the one before) is constant, and it is $b$.' },
      ],
      lines: [
        { say: 'Look at the values of y equals "a" times b to the power x. At x equals zero, y is "a". At x equals one, it is "a" times b. Then "a" times b squared, and "a" times b cubed.', show: 't.0', focus: 't.0' },
        { say: 'Each time x increases by one, y is multiplied by b. So if you divide any y-value by the one before it, you always get b. That number is called the ratio of consecutive y-values.', show: 'm.0', focus: 'm.0' },
        { say: 'So the y-value at x equals zero is "a", and the constant ratio is b.', show: 'key' },
      ],
    },
    {
      chapter: 'From a table',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$x$', '$0$', '$1$', '$2$', '$3$', '$4$'], rows: [['$y$', '$3$', '$6$', '$12$', '$24$', '$48$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 0\\colon\\ y = 3, \\text{ so } \\adj{a = 3}', '\\dfrac{6}{3} = \\dfrac{12}{6} = \\dfrac{24}{12} = \\dfrac{48}{24} = 2, \\text{ so } \\opp{b = 2}', 'y = 3(2)^x', 'x = 6\\colon\\quad y = 3(2)^6 = 3(64) = 192'] },
      ],
      lines: [
        { say: 'Find the equation of the exponential function in this table, then find y when x is six.', show: 't.0', focus: 't.0' },
        { say: 'At x equals zero, y is three. So "a" is three.', show: 'm.0', focus: 'm.0' },
        { say: 'Now divide each y-value by the one before it. Six over three is two, twelve over six is two, 24 over twelve is two, and 48 over 24 is two. The ratio is constant, so b is two.', show: 'm.1', focus: 'm.1' },
        { say: 'So the equation is y equals three times two to the power x.', show: 'm.2', focus: 'm.2' },
        { say: 'When x is six, y is three times two to the sixth. Two to the sixth is 64, and three times 64 is 192.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'From a graph',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('gr', [
          g,
          numbers(g, 1, 4),
          plot(g, { id: 'curve', f: (x) => 3 * 2 ** x, samples: 200 }),
          guide(g, 'run', [0, 3], [1, 3], 'muted', { group: 'step' }),
          guide(g, 'up', [1, 3], [1, 6], 'opp', { group: 'step' }),
          tag(g, 'up-t', 1.05, 4.5, '\\times 2', 'right', 'opp', 'step'),
          dots(g, [
            { id: 'A', x: 0, y: 3, tex: '(0, 3)', tone: 'adj', place: 'above left' },
            { id: 'B', x: 1, y: 6, tex: '(1, 6)', tone: 'opp', place: 'above left' },
            { id: 'C', x: 2, y: 12, tex: '(2, 12)', tone: 'opp', place: 'above left' },
            { id: 'D', x: 3, y: 24, tex: '(3, 24)', tone: 'opp', place: 'above left' },
          ]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['The $y$-intercept is $a$: here $a = 3$.', 'From $x = 0$ to $x = 1$, $y$ is multiplied by $b$: $\\dfrac{6}{3} = 2$.', 'Check another step: $\\dfrac{12}{6} = 2$.'] }],
      lines: [
        { say: 'You can read the same things from a graph. Here is the graph of the same function.', show: ['gr.grid', 'gr.axes', 'gr.curve'] },
        { say: 'The graph crosses the y-axis at three, so "a" is three.', show: ['gr.A', 'b.0'], focus: ['gr.A', 'b.0'] },
        { say: 'Now move one unit to the right, to x equals one. The point there is one, six. Six divided by three is two, so y was multiplied by two, and b is two.', show: ['gr.B', 'gr.step', 'b.1'], focus: ['gr.B', 'b.1'] },
        { say: 'Check another step: from one, six, to two, twelve, y is multiplied by two again. So the equation is y equals three times two to the power x.', show: ['gr.C', 'gr.D', 'b.2'], focus: ['gr.C', 'b.2'] },
      ],
    },
    {
      chapter: 'Ratio or difference?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$x$', '$0$', '$1$', '$2$', '$3$', 'Pattern'], rows: [['Table 1', '$5$', '$8$', '$11$', '$14$', '$+3$ each step: [[adj:linear]]'], ['Table 2', '$5$', '$10$', '$20$', '$40$', '$\\times 2$ each step: [[opp:exponential]]']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Ratio or difference?', md: 'If the $y$-values have a constant **difference**, the function is linear. If they have a constant **ratio**, it is exponential. Check two or three pairs before you decide.' },
      ],
      lines: [
        { say: 'How can you tell whether a table shows an exponential function at all? Compare these two tables.', show: ['t.0', 't.1'] },
        { say: 'In table one, subtract each y-value from the next: eight minus five is three, eleven minus eight is three, and fourteen minus eleven is three. The difference is constant, so the function is linear.', focus: 't.0' },
        { say: 'In table two, divide instead: ten over five is two, twenty over ten is two, and forty over twenty is two. The ratio is constant, so the function is exponential.', focus: 't.1' },
        { say: 'A constant difference means linear. A constant ratio means exponential. Check two or three pairs before you decide.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An exponential function has $y = 80, 40, 20, 10$ at $x = 0, 1, 2, 3$. Which equation fits?',
          choices: ['$y = 80(2)^x$', '$y = 0.5(80)^x$', '$y = 80 - 20x$', '$y = 80\\left(\\frac{1}{2}\\right)^x$'],
          answer: 3,
          working: 'At $x = 0$, $y = 80$, so $a = 80$. $\\dfrac{40}{80} = \\dfrac{20}{40} = \\dfrac{10}{20} = \\dfrac{1}{2}$, so $b = \\frac{1}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. An exponential function has y-values 80, 40, 20 and ten, at x equals zero, one, two and three. Which equation fits? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. At x equals zero, y is 80, so "a" is 80. Each y-value divided by the one before is one half, so b is one half. Choice A turns the ratio upside down: multiplying by two would make the values grow.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The $y$-value at $x = 0$ is $a$.', 'The constant ratio of consecutive $y$-values is $b$.', 'Constant difference: linear. Constant ratio: exponential.'] }],
      lines: [
        { say: 'Let’s sum up. In an exponential function, the y-value at x equals zero is "a".', show: 'sum.0' },
        { say: 'Divide each y-value by the one before it. That constant ratio is b.', show: 'sum.1' },
        { say: 'And a constant difference means a linear function, while a constant ratio means an exponential one. In the next part, we use exponential functions to model real situations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
