import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-4-2-c',
  lessonId: 'm31-4-2',
  title: 'The Product and Quotient Rules, Part 3: The Quotient Rule',
  thumbnailTitle: 'The Quotient Rule',
  thumbnail: false,
  summary: 'The quotient rule (u/v)′ = (u′v − uv′)/v², where it comes from (write u = qv and use the product rule), differentiating (2x + 1)/(x − 3) to get −7/(x − 3)², and why the order in the numerator matters, with the memory aid "low d-high minus high d-low, over the square of what’s below".',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 3', title: 'The Quotient Rule', subtitle: 'Differentiating one function divided by another' }],
      lines: [
        { say: 'Many functions are fractions: one function divided by another. Splitting the fraction into powers works only sometimes. The quotient rule always works.', show: 'title' },
        { say: 'In this video, you will meet the quotient rule, see where it comes from, and use it to differentiate a fraction.' },
      ],
    },
    {
      chapter: 'The quotient rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Quotient rule', md: 'If $f$ and $g$ are differentiable and $g(x) \\ne 0$, then the derivative of $\\dfrac{f(x)}{g(x)}$ is below. With $u = f(x)$ on the top and $v = g(x)$ on the bottom:' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{d}{dx}\\left[\\dfrac{f(x)}{g(x)}\\right] = \\dfrac{f\'(x)g(x) - f(x)g\'(x)}{\\left[g(x)\\right]^2}', '\\left(\\dfrac{u}{v}\\right)\' = \\dfrac{u\'v - uv\'}{v^2}'] },
      ],
      lines: [
        { say: 'Here is the quotient rule. The derivative of f of x over g of x is f prime of x times g of x, minus f of x times g prime of x, all over g of x, squared.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'With u on the top and v on the bottom: the derivative of u over v is u prime v, minus u v prime, all over v squared.', show: 'm.1', focus: 'm.1' },
        { say: 'It looks like the product rule, with two differences. The top is a difference, not a sum. And there is a bottom: the denominator, squared. It only works where the denominator is not zero.' },
      ],
    },
    {
      chapter: 'Where it comes from',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'q = \\dfrac{u}{v} \\;\\Rightarrow\\; u = qv',
            'u\' = q\'v + qv\'',
            'q\' = \\dfrac{u\' - qv\'}{v} = \\dfrac{u\' - \\frac{u}{v}v\'}{v}',
            '= \\dfrac{u\'v - uv\'}{v^2}',
          ],
        },
      ],
      lines: [
        { say: 'The quotient rule comes from the product rule. Call the quotient q, so q equals u over v. Then u equals q times v.', show: 'm.0', focus: 'm.0' },
        { say: 'Differentiate both sides with the product rule: u prime equals q prime v, plus q v prime.', show: 'm.1', focus: 'm.1' },
        { say: 'Solve for q prime. Subtract q v prime, and divide by v. Then replace q with u over v.', show: 'm.2', focus: 'm.2' },
        { say: 'Finally, multiply the top and the bottom by v, to clear the small fraction. That gives u prime v, minus u v prime, over v squared.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A quotient of linear functions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Differentiate $f(x) = \\dfrac{2x + 1}{x - 3}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'u = 2x + 1, \\quad u\' = 2 \\qquad v = x - 3, \\quad v\' = 1',
            'f\'(x) = \\dfrac{2(x - 3) - (2x + 1)(1)}{(x - 3)^{2}}',
            '= \\dfrac{2x - 6 - 2x - 1}{(x - 3)^{2}} = \\good{-\\dfrac{7}{(x - 3)^{2}}}',
          ],
        },
      ],
      lines: [
        { say: 'Differentiate f of x equals two x plus one, over x minus three.', show: 'q' },
        { say: 'The top is u equals two x plus one, with u prime equals two. The bottom is v equals x minus three, with v prime equals one.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute: two times x minus three, minus two x plus one, times one, all over x minus three, squared. Keep two x plus one in brackets, because the minus sign applies to all of it.', show: 'm.1', focus: 'm.1' },
        { say: 'Expand the top: two x minus six, minus two x, minus one. The x terms cancel, leaving negative seven. So f prime of x is negative seven over x minus three, squared.', show: 'm.2', focus: 'm.2' },
        { say: 'A square is never negative, so this derivative is negative wherever it exists. The graph falls everywhere, except at x equals three, where the function is not defined.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The order matters', md: 'The numerator is a difference, so it is $u\'v - uv\'$, **not** $uv\' - u\'v$. Reversing it changes the sign of the answer. A memory aid: "low d-high minus high d-low, over the square of what’s below."' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{(2x + 1)(1) - 2(x - 3)}{(x - 3)^{2}} = \\dfrac{7}{(x - 3)^{2}}}'] },
      ],
      lines: [
        { say: 'In the product rule, the order does not matter, because you add. In the quotient rule, you subtract, so the order matters.', show: 'oops' },
        { say: 'If you write u v prime minus u prime v instead, you get positive seven over x minus three, squared: the right size, but the wrong sign.', show: 'm.0', focus: 'm.0' },
        { say: 'Here is a memory aid. Call the top high, and the bottom low. Then the rule is: low, d high, minus high, d low, over the square of what is below.' },
        { say: 'Low, d high means the bottom times the derivative of the top. That always comes first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Differentiate $f(x) = \\dfrac{x}{x + 2}$.',
          choices: ['$\\dfrac{-2}{(x + 2)^{2}}$', '$1$', '$\\dfrac{2}{(x + 2)^{2}}$', '$\\dfrac{2x + 2}{(x + 2)^{2}}$'],
          answer: 2,
          working: '$u = x$, $u\' = 1$, $v = x + 2$, $v\' = 1$. So $f\'(x) = \\dfrac{1(x + 2) - x(1)}{(x + 2)^{2}} = \\dfrac{2}{(x + 2)^{2}}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Differentiate f of x equals x over x plus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Low, d high is x plus two, times one. High, d low is x times one. The top is x plus two, minus x, which is two, so f prime of x is two over x plus two, squared. Choice A has the top in the wrong order, which flips the sign.', show: 'q.answer' },
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
          items: ['Quotient rule: $\\left(\\dfrac{u}{v}\\right)\' = \\dfrac{u\'v - uv\'}{v^2}$.', 'The order in the numerator matters: low d-high minus high d-low.', 'Keep the top and the bottom in brackets when you substitute.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The derivative of u over v is u prime v, minus u v prime, all over v squared.', show: 'sum.0' },
        { say: 'The order in the numerator matters: low, d high, minus high, d low.', show: 'sum.1' },
        { say: 'And keep the top and the bottom in brackets when you substitute. In the next part, we use the product and quotient rules with a table of values. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
