import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, name, numbers, plane, plot } from './lib/m302-6-graphs.ts';

// y = 3(2)^x (growth) and y = 8(1/2)^x (decay).
const g = plane({ x: [-4, 4], y: [0, 12], yStep: 2, every: 0, width: 8, height: 8 });

const video: Explainer = {
  id: 'm302-6-1',
  lessonId: 'm302-6-1',
  title: 'Exponential Functions, Part 1: Growth or Decay',
  thumbnailTitle: 'Exponential Growth and Decay',
  thumbnail: 'gd',
  summary: 'An exponential function y = a(b)ˣ multiplies by the same number b each step: a is the initial value and b the base. A base greater than 1 gives growth and a base between 0 and 1 gives decay, as for y = 3(2)ˣ and y = 8(½)ˣ, y = 5(1.08)ˣ and y = 200(0.75)ˣ; and why the value of a does not decide which.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exponents and Logarithms · Part 1', title: 'Growth or Decay?', subtitle: 'Multiplying by the same number each step' }],
      lines: [
        { say: 'A bacteria culture that doubles every hour, a truck that loses fifteen percent of its value every year, and an account that gains ten percent more followers every week all follow the same pattern.', show: 'title' },
        { say: 'In each time step, the quantity is multiplied by the same number. In this video, you will meet exponential functions, and tell growth from decay.' },
      ],
    },
    {
      chapter: 'Adding or multiplying',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Linear: } 3,\\ 5,\\ 7,\\ 9,\\ 11 \\qquad (\\adj{+2} \\text{ each step})', '\\text{Exponential: } 3,\\ 6,\\ 12,\\ 24,\\ 48 \\qquad (\\opp{\\times 2} \\text{ each step})'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Exponential change', md: 'In each step, the quantity is **multiplied** by the same number.' },
      ],
      lines: [
        { say: 'In a linear pattern, the same amount is added at each step: three, five, seven, nine, eleven. Two is added each time.', show: 'm.0', focus: 'm.0' },
        { say: 'In an exponential pattern, each value is multiplied by the same number: three, six, twelve, 24, 48. Each value is two times the one before.', show: 'm.1', focus: 'm.1' },
        { say: 'After the same four steps, the linear pattern has reached eleven, but the exponential one has reached 48. Multiplying makes the changes bigger and bigger.', show: 'key' },
      ],
    },
    {
      chapter: 'Exponential functions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Exponential function', md: 'A function of the form $y = a(b)^x$, where $a \\ne 0$, $b > 0$ and $b \\ne 1$. The value $a$ is the **initial value** (the value when $x = 0$), and $b$ is the **base**: the number $y$ is multiplied by each time $x$ increases by $1$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\adj{a}(\\opp{b})^x', 'y = \\adj{3}(\\opp{2})^x\\colon\\quad 3,\\ 6,\\ 12,\\ 24,\\ \\dots'] },
      ],
      lines: [
        { say: 'An exponential function has the form y equals "a" times b to the power x.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'The number "a" is the initial value: the value of y when x is zero. Any nonzero number to the power zero is one, so at x equals zero, y is "a" times one, which is just "a".' },
        { say: 'The number b is the base: the number that y is multiplied by each time x increases by one. It must be positive, and it cannot be one, because multiplying by one would change nothing.' },
        { say: 'For example, y equals three times two to the power x starts at three, and doubles each time x goes up by one: three, six, twelve, 24, and so on.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Growth and decay',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('gd', [
          g,
          numbers(g, 2, 2),
          plot(g, { id: 'grow', f: (x) => 3 * 2 ** x, samples: 200 }),
          plot(g, { id: 'decay', f: (x) => 8 * 0.5 ** x, tone: 'opp', samples: 200 }),
          name(g, 'grow-t', 2.05, 10.5, 'y = 3(2)^x', 'right'),
          name(g, 'decay-t', -0.75, 11, 'y = 8\\left(\\tfrac{1}{2}\\right)^x', 'left', 'opp'),
          dots(g, [
            { id: 'A', x: 0, y: 3, tex: '(0, 3)', tone: 'brand', place: 'below right' },
            { id: 'B', x: 0, y: 8, tex: '(0, 8)', tone: 'opp', place: 'below left' },
          ]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['$b > 1$: the $y$-values increase. This is **exponential growth**.', '$0 < b < 1$: the $y$-values decrease. This is **exponential decay**.'] }],
      lines: [
        { say: 'The base tells you how the function behaves. In purple is y equals three times two to the power x. Its base, two, is greater than one, so the y-values increase. That is exponential growth.', show: ['gd.grid', 'gd.axes', 'gd.grow', 'gd.grow-t', 'b.0'], focus: ['gd.grow', 'b.0'] },
        { say: 'In orange is y equals eight times one half to the power x. Its base, one half, is between zero and one, so each step makes y smaller: eight, four, two, one, and so on. That is exponential decay.', show: ['gd.decay', 'gd.decay-t', 'b.1'], focus: ['gd.decay', 'b.1'] },
        { say: 'Each graph crosses the y-axis at its value of "a". The growth curve crosses at three, and the decay curve at eight.', show: ['gd.A', 'gd.B'], focus: ['gd.A', 'gd.B'] },
        { say: 'Notice too that neither curve ever touches the x-axis. Multiplying a positive number by a positive base never gives zero.', focus: 'gd' },
      ],
    },
    {
      chapter: 'Which is it?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 5(1.08)^x\\colon\\quad b = 1.08 > 1, \\text{ so growth}', 'x = 0\\colon\\quad y = 5(1.08)^0 = 5(1) = 5', 'y = 200(0.75)^x\\colon\\quad 0 < 0.75 < 1, \\text{ so decay}', 'x = 0\\colon\\quad y = 200(0.75)^0 = 200'] },
      ],
      lines: [
        { say: 'Decide whether each function shows growth or decay, and state its y-intercept. First, y equals five times 1.08 to the power x.', show: 'm.0', focus: 'm.0' },
        { say: 'The base, 1.08, is greater than one, so this is growth. At x equals zero, y is five times 1.08 to the power zero, which is five times one: five. So the y-intercept is five.', show: 'm.1', focus: 'm.1' },
        { say: 'Next, y equals 200 times 0.75 to the power x. The base, 0.75, is between zero and one, so this is decay.', show: 'm.2', focus: 'm.2' },
        { say: 'At x equals zero, y is 200, so the y-intercept is 200. In every exponential function, the y-intercept is the value of "a".', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Looking at a instead of b', md: '$y = 0.5(3)^x$ shows **growth**, even though $0.5 < 1$. The value of $a$ only sets the starting height; the base $b = 3$ decides growth or decay.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.5,\\ 1.5,\\ 4.5,\\ 13.5,\\ \\dots \\qquad (\\times 3 \\text{ each step})'] },
      ],
      lines: [
        { say: 'A common mistake is to look at "a" instead of b. Take y equals 0.5 times three to the power x. The 0.5 is less than one, so it is tempting to call this decay.', show: 'oops' },
        { say: 'But the values are 0.5, 1.5, 4.5, 13.5: each one three times the one before. They grow.', show: 'm.0', focus: 'm.0' },
        { say: 'The value of "a" only sets the starting height. The base, b, decides growth or decay.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which function shows exponential decay?',
          choices: ['$y = 0.4(2.5)^x$', '$y = 3(1.2)^x$', '$y = 6(0.9)^x$', '$y = 0.9(1.1)^x$'],
          answer: 2,
          working: 'Only $y = 6(0.9)^x$ has a base between $0$ and $1$. The other bases, $2.5$, $1.2$ and $1.1$, are greater than $1$, so those functions show growth.',
        },
      ],
      lines: [
        { say: 'Your turn. Which function shows exponential decay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Its base, 0.9, is between zero and one, so each step multiplies y by 0.9, and the values shrink. Choice A starts small, at 0.4, but its base, 2.5, is greater than one, so it shows growth.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An exponential function $y = a(b)^x$ multiplies by $b$ each time $x$ increases by $1$.', '$a$ is the initial value, the $y$-intercept.', '$b > 1$: growth. $0 < b < 1$: decay.', 'The value of $a$ does not decide growth or decay.'] }],
      lines: [
        { say: 'Let’s sum up. An exponential function, y equals "a" times b to the power x, multiplies y by b each time x increases by one.', show: 'sum.0' },
        { say: 'The number "a" is the initial value, which is also the y-intercept.', show: 'sum.1' },
        { say: 'If b is greater than one, the function shows growth. If b is between zero and one, it shows decay.', show: 'sum.2' },
        { say: 'And the value of "a" does not decide which. In the next part, we look at the features that every exponential graph shares. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
