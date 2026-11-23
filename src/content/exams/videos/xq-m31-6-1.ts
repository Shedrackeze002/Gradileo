import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 6.1 (tangent lines and linear approximation). The question is an
// exercise from OpenStax Calculus Volume 1 (section 4.2, Linear Approximations and Differentials,
// CC BY-NC-SA 4.0): the book's instruction "For the following exercises, compute the values given
// within 0.01 by deciding on the appropriate f(x) and a, and evaluating L(x) = f(a) + f′(a)(x − a).
// Check your answer using a calculator." is put with the one value it asks about, without the
// "[T]" mark. f(x) = x^(1/4), a = 16: L = 2 + (1/32)(−0.01) = 1.9996875, as in the book's answer;
// a calculator gives 1.99968743, a difference of under 0.0000001.

const QUESTION =
  'Compute the value given within 0.01 by deciding on the appropriate f(x) and a, and evaluating L(x) = f(a) + f′(a)(x − a). Check your answer using a calculator. (15.99)^(1/4)';

const g = plane({ x: [0, 20], y: [0, 3], xStep: 2, yStep: 0.5, every: 2, width: 9, height: 6 });

/** y = x^(1/4) and its tangent line at (16, 2). */
const graph = (height = 440) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 'f', f: (x) => x ** 0.25, from: 0, to: 20, tone: 'adj', label: 'y = x^{1/4}', labelAt: 0.3 }),
      plot(g, { id: 'L', f: (x) => 2 + (x - 16) / 32, from: 4, to: 20, tone: 'theta', label: 'L(x)', labelAt: 0.25, side: 'right' }),
      dots(g, [{ id: 'p', x: 16, y: 2, tex: '(16, 2)', tone: 'theta', place: 'below right' }]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-6-1',
  lessonId: '',
  exam: {
    lesson: 'm31-6-1',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 4.2, Linear Approximations and Differentials',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/4-2-linear-approximations-and-differentials',
    question: QUESTION,
  },
  title: 'Exam Question: Estimate the Fourth Root of 15.99 (Linear Approximation)',
  thumbnailTitle: 'A Fourth Root Without a Calculator',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: estimate (15.99)^(1/4) with a linear approximation L(x) = f(a) + f′(a)(x − a). We choose f(x) = x^(1/4) and a = 16, because 16 is close to 15.99 and its fourth root is exactly 2. With f′(16) = 1/32, L(15.99) = 2 − 0.01/32 = 1.9996875. A calculator gives 1.99968743, so the estimate is excellent. Then we look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Fourth Root Without a Calculator', subtitle: 'Linear approximation, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about linear approximation. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Compute the value given within 0.01 by deciding on the appropriate $f(x)$ and $a$, and evaluating $L(x) = f(a) + f\'(a)(x - a)$. Check your answer using a calculator. $(15.99)^{1/4}$',
          answer: '$f(x) = x^{1/4}$, $a = 16$: $L(15.99) = 1.9996875$',
          working: '$f\'(16) = \\dfrac{1}{4}(16)^{-3/4} = \\dfrac{1}{32}$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Compute the value, within 0.01, by choosing a function f and a point "a", and evaluating L of x equals f of "a" plus f prime of "a" times x minus "a". Check with a calculator. The value is 15.99 to the power one quarter: the fourth root of 15.99.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'split',
      leftWidth: 640,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Near a point we know, the **tangent line** is almost the same as the curve. So we read the estimate off the line instead.' }],
      lines: [
        { say: 'Here is the graph of y equals x to the one quarter.', show: ['g.grid', 'g.axes', 'g.f'] },
        { say: 'At 16 we know the value exactly: the fourth root of 16 is 2. Here is the tangent line there.', show: ['g.p', 'g.L'] },
        { say: 'Near 16, the tangent line is almost the same as the curve. So we can read the estimate off the line instead, which is much easier.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['L(x) = f(a) + f\'(a)(x - a)'] },
        { kind: 'callout', id: 'c', tone: 'tip', title: 'Choosing a', md: 'Pick $a$ **close** to the number you want, where $f(a)$ is **easy** to find exactly.' },
      ],
      lines: [
        { say: 'Here is what we need. L of x is the tangent line at "a": the value at "a", plus the slope at "a" times how far x is from "a".', show: 'f' },
        { say: 'Choose "a" close to the number you want, and where f of "a" is easy to find exactly.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Choose $f(x) = x^{1/4}$ and $a = 16$', 'Find $f(16)$ and $f\'(16)$', 'Evaluate $L(15.99)$, then check'] }],
      lines: [
        { say: 'Here is the plan. Choose f of x equals x to the one quarter, and "a" equals 16.', show: 'plan.0' },
        { say: 'Find f of 16 and f prime of 16.', show: 'plan.1' },
        { say: 'Evaluate L at 15.99, then check with a calculator.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: f and a',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(x) = x^{1/4}, \\quad a = 16', 'f(16) = 16^{1/4} = \\good{2} \\quad (2^4 = 16)'] }],
      lines: [
        { say: 'Step one. We want a fourth root, so f of x is x to the one quarter. 15.99 is very close to 16, so "a" is 16.', show: 'm.0' },
        { say: 'And f of 16 is exactly 2, because 2 to the 4 is 16.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The slope',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f\'(x) = \\dfrac{1}{4}x^{-3/4}', 'f\'(16) = \\dfrac{1}{4} \\cdot \\dfrac{1}{16^{3/4}} = \\dfrac{1}{4} \\cdot \\dfrac{1}{8} = \\good{\\dfrac{1}{32}}'] }],
      lines: [
        { say: 'Step two. The power rule: one quarter times x to the one quarter minus 1, which is negative three quarters.', show: 'm.0' },
        { say: '16 to the three quarters is 2 cubed, which is 8. So f prime of 16 is one quarter times one eighth: 1 over 32.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Evaluate L',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['L(x) = 2 + \\dfrac{1}{32}(x - 16)', 'L(15.99) = 2 + \\dfrac{1}{32}(-0.01)', '= 2 - 0.0003125 = \\good{1.9996875}'] }],
      lines: [
        { say: 'Step three. The tangent line is 2 plus 1 over 32 times x minus 16.', show: 'm.0' },
        { say: 'At 15.99, x minus 16 is negative 0.01.', show: 'm.1' },
        { say: '0.01 over 32 is 0.0003125. Take that from 2: the estimate is 1.9996875.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{calculator: } (15.99)^{1/4} \\approx 1.99968743', '|1.9996875 - 1.99968743| < 0.0000001 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a calculator: 15.99 to the one quarter is about 1.99968743.', show: 'm.0' },
        { say: 'Our estimate is off by less than one ten millionth, far better than the 0.01 the question asks for. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$a = 15.99$', '$f(a)$ is then the thing we cannot find: choose a **nice** $a$'],
            ['$x - a = +0.01$', '$15.99$ is **below** $16$: $x - a = -0.01$'],
            ['$16^{-3/4} = -8$', 'a negative power means a **reciprocal**: $\\dfrac{1}{8}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Choosing "a" as 15.99 itself gets you nowhere. Choose a nearby number with an easy answer.' },
        { say: '15.99 is below 16, so x minus "a" is negative 0.01, and the estimate is a little under 2.' },
        { say: 'And a negative power means a reciprocal, not a negative number.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Use a linear approximation to estimate $\\sqrt{4.02}$.',
          choices: ['$2.01$', '$2.02$', '$2.0025$', '$2.005$'],
          answer: 3,
          working: '$f(x) = \\sqrt{x}$, $a = 4$, $f\'(4) = \\dfrac{1}{4}$: $L(4.02) = 2 + \\dfrac{1}{4}(0.02) = 2.005$',
        },
      ],
      lines: [
        { say: 'Your turn. Use a linear approximation to estimate the square root of 4.02. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Take f of x as root x and "a" as 4. f of 4 is 2, and f prime of 4 is 1 over 2 root 4, which is one quarter. So L is 2 plus one quarter of 0.02: 2.005. Choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$L(x) = f(a) + f\'(a)(x - a)$: the **tangent line**', 'Choose $a$ **close** by, with an **easy** $f(a)$', 'Watch the **sign** of $x - a$', 'Best when $x$ is very close to $a$'] }],
      lines: [
        { say: 'Here is what to remember. The linear approximation is the tangent line: f of "a" plus f prime of "a" times x minus "a".', show: 'sum.0' },
        { say: 'Choose "a" close by, where f of "a" is easy.', show: 'sum.1' },
        { say: 'Watch the sign of x minus "a".', show: 'sum.2' },
        { say: 'And it works best when x is very close to "a". For more on tangent lines and linear approximation, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
