import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-4-2-b',
  lessonId: 'm31-4-2',
  title: 'The Product and Quotient Rules, Part 2: Using the Product Rule',
  thumbnailTitle: 'Using the Product Rule',
  thumbnail: false,
  summary: 'Using the product rule step by step: for f(x) = (2x + 3)(x² − 1), name u and v, find u′ and v′, substitute and expand to get 6x² + 6x − 2, then check by expanding first. Why u′v′ = 4x is wrong, and differentiating √x(4x − 1) to get (12x − 1)/(2√x) by writing both terms over a common denominator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 2', title: 'Using the Product Rule', subtitle: 'Name the parts, then substitute' }],
      lines: [
        { say: 'The product rule is easiest to use with a routine: name the two factors, find their derivatives, and then substitute into the rule.', show: 'title' },
        { say: 'In this video, you will use the product rule on a product of polynomials, check the answer by expanding, and use the rule on a product with a square root.' },
      ],
    },
    {
      chapter: 'Name the parts',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Differentiate $f(x) = (2x + 3)(x^{2} - 1)$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'u = 2x + 3 \\qquad v = x^{2} - 1',
            'u\' = 2 \\qquad\\qquad v\' = 2x',
            'f\'(x) = u\'v + uv\' = 2(x^{2} - 1) + (2x + 3)(2x)',
            '= 2x^{2} - 2 + 4x^{2} + 6x = \\good{6x^{2} + 6x - 2}',
          ],
        },
      ],
      lines: [
        { say: 'Differentiate f of x equals two x plus three, times x squared minus one.', show: 'q' },
        { say: 'First, name the factors. Let u be two x plus three, and v be x squared minus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, find their derivatives. u prime is two, and v prime is two x. Writing all four pieces down first keeps the work tidy.', show: 'm.1', focus: 'm.1' },
        { say: 'Now substitute into u prime v plus u v prime: two times x squared minus one, plus two x plus three, times two x.', show: 'm.2', focus: 'm.2' },
        { say: 'Expand: two x squared minus two, plus four x squared plus six x. Collect like terms: six x squared, plus six x, minus two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check by expanding',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = (2x + 3)(x^{2} - 1) = 2x^{3} + 3x^{2} - 2x - 3', 'f\'(x) = \\good{6x^{2} + 6x - 2} \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'When the product rule matters', md: 'For two polynomials you can expand first. The product rule matters when expanding is impossible or painful: with roots, and later with trigonometric and exponential functions.' },
      ],
      lines: [
        { say: 'Check the answer another way. Expand the product first: two x cubed, plus three x squared, minus two x, minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'The power rule gives six x squared, plus six x, minus two. The same answer.', show: 'm.1', focus: 'm.1' },
        { say: 'For two polynomials, expanding first works well. The product rule really matters when expanding is impossible or painful: with roots, and later with trigonometric and exponential functions.', show: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying the derivatives', md: '$(uv)\' \\ne u\'v\'$. Each term of the product rule differentiates **one** factor and keeps the other.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{u\'v\' = 2(2x) = 4x}', '\\good{u\'v + uv\' = 6x^{2} + 6x - 2}'] },
      ],
      lines: [
        { say: 'The most common mistake with products is to multiply the two derivatives. For this example, u prime times v prime is two times two x, which is four x.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'That is wrong, as the check by expanding shows. Each term of the product rule differentiates only one factor, and keeps the other one whole.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A product with a root',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Differentiate $f(x) = \\sqrt{x}\\,(4x - 1)$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'u = \\sqrt{x}, \\quad u\' = \\dfrac{1}{2\\sqrt{x}} \\qquad v = 4x - 1, \\quad v\' = 4',
            'f\'(x) = \\dfrac{4x - 1}{2\\sqrt{x}} + 4\\sqrt{x}',
            '= \\dfrac{4x - 1}{2\\sqrt{x}} + \\dfrac{8x}{2\\sqrt{x}} = \\good{\\dfrac{12x - 1}{2\\sqrt{x}}}',
          ],
        },
      ],
      lines: [
        { say: 'Now a product with a root. Differentiate f of x equals root x, times four x minus one.', show: 'q' },
        { say: 'Let u be root x. Its derivative is one over two root x. Let v be four x minus one, with derivative four.', show: 'm.0', focus: 'm.0' },
        { say: 'u prime v is four x minus one, over two root x. And u v prime is root x times four, which is four root x.', show: 'm.1', focus: 'm.1' },
        { say: 'To add them, write four root x over the same denominator, two root x. Multiply its top and bottom by two root x: the top becomes eight x, because root x times root x is x.', show: 'm.2', focus: 'm.2' },
        { say: 'Add the tops: four x minus one plus eight x is twelve x minus one. So f prime of x is twelve x minus one, over two root x.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use the product rule to differentiate $f(x) = (x + 4)(3x - 2)$.',
          choices: ['$6x + 10$', '$3$', '$6x + 14$', '$3x^{2} + 10x - 8$'],
          answer: 0,
          working: '$u = x + 4$, $u\' = 1$, $v = 3x - 2$, $v\' = 3$. So $f\'(x) = 1(3x - 2) + (x + 4)(3) = 3x - 2 + 3x + 12 = 6x + 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use the product rule to differentiate f of x equals x plus four, times three x minus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. u prime v is one times three x minus two, and u v prime is x plus four, times three. That is three x minus two, plus three x plus twelve, which is six x plus ten. Choice B multiplies the two derivatives, one and three.', show: 'q.answer' },
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
          items: ['Write $u$, $v$, $u\'$ and $v\'$ first, then substitute into $u\'v + uv\'$.', 'Simplify by expanding, or over a common denominator.', 'Never multiply the two derivatives.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Write down u, v, u prime and v prime first, then substitute into u prime v plus u v prime.', show: 'sum.0' },
        { say: 'Simplify by expanding and collecting like terms, or over a common denominator.', show: 'sum.1' },
        { say: 'And never multiply the two derivatives. In the next part, we meet the rule for quotients. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
