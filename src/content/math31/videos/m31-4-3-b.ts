import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-4-3-b',
  lessonId: 'm31-4-3',
  title: 'The Chain Rule, Part 2: Using the Chain Rule',
  thumbnailTitle: 'Using the Chain Rule',
  thumbnail: false,
  summary: 'Using the chain rule step by step on powers of polynomials: y = (3x² + 1)⁴ has dy/dx = 4(3x² + 1)³ · 6x = 24x(3x² + 1)³, and (2x + 1)¹⁰ has derivative 20(2x + 1)⁹. A check on (2x + 1)² by expanding, and why forgetting the derivative of the inside function is wrong.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 2', title: 'Using the Chain Rule', subtitle: 'Outside, then inside' }],
      lines: [
        { say: 'The chain rule turns a page of expanding into a line or two. The key is to see clearly which function is inside, and which is outside.', show: 'title' },
        { say: 'In this video, you will differentiate powers of polynomials with the chain rule, check the method, and see the most common chain rule mistake.' },
      ],
    },
    {
      chapter: 'A power of a polynomial',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Differentiate $y = (3x^{2} + 1)^{4}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{inside: } u = 3x^{2} + 1, \\qquad \\dfrac{du}{dx} = \\adj{6x}',
            '\\text{outside: } y = u^{4}, \\qquad \\dfrac{dy}{du} = \\opp{4u^{3}}',
            '\\dfrac{dy}{dx} = \\opp{4(3x^{2} + 1)^{3}} \\cdot \\adj{6x}',
            '= \\good{24x(3x^{2} + 1)^{3}}',
          ],
        },
      ],
      lines: [
        { say: 'Differentiate y equals three x squared plus one, all to the fourth.', show: 'q' },
        { say: 'The inside function is u equals three x squared plus one. Its derivative, d u by d x, is six x.', show: 'm.0', focus: 'm.0' },
        { say: 'The outside function is y equals u to the fourth. Its derivative, d y by d u, is four u cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply them, and put the inside back in for u: four times three x squared plus one, cubed, times six x.', show: 'm.2', focus: 'm.2' },
        { say: 'Tidy up by multiplying the numbers in front: four times six x is 24 x. So d y by d x is 24 x, times three x squared plus one, cubed.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A tenth power',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Differentiate $y = (2x + 1)^{10}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{dy}{dx} = \\opp{10(2x + 1)^{9}} \\cdot \\adj{2}', '= \\good{20(2x + 1)^{9}}'] },
      ],
      lines: [
        { say: 'Now the function from the start: two x plus one, all to the tenth. No need to expand ten brackets.', show: 'q' },
        { say: 'Differentiate the outside power, leaving the inside alone: ten times two x plus one, to the ninth. Then multiply by the derivative of the inside, two x plus one, which is two.', show: 'm.0', focus: 'm.0' },
        { say: 'So the derivative is twenty times two x plus one, to the ninth. Two lines, instead of pages of algebra.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A check',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Check the method on $y = (2x + 1)^{2}$, which is small enough to expand.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{Expand: } y = 4x^{2} + 4x + 1, \\qquad \\dfrac{dy}{dx} = 8x + 4', '\\text{Chain rule: } \\dfrac{dy}{dx} = 2(2x + 1)\\cdot 2 = 8x + 4 \\;\\checkmark'],
        },
      ],
      lines: [
        { say: 'Let’s check that the method is right, on a power small enough to expand: two x plus one, all squared.', show: 'q' },
        { say: 'Expanded, it is four x squared, plus four x, plus one. By the power rule, the derivative is eight x plus four.', show: 'm.0', focus: 'm.0' },
        { say: 'By the chain rule: two times two x plus one, times the derivative of the inside, two. That is four times two x plus one, which is eight x plus four. The two methods agree.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the inside', md: 'Differentiating only the outside treats the inside as if it were just $x$. The factor from the inside function is the whole point of the chain rule.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\bad{\\dfrac{d}{dx}(3x^{2} + 1)^{4} = 4(3x^{2} + 1)^{3}}', '\\bad{\\dfrac{d}{dx}(2x + 1)^{2} = 2(2x + 1) = 4x + 2 \\ne 8x + 4}'],
        },
      ],
      lines: [
        { say: 'The most common chain rule mistake is to forget the inside. For three x squared plus one, all to the fourth, the answer four times three x squared plus one, cubed, is wrong.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'It treats the inside as if it were just x. But the inside changes six x times as fast as x, and that factor must be multiplied in.' },
        { say: 'The check shows it too. Forgetting the inside for two x plus one, all squared, gives four x plus two: only half of the right answer, eight x plus four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Differentiate $y = (x^{2} - 5)^{3}$.',
          choices: ['$3(x^{2} - 5)^{2}$', '$6x(x^{2} - 5)^{2}$', '$3(2x)^{2}$', '$6x(x^{2} - 5)^{3}$'],
          answer: 1,
          working: 'Outside: $3(x^{2} - 5)^{2}$. Inside: $\\dfrac{d}{dx}(x^{2} - 5) = 2x$. So $\\dfrac{dy}{dx} = 3(x^{2} - 5)^{2}\\cdot 2x = 6x(x^{2} - 5)^{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Differentiate y equals x squared minus five, all cubed. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The outside gives three times x squared minus five, squared, and the inside has derivative two x. Multiplied: six x times x squared minus five, squared. Choice A forgets the derivative of the inside.', show: 'q.answer' },
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
          items: ['Name the inside function $u$ and the outside function.', 'Differentiate the outside, keep the inside, then multiply by $\\dfrac{du}{dx}$.', 'Never forget the derivative of the inside.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. First, name the inside function, u, and the outside function.', show: 'sum.0' },
        { say: 'Differentiate the outside, keeping the inside as it is, then multiply by the derivative of the inside.', show: 'sum.1' },
        { say: 'And never forget the derivative of the inside. In the next part, we use the chain rule on roots and reciprocals of functions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
