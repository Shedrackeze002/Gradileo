import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { machine } from './lib/m31-1-figures.ts';

const video: Explainer = {
  id: 'm31-1-1-b',
  lessonId: 'm31-1-1',
  title: 'Functions for Calculus, Part 2: Inside and Outside',
  thumbnailTitle: 'Inside and Outside',
  thumbnail: 'm1',
  summary: 'Running composition backwards: to write a function as f(g(x)), ask what you would calculate first. That step is the inner function g, and the last step is the outer function f, as for H(x) = √(3x + 1), with g(x) = 3x + 1 and f(x) = √x, and for (x² + 4)⁵ and 1/(2x − 7).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Precalculus Review · Part 2', title: 'Inside and Outside', subtitle: 'Finding the inner and outer functions' }],
      lines: [
        { say: 'In the last part, we put two functions together to make a composite function. Calculus often runs this backwards. You are given one function, and you need to see the two simpler functions it is built from.', show: 'title' },
        { say: 'In this video, you will learn to split a function into an inner function and an outer function.' },
      ],
    },
    {
      chapter: 'What would you calculate first?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['H(x) = \\sqrt{3x + 1}', 'H(5) = \\sqrt{\\adj{3(5) + 1}} = \\sqrt{\\adj{16}} = \\opp{4}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The question to ask', md: '"What would I calculate first?" The first step is the **inner** function. The last step is the **outer** function.' },
      ],
      lines: [
        { say: 'Take the function H of x equals the square root of three x plus one. We want to write it as f of g of x.', show: 'm.0', focus: 'm.0' },
        { say: 'Here is the trick. Imagine working out H of five with a calculator. What would you calculate first?', focus: 'm.0' },
        { say: 'First, you would work out three times five, plus one, which is sixteen. Only then would you take the square root, and get four.', show: 'm.1', focus: 'm.1' },
        { say: 'So ask yourself: what would I calculate first? That first step is the inner function. The last step is the outer function.', show: 'key' },
      ],
    },
    {
      chapter: 'The inner and outer functions',
      layout: 'center',
      main: [
        figure('m1', [machine({ input: 'x', first: '3x + 1', firstNote: 'g(x)', mid: '3x + 1', second: '\\sqrt{\\phantom{x}}', secondNote: 'f(x)', output: '\\sqrt{3x + 1}' })], 210),
        { kind: 'math', id: 'm', size: 'md', lines: ['g(x) = \\adj{3x + 1} \\qquad f(x) = \\opp{\\sqrt{x}}', 'f(g(x)) = f(\\adj{3x + 1}) = \\sqrt{3x + 1} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'The first step takes x and makes three x plus one. So the inner function is g of x equals three x plus one.', show: ['m1.in', 'm1.a1', 'm1.box1', 'm1.a2'], focus: 'm1.box1' },
        { say: 'The last step takes the square root of whatever comes in. So the outer function is f of x equals the square root of x.', show: ['m1.box2', 'm1.a3', 'm1.out', 'm.0'], focus: ['m1.box2', 'm.0'] },
        { say: 'Always check. f of g of x is f of three x plus one, which is the square root of three x plus one. That is H of x, so the split is right.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two more examples',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Function', 'Calculate first', 'Inner $g(x)$', 'Outer $f(x)$'],
          rows: [
            ['$(x^2 + 4)^5$', '$x^2 + 4$', '$x^2 + 4$', '$x^5$'],
            ['$\\dfrac{1}{2x - 7}$', '$2x - 7$', '$2x - 7$', '$\\dfrac{1}{x}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are two more. Take x squared plus four, all to the power five. To evaluate it, you would work out x squared plus four first, and raise the answer to the power five last.', show: 't.0', focus: 't.0' },
        { say: 'So the inner function is x squared plus four, and the outer function is x to the power five.', focus: 't.0' },
        { say: 'Next, one over two x minus seven. First you work out the denominator, two x minus seven. Then you divide one by it.', show: 't.1', focus: 't.1' },
        { say: 'So the inner function is two x minus seven, and the outer function is one over x. In each case, the outer function is what you do last, to the whole inside.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Why it matters',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Looking ahead', md: 'Later in calculus, the **chain rule** finds how fast a composite function changes by dealing with the inner and outer functions one at a time. Spotting them quickly now pays off then.' }],
      lines: [
        { say: 'Why practise this now? Later in calculus, you will meet the chain rule. It finds how fast a composite function changes, by dealing with the inner function and the outer function one at a time.', show: 'tip' },
        { say: 'The chain rule only works if you can see the inside and the outside of a function quickly. So the habit of asking, what would I calculate first, will pay off.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $H(x) = (5x - 2)^3$ as $f(g(x))$.',
          choices: ['$f(x) = 5x - 2,\\ g(x) = x^3$', '$f(x) = x^3,\\ g(x) = 5x$', '$f(x) = \\sqrt[3]{x},\\ g(x) = 5x - 2$', '$f(x) = x^3,\\ g(x) = 5x - 2$'],
          answer: 3,
          working: 'You would calculate $5x - 2$ first, so $g(x) = 5x - 2$. Then you cube it, so $f(x) = x^3$. Check: $f(g(x)) = (5x - 2)^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write H of x equals five x minus two, all cubed, as f of g of x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. You would work out five x minus two first, so that is the inner function, g. Then you would cube it, so the outer function, f, is x cubed. Choice A has them the wrong way round: it gives five x cubed, minus two.', show: 'q.answer' },
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
          items: ['To split a function into $f(g(x))$, ask: what would I calculate first?', 'The first step is the inner function $g$; the last step is the outer function $f$.', 'Check by composing: $f(g(x))$ should give back the original function.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To split a function into f of g of x, ask yourself what you would calculate first.', show: 'sum.0' },
        { say: 'The first step is the inner function, g. The last step is the outer function, f.', show: 'sum.1' },
        { say: 'And check by composing them again. In the next part, we find the domain of a composite function. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
