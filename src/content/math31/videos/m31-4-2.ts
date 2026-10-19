import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { growingRectangle } from './lib/m31-4-figures.ts';

// A rectangle u by v growing by Δu and Δv: the new area is uv + vΔu + uΔv + ΔuΔv.
const rect = figure('gr', [growingRectangle({ w: 3.7, h: 2.6, dw: 1.3, dh: 0.75 })]);

const video: Explainer = {
  id: 'm31-4-2',
  lessonId: 'm31-4-2',
  title: 'The Product and Quotient Rules, Part 1: The Product Rule',
  thumbnailTitle: 'The Product Rule',
  thumbnail: 'gr',
  summary: 'The derivative of a product is not the product of the derivatives (x · x = x² has derivative 2x, not 1). The product rule (uv)′ = u′v + uv′, why it works, seen as a rectangle of sides u and v whose area grows by two strips and a tiny corner, and its proof from the limit definition by adding and subtracting f(x + h)g(x).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 1', title: 'The Product Rule', subtitle: 'Differentiating two functions multiplied together' }],
      lines: [
        { say: 'You can differentiate a sum term by term. Can you differentiate a product factor by factor? It turns out that you cannot.', show: 'title' },
        { say: 'In this video, you will meet the product rule, and see why it works, using a growing rectangle.' },
      ],
    },
    {
      chapter: 'Not factor by factor',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x \\cdot x = x^2, \\qquad \\dfrac{d}{dx}\\left(x^2\\right) = \\good{2x}', '\\dfrac{d}{dx}(x) \\cdot \\dfrac{d}{dx}(x) = 1 \\cdot 1 = \\bad{1}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Products need their own rule', md: 'The derivative of a product is **not** the product of the derivatives.' },
      ],
      lines: [
        { say: 'Try a simple product: x times x, which is x squared. By the power rule, its derivative is two x.', show: 'm.0', focus: 'm.0' },
        { say: 'Now multiply the derivatives of the factors instead. The derivative of x is one, and one times one is one. That is not two x.', show: 'm.1', focus: 'm.1' },
        { say: 'So the derivative of a product is not the product of the derivatives. Products need a rule of their own.', show: 'key' },
      ],
    },
    {
      chapter: 'The product rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Product rule', md: 'If $f$ and $g$ are differentiable, then the derivative of $f(x)g(x)$ is $f\'(x)g(x) + f(x)g\'(x)$. With $u = f(x)$ and $v = g(x)$:' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{d}{dx}\\left[f(x)g(x)\\right] = f\'(x)g(x) + f(x)g\'(x)', '(uv)\' = \\opp{u\'}v + u\\adj{v\'}'] },
      ],
      lines: [
        { say: 'Here is the product rule. The derivative of f of x times g of x is f prime of x times g of x, plus f of x times g prime of x.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'With shorter names, u and v for the two factors: the derivative of u v is u prime v, plus u v prime.', show: 'm.1', focus: 'm.1' },
        { say: 'Each term differentiates one factor and keeps the other one as it is. First, differentiate u and keep v. Then keep u and differentiate v. Add the two.' },
        { say: 'Check it on x times x. u prime v is one times x, and u v prime is x times one. Together they make two x, which is right.' },
      ],
    },
    {
      chapter: 'A growing rectangle',
      layout: 'split',
      leftWidth: 500,
      left: [rect],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['A = uv', '\\Delta A = \\opp{v\\,\\Delta u} + \\adj{u\\,\\Delta v} + \\bad{\\Delta u\\,\\Delta v}', '\\dfrac{\\Delta A}{\\Delta x} = v\\dfrac{\\Delta u}{\\Delta x} + u\\dfrac{\\Delta v}{\\Delta x} + \\Delta u\\dfrac{\\Delta v}{\\Delta x}', '\\to\\; vu\' + uv\' + 0'],
        },
      ],
      lines: [
        { say: 'Here is why the rule works. Picture u and v as the sides of a rectangle, so its area is u times v.', show: ['gr.base', 'm.0'], focus: 'm.0' },
        { say: 'When x changes a little, u grows by a small amount, delta u, and v grows by delta v.' },
        { say: 'The new rectangle is the old one, plus a strip down the right side, v times delta u, plus a strip along the top, u times delta v, plus a tiny corner, delta u times delta v.', show: ['gr.right', 'gr.top', 'gr.corner', 'm.1'], focus: 'm.1' },
        { say: 'Divide the change in area by delta x. That gives v times delta u over delta x, plus u times delta v over delta x, plus delta u times delta v over delta x.', show: 'm.2', focus: 'm.2' },
        { say: 'As delta x approaches zero, delta u over delta x becomes u prime, and delta v over delta x becomes v prime. The corner term vanishes, because delta u itself shrinks to zero.', show: 'm.3', focus: 'm.3' },
        { say: 'So the rate of change of the area is v u prime, plus u v prime: just the two strips. That is the product rule.', focus: ['gr.right', 'gr.top'] },
      ],
    },
    {
      chapter: 'The proof',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{f(x + h)g(x + h) - f(x)g(x)}{h}',
            '\\text{subtract and add } \\opp{f(x + h)g(x)} \\text{ on the top}',
            '= f(x + h)\\cdot\\dfrac{g(x + h) - g(x)}{h} + g(x)\\cdot\\dfrac{f(x + h) - f(x)}{h}',
            '\\to\\; f(x)g\'(x) + g(x)f\'(x)',
          ],
        },
      ],
      lines: [
        { say: 'Here is the proof from the limit definition. Start with the difference quotient of the product f times g.', show: 'm.0', focus: 'm.0' },
        { say: 'The trick is to subtract and then add the same term, f of x plus h, times g of x. Together they add up to zero, so nothing changes.', show: 'm.1', focus: 'm.1' },
        { say: 'Now group the four terms on the top into two pairs. The first pair has the common factor f of x plus h, and the second pair has the common factor g of x. Factor them out, and split the fraction in two.', show: 'm.2', focus: 'm.2' },
        { say: 'As h approaches zero, the two difference quotients approach g prime of x and f prime of x. And f of x plus h approaches f of x, because a differentiable function is continuous.', show: 'm.3', focus: 'm.3' },
        { say: 'So the limit is f of x times g prime of x, plus g of x times f prime of x: the product rule.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $u = x^3$ and $v = x^2$. Use the product rule to find the derivative of $uv$.',
          choices: ['$6x^3$', '$3x^2 + 2x$', '$x^5$', '$5x^4$'],
          answer: 3,
          working: '$u\' = 3x^2$ and $v\' = 2x$, so $(uv)\' = 3x^2 \\cdot x^2 + x^3 \\cdot 2x = 3x^4 + 2x^4 = 5x^4$, which matches the power rule for $x^5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Let u equal x cubed and v equal x squared. Use the product rule to find the derivative of u v. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. u prime v is three x squared times x squared, which is three x to the fourth. u v prime is x cubed times two x, which is two x to the fourth. Together, five x to the fourth: the derivative of x to the fifth. Choice A multiplies the two derivatives.', show: 'q.answer' },
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
          items: ['The derivative of a product is not the product of the derivatives.', 'Product rule: $(uv)\' = u\'v + uv\'$.', 'Each term differentiates one factor and keeps the other.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The derivative of a product is not the product of the derivatives.', show: 'sum.0' },
        { say: 'The product rule says the derivative of u v is u prime v, plus u v prime.', show: 'sum.1' },
        { say: 'Each term differentiates one factor, and keeps the other. In the next part, we use the product rule on some examples. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
