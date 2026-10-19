import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-4-1-c',
  lessonId: 'm31-4-1',
  title: 'The Power, Constant and Sum Rules, Part 3: Constant Multiples and Sums',
  thumbnailTitle: 'Constant Multiple and Sum Rules',
  thumbnail: false,
  summary: 'The constant multiple rule (a constant factor stays in front) and the sum and difference rules (differentiate term by term), why they follow from the limit laws, and using them with the power rule on f(x) = 4x⁵ − 3x³ + 7x − 9 to get f′(x) = 20x⁴ − 9x² + 7 and f′(1) = 18. The notations f′(x), y′, dy/dx and d/dx f(x), and why a constant factor stays while a constant term vanishes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 3', title: 'Constant Multiples and Sums', subtitle: 'Differentiating a polynomial term by term' }],
      lines: [
        { say: 'Most functions are built from several powers of x, multiplied by numbers and added together. Two more rules handle them.', show: 'title' },
        { say: 'In this video, you will meet the constant multiple rule and the sum rule, and use them to differentiate any polynomial, term by term.' },
      ],
    },
    {
      chapter: 'Two rules',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Constant multiple and sum rules', md: 'A constant factor stays in front of the derivative, and a sum or difference is differentiated term by term.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{d}{dx}\\left[c\\,f(x)\\right] = c\\,f\'(x)', '\\dfrac{d}{dx}\\left[f(x) \\pm g(x)\\right] = f\'(x) \\pm g\'(x)'] },
      ],
      lines: [
        { say: 'The constant multiple rule says: the derivative of c times f of x is c times f prime of x. A constant factor simply stays in front.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'For example, the derivative of five x cubed is five times three x squared, which is fifteen x squared.' },
        { say: 'The sum rule says: the derivative of f of x plus g of x is f prime of x plus g prime of x. The same goes for a difference. So you can differentiate a sum one term at a time.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Why they work',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{c\\,f(x + h) - c\\,f(x)}{h} = c \\cdot \\dfrac{f(x + h) - f(x)}{h} \\;\\to\\; c\\,f\'(x)',
            '\\dfrac{\\left[f(x + h) + g(x + h)\\right] - \\left[f(x) + g(x)\\right]}{h}',
            '= \\dfrac{f(x + h) - f(x)}{h} + \\dfrac{g(x + h) - g(x)}{h} \\;\\to\\; f\'(x) + g\'(x)',
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The limit laws', md: 'A constant factor comes out of a limit, and the limit of a sum is the sum of the limits.' },
      ],
      lines: [
        { say: 'Both rules come straight from the limit definition. For c times f, the c can be factored out of the difference quotient.', show: 'm.0', focus: 'm.0' },
        { say: 'A constant factor comes out of a limit, so the limit is c times f prime of x. On a graph, stretching a curve upward by a factor of c makes every slope c times as steep.' },
        { say: 'For a sum, the difference quotient splits into two difference quotients, one for f and one for g. The limit of a sum is the sum of the limits, so the derivative is f prime plus g prime.', show: ['m.1', 'm.2', 'key'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'A polynomial',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Find $f\'(x)$ for $f(x) = 4x^5 - 3x^3 + 7x - 9$, then find $f\'(1)$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['f\'(x) = 4\\left(5x^4\\right) - 3\\left(3x^2\\right) + 7(1) - 0', '= \\good{20x^4 - 9x^2 + 7}', 'f\'(1) = 20 - 9 + 7 = \\good{18}'],
        },
      ],
      lines: [
        { say: 'Find f prime of x for f of x equals four x to the fifth, minus three x cubed, plus seven x, minus nine. Then find f prime of one.', show: 'q' },
        { say: 'Differentiate term by term. Four x to the fifth becomes four times five x to the fourth. Three x cubed becomes three times three x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Seven x becomes seven times one, and the constant nine has derivative zero.' },
        { say: 'Simplify: f prime of x equals twenty x to the fourth, minus nine x squared, plus seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Now substitute one. Twenty minus nine plus seven is eighteen. So the slope of the tangent at x equals one is eighteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Notation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Notation', md: 'These all mean the same thing: $f\'(x)$, $y\'$, $\\dfrac{dy}{dx}$ and $\\dfrac{d}{dx}f(x)$. Use $\\dfrac{dy}{dx}$ when the function is written $y = \\dots$' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = 2x^3 - x + 6', '\\dfrac{dy}{dx} = 6x^2 - 1'] },
      ],
      lines: [
        { say: 'A note on notation. f prime of x, y prime, d y by d x, and d by d x of f of x all mean the same thing.', show: 'tip' },
        { say: 'When a function is written y equals something, use d y by d x. For y equals two x cubed, minus x, plus six, d y by d x equals six x squared minus one.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Factors stay, terms vanish', md: 'A constant **factor** stays in front: $4x^5 \\to 4(5x^4)$. A constant **term** has derivative $0$: $-9 \\to 0$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{d}{dx}\\left(4x^5 - 9\\right) = 5x^4 - 9}', '\\good{\\dfrac{d}{dx}\\left(4x^5 - 9\\right) = 20x^4}'] },
      ],
      lines: [
        { say: 'Do not mix up constant factors and constant terms. A common mistake is to drop the four from four x to the fifth, but keep the minus nine.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'It is the other way round. The four multiplies x to the fifth, so it stays in front: four times five x to the fourth is twenty x to the fourth.' },
        { say: 'The nine is added on its own. It shifts the graph down without changing its slope, so its derivative is zero, and it disappears.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $f\'(x)$ for $f(x) = 3x^4 - 5x^2 + 2x - 8$.',
          choices: ['$12x^3 - 10x$', '$12x^3 - 10x + 2$', '$4x^3 - 2x + 1$', '$12x^3 - 10x - 6$'],
          answer: 1,
          working: '$f\'(x) = 3\\left(4x^3\\right) - 5(2x) + 2(1) - 0 = 12x^3 - 10x + 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find f prime of x for f of x equals three x to the fourth, minus five x squared, plus two x, minus eight. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Three times four x cubed is twelve x cubed, five times two x is ten x, two x has derivative two, and eight has derivative zero. Choice C forgets to multiply by the coefficients.', show: 'q.answer' },
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
            'A constant factor stays in front: $\\dfrac{d}{dx}\\left[c\\,f(x)\\right] = c\\,f\'(x)$.',
            'A sum or difference is differentiated term by term.',
            'A constant term has derivative $0$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A constant factor stays in front of the derivative.', show: 'sum.0' },
        { say: 'A sum or a difference is differentiated term by term.', show: 'sum.1' },
        { say: 'And a constant term has derivative zero. In the next part, we differentiate roots and reciprocals, by rewriting them as powers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
