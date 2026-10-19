import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, numbers, plane, plot, tangent } from './lib/m31-3-graphs.ts';

// f(x) = √(x² + 9) and its tangent at (4, 5), with slope 4/5.
const f = (x: number) => Math.sqrt(x * x + 9);
const g = plane({ x: [-1, 6], y: [0, 8], every: 0, width: 7, height: 7 });
const root = figure('rt', [
  g,
  numbers(g, 1, 1),
  plot(g, { id: 'f', f, tone: 'adj', samples: 200 }),
  tangent(g, { id: 'tan', at: [4, 5], m: 0.8, ext: 3 }),
  dots(g, [{ id: 'P', x: 4, y: 5, tex: '(4, 5)', tone: 'good', place: 'above left' }]),
]);

const video: Explainer = {
  id: 'm31-4-3-c',
  lessonId: 'm31-4-3',
  title: 'The Chain Rule, Part 3: Roots and Reciprocals of Functions',
  thumbnailTitle: 'Roots and Reciprocals with the Chain Rule',
  thumbnail: 'rt',
  summary: 'The general power rule d/dx[g(x)]ⁿ = n[g(x)]ⁿ⁻¹g′(x), used on a root and a reciprocal after rewriting them as powers: f(x) = √(x² + 9) has f′(x) = x/√(x² + 9) and f′(4) = 4/5, and 3/(2x + 1)² = 3(2x + 1)⁻² has derivative −12/(2x + 1)³, faster than with the quotient rule.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 3', title: 'Roots and Reciprocals of Functions', subtitle: 'The general power rule' }],
      lines: [
        { say: 'A square root of a function, or one over a function squared, is still a power of a function. So the chain rule handles it in the same way.', show: 'title' },
        { say: 'In this video, you will meet the general power rule, and use it on a square root and on a reciprocal.' },
      ],
    },
    {
      chapter: 'The general power rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'General power rule', md: 'The chain rule with the power rule: bring the power down, lower it by one, and multiply by the derivative of the inside. Rewrite roots and reciprocals as powers first.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{d}{dx}\\left[g(x)\\right]^{n} = \\opp{n\\left[g(x)\\right]^{n - 1}} \\cdot \\adj{g\'(x)}'] },
      ],
      lines: [
        { say: 'Combine the chain rule with the power rule, and you get the general power rule. The derivative of g of x, to the power n, is n times g of x to the power n minus one, times g prime of x.', show: ['def', 'm'], focus: 'm' },
        { say: 'Bring the power down, lower it by one, keep the inside as it is, and multiply by the derivative of the inside.' },
        { say: 'As with the power rule, rewrite every root and every reciprocal as a power first.' },
      ],
    },
    {
      chapter: 'A root',
      layout: 'split',
      leftWidth: 520,
      left: [root],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $f\'(4)$ for $f(x) = \\sqrt{x^{2} + 9}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['f(x) = (x^{2} + 9)^{1/2}', 'f\'(x) = \\tfrac{1}{2}(x^{2} + 9)^{-1/2}\\cdot 2x', '= \\dfrac{x}{\\sqrt{x^{2} + 9}}', 'f\'(4) = \\dfrac{4}{\\sqrt{25}} = \\good{\\dfrac{4}{5}}'],
        },
      ],
      lines: [
        { say: 'Find f prime of four for f of x equals the square root of x squared plus nine.', show: ['q', 'rt.grid', 'rt.axes', 'rt.f'] },
        { say: 'Rewrite the root as a power: x squared plus nine, to the power one half.', show: 'm.0', focus: 'm.0' },
        { say: 'Bring the one half down, and lower the power by one, to negative one half. Then multiply by the derivative of the inside, x squared plus nine, which is two x.', show: 'm.1', focus: 'm.1' },
        { say: 'One half times two x is x, and the power negative one half means one over a square root. So f prime of x is x over the square root of x squared plus nine.', show: 'm.2', focus: 'm.2' },
        { say: 'At x equals four, that is four over the square root of 25, which is four fifths. On the graph, the tangent at the point at four, five rises four units for every five across.', show: ['m.3', 'rt.P', 'rt.tan'], focus: ['m.3', 'rt.tan'] },
      ],
    },
    {
      chapter: 'A reciprocal',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Differentiate $y = \\dfrac{3}{(2x + 1)^{2}}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 3(2x + 1)^{-2}', '\\dfrac{dy}{dx} = 3(-2)(2x + 1)^{-3}\\cdot 2', '= -12(2x + 1)^{-3} = \\good{-\\dfrac{12}{(2x + 1)^{3}}}'] },
      ],
      lines: [
        { say: 'Now a reciprocal. Differentiate y equals three over two x plus one, all squared.', show: 'q' },
        { say: 'Rewrite it as a power: three times two x plus one, to the power negative two. The three stays in front.', show: 'm.0', focus: 'm.0' },
        { say: 'Bring the negative two down, and lower the power by one: negative two minus one is negative three. Then multiply by the derivative of the inside, which is two.', show: 'm.1', focus: 'm.1' },
        { say: 'Three times negative two times two is negative twelve. So d y by d x is negative twelve over two x plus one, cubed.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Chain rule or quotient rule?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Quotient rule: } \\dfrac{0\\cdot(2x + 1)^{2} - 3\\cdot 2(2x + 1)\\cdot 2}{(2x + 1)^{4}}', '= \\dfrac{-12(2x + 1)}{(2x + 1)^{4}} = -\\dfrac{12}{(2x + 1)^{3}}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Quotient rule or chain rule?', md: 'When the numerator is a constant, the chain rule is faster: $\\dfrac{3}{(2x + 1)^{2}}$ is just $3(2x + 1)^{-2}$.' },
      ],
      lines: [
        { say: 'You could also use the quotient rule here. The top is three, with derivative zero, and the derivative of the bottom needs the chain rule anyway.', show: 'm.0', focus: 'm.0' },
        { say: 'After cancelling a factor of two x plus one, you get the same answer: negative twelve over two x plus one, cubed. But it takes more work.', show: 'm.1', focus: 'm.1' },
        { say: 'So when the numerator is a constant, rewrite the fraction as a negative power, and use the chain rule. It is faster.', show: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the inside of a root', md: 'The chain rule applies to roots too: the derivative of $\\sqrt{x^{2} + 9}$ needs the factor $2x$ from the inside.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{d}{dx}\\sqrt{x^{2} + 9} = \\dfrac{1}{2\\sqrt{x^{2} + 9}}}', '\\good{\\dfrac{d}{dx}\\sqrt{x^{2} + 9} = \\dfrac{1}{2\\sqrt{x^{2} + 9}} \\cdot 2x}'] },
      ],
      lines: [
        { say: 'With roots, it is easy to forget the inside. You may remember that the derivative of root x is one over two root x, and write one over two root, x squared plus nine.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But here the inside is x squared plus nine, not x. So you must multiply by its derivative, two x.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Differentiate $y = \\sqrt{4x + 1}$.',
          choices: ['$\\dfrac{1}{2\\sqrt{4x + 1}}$', '$\\dfrac{4}{\\sqrt{4x + 1}}$', '$\\dfrac{2}{\\sqrt{4x + 1}}$', '$2\\sqrt{4x + 1}$'],
          answer: 2,
          working: '$y = (4x + 1)^{1/2}$, so $\\dfrac{dy}{dx} = \\tfrac{1}{2}(4x + 1)^{-1/2}\\cdot 4 = \\dfrac{2}{\\sqrt{4x + 1}}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Differentiate y equals the square root of four x plus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Write y as four x plus one, to the one half. The derivative is one half times four x plus one, to the negative one half, times four, which is two over the square root of four x plus one. Choice A forgets to multiply by four, the derivative of the inside.', show: 'q.answer' },
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
          items: [
            'General power rule: $\\dfrac{d}{dx}\\left[g(x)\\right]^{n} = n\\left[g(x)\\right]^{n - 1}g\'(x)$.',
            'Rewrite roots and reciprocals as powers first.',
            'With a constant numerator, the chain rule is faster than the quotient rule.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The general power rule: the derivative of g of x to the n is n times g of x to the n minus one, times g prime of x.', show: 'sum.0' },
        { say: 'Rewrite roots and reciprocals as powers first.', show: 'sum.1' },
        { say: 'And when the numerator is a constant, the chain rule is faster than the quotient rule. In the next part, we combine the chain rule with the product rule. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
