import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-4-3-d',
  lessonId: 'm31-4-3',
  title: 'The Chain Rule, Part 4: Combining the Rules',
  thumbnailTitle: 'Combining the Rules',
  thumbnail: false,
  summary: 'Deciding what a function is as a whole (a product, a quotient or a composition) and working inward: f(x) = x²(3x − 1)⁴ is a product whose second factor needs the chain rule, giving 2x(3x − 1)⁴ + 12x²(3x − 1)³, which factors to 2x(3x − 1)³(9x − 1); and why the chain rule inside a product is easy to forget.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 4', title: 'Combining the Rules', subtitle: 'Decide what the function is as a whole' }],
      lines: [
        { say: 'Most functions need more than one rule. A product might have a power inside it, or a quotient might have a root on top.', show: 'title' },
        { say: 'In this video, you will decide which rule comes first, combine the product rule with the chain rule, and factor the answer.' },
      ],
    },
    {
      chapter: 'What is it as a whole?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Function', 'As a whole', 'First rule'],
          rows: [
            ['$x^{2}(3x - 1)^{4}$', 'a product', 'product rule'],
            ['$\\dfrac{x^{2}}{x + 5}$', 'a quotient', 'quotient rule'],
            ['$\\left(x^{2} + 1\\right)^{5}$', 'a power of a function', 'chain rule'],
          ],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Work inward', md: 'Ask what you would do **last** to work out the function for a number. That operation decides the first rule. Use other rules for the pieces inside it.' },
      ],
      lines: [
        { say: 'To choose a rule, decide what the function is as a whole. Ask yourself: if I worked it out for a number, what would I do last?', show: 'key' },
        { say: 'For x squared times three x minus one, to the fourth, the last step is multiplying two factors. So, as a whole, it is a product, and the product rule comes first.', show: 't.0', focus: 't.0' },
        { say: 'For x squared over x plus five, the last step is dividing, so it is a quotient. And for x squared plus one, to the fifth, the last step is raising to a power, so the chain rule comes first.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Then work inward. Each piece may need a rule of its own.' },
      ],
    },
    {
      chapter: 'A product with a chain inside',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Differentiate $f(x) = x^{2}(3x - 1)^{4}$.' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'u = x^{2}, \\quad u\' = 2x',
            'v = (3x - 1)^{4}, \\quad v\' = 4(3x - 1)^{3}\\cdot 3 = 12(3x - 1)^{3}',
            'f\'(x) = u\'v + uv\' = 2x(3x - 1)^{4} + x^{2}\\cdot 12(3x - 1)^{3}',
            '= 2x(3x - 1)^{4} + 12x^{2}(3x - 1)^{3}',
          ],
        },
      ],
      lines: [
        { say: 'Differentiate f of x equals x squared, times three x minus one, to the fourth. As a whole, it is a product. So let u be x squared, and v be three x minus one, to the fourth.', show: 'q' },
        { say: 'u prime is two x, by the power rule.', show: 'm.0', focus: 'm.0' },
        { say: 'v is a power of a function, so v prime needs the chain rule: four times three x minus one, cubed, times the derivative of the inside, three. That is twelve times three x minus one, cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the product rule: u prime v plus u v prime. That is two x times three x minus one, to the fourth, plus x squared times twelve times three x minus one, cubed.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Factoring the answer',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f\'(x) = \\opp{2x(3x - 1)^{3}}\\,(3x - 1) + \\opp{2x(3x - 1)^{3}}\\,(6x)',
            '= 2x(3x - 1)^{3}\\left[(3x - 1) + 6x\\right]',
            '= \\good{2x(3x - 1)^{3}(9x - 1)}',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Why factor?', md: 'A factored derivative shows at once where it is zero: here at $x = 0$, $x = \\tfrac{1}{3}$ and $x = \\tfrac{1}{9}$.' },
      ],
      lines: [
        { say: 'Both terms share a common factor. Each has a two x, and each has three x minus one, at least cubed. So the common factor is two x times three x minus one, cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'Take it out. From the first term, three x minus one is left. From the second, twelve x squared over two x leaves six x.', show: 'm.1', focus: 'm.1' },
        { say: 'Three x minus one, plus six x, is nine x minus one. So f prime of x is two x, times three x minus one, cubed, times nine x minus one.', show: 'm.2', focus: 'm.2' },
        { say: 'A factored derivative is useful: it shows at once where the derivative is zero, and the tangent is horizontal. Here, at x equals zero, one third and one ninth.', show: 'tip' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Losing the chain inside a product', md: 'Inside the product rule, $v = (3x - 1)^{4}$ still needs the chain rule. Its derivative is $12(3x - 1)^{3}$, not $4(3x - 1)^{3}$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{v\' = 4(3x - 1)^{3}}', '\\good{v\' = 4(3x - 1)^{3}\\cdot 3 = 12(3x - 1)^{3}}'] },
      ],
      lines: [
        { say: 'When you are busy with the product rule, it is easy to forget the chain rule inside it. A common mistake is to write v prime as four times three x minus one, cubed.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'But v is a power of a function, and its inside, three x minus one, has derivative three. So v prime is twelve times three x minus one, cubed. Find u prime and v prime carefully, on their own lines, before you substitute.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Differentiate $f(x) = x(2x + 1)^{3}$ and factor the answer.',
          choices: ['$3(2x + 1)^{2}$', '$(2x + 1)^{2}(8x + 1)$', '$6x(2x + 1)^{2}$', '$(2x + 1)^{2}(5x + 1)$'],
          answer: 1,
          working: '$u = x$, $u\' = 1$, $v = (2x + 1)^{3}$, $v\' = 3(2x + 1)^{2}\\cdot 2 = 6(2x + 1)^{2}$. So $f\'(x) = (2x + 1)^{3} + 6x(2x + 1)^{2} = (2x + 1)^{2}\\left[(2x + 1) + 6x\\right] = (2x + 1)^{2}(8x + 1)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Differentiate f of x equals x times two x plus one, cubed, and factor the answer. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. u prime v is two x plus one, cubed, and u v prime is x times six times two x plus one, squared. Factor out two x plus one, squared, to get two x plus one, plus six x: eight x plus one. Choice D forgets to multiply by two, the derivative of the inside.', show: 'q.answer' },
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
          items: ['Decide what the function is as a whole: a product, a quotient or a composition.', 'Work inward: each piece may need its own rule.', 'Factor the answer by taking out the common factors.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Decide what the function is as a whole: a product, a quotient, or a composition. That decides the first rule.', show: 'sum.0' },
        { say: 'Then work inward, because each piece may need a rule of its own.', show: 'sum.1' },
        { say: 'And factor the answer by taking out the common factors. In the next part, we use the chain rule with a table of values. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
