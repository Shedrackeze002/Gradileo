import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-1, 3], y: [-10, 8], yStep: 2, every: 1, width: 6, height: 7 });

const video: Explainer = {
  id: 'mx-8-2',
  lessonId: 'mx-8-2',
  title: 'Solving Equations by Iteration',
  thumbnailTitle: 'Iteration',
  thumbnail: 'gr',
  summary: 'If f(1) and f(2) have opposite signs, f(x) = 0 has a solution between 1 and 2. Rearranging x³ + 2x − 9 = 0 into x = ∛(9 − 2x) gives the iteration formula x(n+1) = ∛(9 − 2x(n)); starting from x₀ = 2 it settles on x = 1.76 to 2 decimal places.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sequences, Iteration and Graphs', title: 'Solving Equations by Iteration', subtitle: 'Closer and closer to the answer' }],
      lines: [
        { say: 'Some equations, like x cubed plus two x minus nine equals zero, cannot be solved by factorizing, or with a formula we know.', show: 'title' },
        { say: 'We can still find their solutions as accurately as we like. In this video, you will learn to trap a solution between two numbers, and then home in on it by iteration.' },
      ],
    },
    {
      chapter: 'A change of sign',
      layout: 'split',
      leftWidth: 620,
      left: [figure('gr', [g, plot(g, { id: 'f', f: (x) => x ** 3 + 2 * x - 9, from: -1, to: 2.6 }), dots(g, [{ id: 'a', x: 1, y: -6, tex: '(1,\\ {-6})', place: 'below right', tone: 'bad' }, { id: 'b', x: 2, y: 3, tex: '(2,\\ 3)', place: 'right', tone: 'good' }, { id: 'root', x: 1.762, y: 0, tex: '', tone: 'theta' }])], 560)],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = x^3 + 2x - 9', 'f(1) = 1 + 2 - 9 = {-6}', 'f(2) = 8 + 4 - 9 = 3'] },
        { kind: 'text', id: 'so', md: 'A change of sign, so a solution lies between $1$ and $2$.' },
      ],
      lines: [
        { say: 'Let f of x be x cubed plus two x minus nine. A solution of f of x equals zero is where the graph crosses the x-axis.', show: ['gr.grid', 'gr.axes', 'gr.f', 'm.0'], focus: 'm.0' },
        { say: 'f of one is one plus two minus nine, which is negative six. The graph is below the axis there.', show: ['m.1', 'gr.a'], focus: ['m.1', 'gr.a'] },
        { say: 'f of two is eight plus four minus nine, which is three. The graph is above the axis there.', show: ['m.2', 'gr.b'], focus: ['m.2', 'gr.b'] },
        { say: 'The value changes sign, from negative to positive. As long as the graph has no breaks, it must cross the axis somewhere between one and two. So there is a solution between one and two.', show: ['so', 'gr.root'], focus: 'gr.root' },
      ],
    },
    {
      chapter: 'An iteration formula',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Iteration', md: 'Repeating a process, each time using the last answer. An **iteration formula** turns one estimate $x_n$ into the next, $x_{n+1}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x^3 + 2x - 9 = 0', 'x^3 = 9 - 2x', 'x = \\sqrt[3]{9 - 2x}', 'x_{n+1} = \\sqrt[3]{9 - 2x_n}'] },
      ],
      lines: [
        { say: 'Iteration means repeating a process, each time using the last answer. An iteration formula turns one estimate, x n, into the next one, x n plus one.', show: 'def' },
        { say: 'We get a formula by rearranging the equation so that x is on its own on one side.', show: 'm.0', focus: 'm.0' },
        { say: 'Move the other terms across: x cubed equals nine minus two x.', show: 'm.1', focus: 'm.1' },
        { say: 'Take the cube root of both sides: x equals the cube root of nine minus two x.', show: 'm.2', focus: 'm.2' },
        { say: 'Then write x n plus one on the left, and x n on the right. Each answer we put in gives the next one out.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Iterating',
      layout: 'split',
      leftWidth: 560,
      left: [
        { kind: 'table', id: 't', head: ['$n$', '$x_n$'], rows: [['$0$', '$2$'], ['$1$', '$1.709976\\ldots$'], ['$2$', '$1.773697\\ldots$'], ['$3$', '$1.760089\\ldots$'], ['$4$', '$1.763013\\ldots$'], ['$5$', '$1.762386\\ldots$']] },
      ],
      right: [
        { kind: 'calc', id: 'c', keys: '∛(9 − 2 × Ans)', result: '1.709975947' },
        { kind: 'text', id: 'ans', md: '$x_4$ and $x_5$ both round to $1.76$, so $x = 1.76$ to 2 decimal places.' },
      ],
      lines: [
        { say: 'Start from x nought equals two.', show: 't.0', focus: 't.0' },
        { say: 'Put two into the formula: the cube root of nine minus four, which is the cube root of five, one point seven zero nine nine and so on.', show: ['t.1', 'c'], focus: 't.1' },
        { say: 'On a calculator, type two and press equals. Then type the formula with the answer key in place of x n. Each press of equals gives the next value, and keeps every digit.' },
        { say: 'Keep going. The values jump above and below the solution, but get closer each time: one point seven seven three, one point seven six zero, one point seven six three, one point seven six two.', show: ['t.2', 't.3', 't.4', 't.5'], focus: ['t.4', 't.5'] },
        { say: 'x four and x five both round to one point seven six. So the solution is x equals one point seven six, to two decimal places.', show: 'ans' },
      ],
    },
    {
      chapter: 'Keep every digit',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding as you go', md: 'Rounding $x_1$ to $1.71$ before finding $x_2$ adds an error at every step. Keep every digit, and round only the answer you write down.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'When to stop', md: 'Stop when two answers in a row round to the same value: that value is the solution to that accuracy.' },
      ],
      lines: [
        { say: 'Do not round as you go. Rounding x one to one point seven one before working out x two adds a small error at every step. Keep every digit, and round only the answer you write down.', show: 'oops' },
        { say: 'And stop when two answers in a row round to the same value. That value is the solution, to that accuracy.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use $x_{n+1} = \\sqrt{x_n + 5}$ with $x_0 = 3$. What is $x_1$, to 3 decimal places?',
          choices: ['$2.828$', '$2.798$', '$2.646$', '$2.236$'],
          answer: 0,
          working: '$x_1 = \\sqrt{3 + 5} = \\sqrt{8} = 2.828\\ldots$',
        },
      ],
      lines: [
        { say: 'Your turn. Use the formula x n plus one equals the square root of x n plus five, starting from x nought equals three. What is x one, to three decimal places? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x one is the square root of three plus five, which is the square root of eight, two point eight two eight. Choice B is the next value, x two.', show: 'q.answer' },
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
          items: ['If $f(a)$ and $f(b)$ have opposite signs, $f(x) = 0$ has a solution between $a$ and $b$.', 'Rearrange into $x = \\ldots$ to make an iteration formula.', 'Start from $x_0$ and keep substituting, keeping every digit.', 'Stop when two answers in a row round to the same value.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A change of sign between f of "a" and f of b traps a solution between them.', show: 'sum.0' },
        { say: 'Rearrange the equation into x equals something to make an iteration formula.', show: 'sum.1' },
        { say: 'Start from x nought, and keep substituting each answer back in, keeping every digit.', show: 'sum.2' },
        { say: 'Stop when two answers in a row round to the same value. In the next lesson, we find rates of change and areas from graphs. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
