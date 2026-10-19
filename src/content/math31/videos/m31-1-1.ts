import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { machine } from './lib/m31-1-figures.ts';

const video: Explainer = {
  id: 'm31-1-1',
  lessonId: 'm31-1-1',
  title: 'Functions for Calculus, Part 1: Composite Functions',
  thumbnailTitle: 'Composite Functions',
  thumbnail: 'm1',
  summary: 'A composite function applies one function after another: (f ∘ g)(x) = f(g(x)), with the inner function g first. With f(x) = 2x − 3 and g(x) = x² + 1, (f ∘ g)(2) = 7 but (g ∘ f)(2) = 2, the formulas are 2x² − 1 and 4x² − 12x + 10, and composing is not multiplying.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Precalculus Review · Part 1', title: 'Composite Functions', subtitle: 'One function after another' }],
      lines: [
        { say: 'Calculus is the study of change, and the things that change are functions. Before we can measure how fast a function changes, we need a few tools for working with functions.', show: 'title' },
        { say: 'In this video, you will learn to build a new function by applying one function after another. This is called composition, and the result is a composite function.' },
      ],
    },
    {
      chapter: 'One after the other',
      layout: 'center',
      main: [
        figure('m1', [machine({ input: 'x', first: 'g', firstNote: '\\text{inner}', mid: 'g(x)', second: 'f', secondNote: '\\text{outer}', output: 'f(g(x))' })], 230),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Composite function', md: '$(f \\circ g)(x) = f(g(x))$. The **inner** function $g$ acts first, and its output is the input of the **outer** function $f$.' },
      ],
      lines: [
        { say: 'Think of a function as a machine. You put a number in, the machine follows its rule, and a number comes out.', show: ['m1.in', 'm1.a1', 'm1.box1'] },
        { say: 'Now line up two machines. The number x goes into the first machine, g, and out comes g of x.', show: 'm1.a2', focus: 'm1.a2' },
        { say: 'That output goes straight into the second machine, f. What comes out at the end is f of g of x.', show: ['m1.box2', 'm1.a3', 'm1.out'], focus: 'm1.out' },
        { say: 'This new function is the composite of f and g. We write it with a small circle: f circle g, of x, equals f of g of x.', show: 'def', focus: 'm1' },
        { say: 'The function g is called the inner function, because it sits inside the brackets and acts first. The function f is the outer function, and it acts second.', focus: ['m1.box1', 'm1.box2'] },
      ],
    },
    {
      chapter: 'Evaluating a composition',
      layout: 'center',
      main: [
        figure('m2', [machine({ input: '2', first: 'g', mid: '5', second: 'f', output: '7' })], 170),
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = 2x - 3 \\qquad g(x) = x^2 + 1', 'g(2) = 2^2 + 1 = 5', '(f \\circ g)(2) = f(5) = 2(5) - 3 = 7'] },
      ],
      lines: [
        { say: 'Let’s try it with numbers. Let f of x equal two x minus three, and g of x equal x squared plus one. Find f circle g, of two.', show: 'm.0', focus: 'm.0' },
        { say: 'Always work from the inside out. The inner function is g, so start there. g of two is two squared plus one, which is five.', show: ['m2.in', 'm2.a1', 'm2.box1', 'm2.a2', 'm.1'], focus: ['m.1', 'm2.a2'] },
        { say: 'Now the five goes into f. f of five is two times five, minus three, which is seven.', show: ['m2.box2', 'm2.a3', 'm2.out', 'm.2'], focus: ['m.2', 'm2.out'] },
        { say: 'So f circle g, of two, equals seven.', focus: 'm2.out' },
      ],
    },
    {
      chapter: 'The other order',
      layout: 'center',
      main: [
        figure('m3', [machine({ input: '2', first: 'f', mid: '1', second: 'g', output: '2', tones: ['opp', 'adj'] })], 170),
        { kind: 'math', id: 'm', size: 'md', lines: ['f(2) = 2(2) - 3 = 1', '(g \\circ f)(2) = g(1) = 1^2 + 1 = 2', '(f \\circ g)(2) = 7 \\quad \\text{but} \\quad (g \\circ f)(2) = 2'] },
      ],
      lines: [
        { say: 'Now swap the order. Find g circle f, of two. This time f is the inner function, so f acts first.', show: ['m3.in', 'm3.a1', 'm3.box1'] },
        { say: 'f of two is two times two, minus three, which is one.', show: ['m3.a2', 'm.0'], focus: ['m.0', 'm3.a2'] },
        { say: 'Then g of one is one squared plus one, which is two. So g circle f, of two, equals two.', show: ['m3.box2', 'm3.a3', 'm3.out', 'm.1'], focus: ['m.1', 'm3.out'] },
        { say: 'Compare the two answers: seven one way, and two the other way. The order matters. Composing functions is not like adding or multiplying numbers, where the order makes no difference.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A formula for the composite',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(f \\circ g)(x) = f(\\adj{x^2 + 1})', '= 2(\\adj{x^2 + 1}) - 3', '= 2x^2 - 1'] },
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Substitute the whole inner function', md: 'Replace **every** $x$ in the outer function with the **whole** inner expression, in brackets.' },
      ],
      lines: [
        { say: 'You can also find a formula for a composite function. Start with f circle g, of x, which is f of g of x. The inner function, g of x, is x squared plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'The outer function, f, says: take the input, double it, and subtract three. Here the input is x squared plus one. So replace the x in f with the whole expression, x squared plus one, in brackets.', show: ['m.1', 'tip'], focus: 'm.1' },
        { say: 'Two times the bracket is two x squared plus two, and subtracting three gives two x squared minus one.', show: 'm.2', focus: 'm.2' },
        { say: 'Check it with x equals two. Two times four, minus one, is seven, the same answer as before.', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The other formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['(g \\circ f)(x) = g(\\opp{2x - 3})', '= (\\opp{2x - 3})^2 + 1', '= 4x^2 - 12x + 9 + 1', '= 4x^2 - 12x + 10'] }],
      lines: [
        { say: 'Now g circle f, of x. This time the inner function is f of x, which is two x minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'The outer function, g, squares its input and adds one. So replace the x in g with two x minus three, in brackets: two x minus three, all squared, plus one.', show: 'm.1', focus: 'm.1' },
        { say: 'Expand the square. Two x minus three, times itself, is four x squared, minus twelve x, plus nine. Then add the one.', show: 'm.2', focus: 'm.2' },
        { say: 'So g circle f, of x, is four x squared, minus twelve x, plus ten. Check with x equals two: sixteen, minus 24, plus ten, is two, just as before.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Composition is not multiplication', md: '$(f \\circ g)(x)$ means $f(g(x))$, not $f(x) \\cdot g(x)$. The product $(2x - 3)(x^2 + 1)$ is a different function.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\good{(f \\circ g)(2) = f(g(2)) = 7}', '\\bad{f(2) \\cdot g(2) = (1)(5) = 5}'] },
      ],
      lines: [
        { say: 'A common mistake is to treat the small circle as a multiplication sign. f circle g, of x, means f of g of x: one function inside the other.', show: 'oops' },
        { say: 'It does not mean f of x times g of x. That product, two x minus three, times x squared plus one, is a completely different function.' },
        { say: 'At x equals two, the composition gives seven. But the product gives one times five, which is five. Different functions give different answers.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $f(x) = 3x + 1$ and $g(x) = x^2 - 2$. Find $(f \\circ g)(3)$.',
          choices: ['$98$', '$22$', '$70$', '$17$'],
          answer: 1,
          working: 'Inside first: $g(3) = 3^2 - 2 = 7$. Then $f(7) = 3(7) + 1 = 22$.',
        },
      ],
      lines: [
        { say: 'Your turn. Let f of x equal three x plus one, and g of x equal x squared minus two. Find f circle g, of three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Inside first: g of three is nine minus two, which is seven. Then f of seven is three times seven, plus one, which is 22. Choice A works in the wrong order: f of three is ten, and g of ten is 98.', show: 'q.answer' },
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
          items: ['$(f \\circ g)(x) = f(g(x))$: the inner function $g$ acts first.', 'Work from the inside out. The order matters.', 'For a formula, replace every $x$ in the outer function with the whole inner function.', '$f \\circ g$ is not the product $f \\cdot g$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. f circle g, of x, means f of g of x. The inner function, g, acts first, and its output goes into f.', show: 'sum.0' },
        { say: 'Work from the inside out, and remember that the order matters.', show: 'sum.1' },
        { say: 'To find a formula, replace every x in the outer function with the whole inner function, in brackets.', show: 'sum.2' },
        { say: 'And composing two functions is not the same as multiplying them. In the next part, we run composition backwards, and find the inside and the outside of a function. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
