import type { Explainer, TableEl } from '@/video/script.ts';

// The lesson's table of values for f and g.
const table: TableEl = {
  kind: 'table',
  id: 't',
  head: ['$x$', '$f(x)$', "$f'(x)$", '$g(x)$', "$g'(x)$"],
  rows: [
    ['$1$', '$2$', '$4$', '$-3$', '$1$'],
    ['$2$', '$3$', '$-1$', '$4$', '$5$'],
  ],
};

const video: Explainer = {
  id: 'm31-4-2-d',
  lessonId: 'm31-4-2',
  title: 'The Product and Quotient Rules, Part 4: Using a Table of Values',
  thumbnailTitle: 'Product and Quotient Rules with a Table',
  thumbnail: false,
  summary: 'Using the product and quotient rules with only a table of values and slopes: with f(2) = 3, f′(2) = −1, g(2) = 4 and g′(2) = 5, the product h = fg has h′(2) = 11 and the quotient k = f/g has k′(2) = −19/16. Read all four values from the right row first, and square g(2), not g′(2).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 4', title: 'Using a Table of Values', subtitle: 'The rules without formulas' }],
      lines: [
        { say: 'Sometimes you do not know the formulas for two functions at all. You only know their values and their slopes at a few points. That is enough to use the product and quotient rules.', show: 'title' },
        { say: 'In this video, you will find the derivative of a product and of a quotient at a point, using only a table of values.' },
      ],
    },
    {
      chapter: 'Reading the table',
      layout: 'center',
      main: [table, { kind: 'callout', id: 'key', tone: 'key', title: 'What the rules need', md: 'At a point, the product and quotient rules need only four numbers: $f$, $f\'$, $g$ and $g\'$ there.' }],
      lines: [
        { say: 'This table gives two functions, f and g, at x equals one and x equals two. For each, it gives the value of the function and the value of its derivative: the slope of its graph there.', show: 't' },
        { say: 'For example, at x equals two, f is three, and its slope is negative one. g is four, and its slope is five.', focus: 't.1' },
        { say: 'Look at the product rule and the quotient rule: at a point, they only need these four numbers. So you do not need the formulas.', show: 'key' },
      ],
    },
    {
      chapter: 'A product',
      layout: 'split',
      leftWidth: 480,
      left: [table],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $h\'(2)$ if $h(x) = f(x)g(x)$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h\'(2) = f\'(2)g(2) + f(2)g\'(2)', '= (-1)(4) + (3)(5)', '= -4 + 15 = \\good{11}'] },
      ],
      lines: [
        { say: 'Find h prime of two, where h of x is f of x times g of x.', show: ['t', 'q'] },
        { say: 'By the product rule, h prime of two is f prime of two times g of two, plus f of two times g prime of two.', show: 'm.0', focus: 'm.0' },
        { say: 'Read all four values from the row for x equals two. f prime of two is negative one, g of two is four, f of two is three, and g prime of two is five.', show: 'm.1', focus: ['t.1', 'm.1'] },
        { say: 'So h prime of two is negative one times four, plus three times five. That is negative four plus fifteen, which is eleven.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A quotient',
      layout: 'split',
      leftWidth: 480,
      left: [table],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $k\'(2)$ if $k(x) = \\dfrac{f(x)}{g(x)}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['k\'(2) = \\dfrac{f\'(2)g(2) - f(2)g\'(2)}{\\left[g(2)\\right]^2}', '= \\dfrac{(-1)(4) - (3)(5)}{4^2}', '= \\dfrac{-4 - 15}{16} = \\good{-\\dfrac{19}{16}}'] },
      ],
      lines: [
        { say: 'Now find k prime of two, where k of x is f of x over g of x.', show: ['t', 'q'] },
        { say: 'By the quotient rule, k prime of two is f prime of two times g of two, minus f of two times g prime of two, all over g of two, squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute the same four values: negative one times four, minus three times five, all over four squared.', show: 'm.1', focus: ['t.1', 'm.1'] },
        { say: 'The top is negative four minus fifteen, which is negative nineteen. The bottom is sixteen. So k prime of two is negative nineteen sixteenths.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Squaring the wrong value', md: 'The bottom of the quotient rule is $[g(2)]^2$, the **value** of $g$, squared. It is not $[g\'(2)]^2$. Write the four values down before you substitute.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{\\dfrac{-19}{\\left[g\'(2)\\right]^2} = -\\dfrac{19}{25}}', '\\good{\\dfrac{-19}{\\left[g(2)\\right]^2} = -\\dfrac{19}{16}}'] },
      ],
      lines: [
        { say: 'With a table, it is easy to pick up the wrong number. A common mistake is to square g prime of two, five, on the bottom, which gives negative nineteen over 25.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The bottom is the value of g, squared: four squared, which is sixteen. To avoid mix-ups, write all four values down first, then substitute them into the rule.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'From the table, $f(1) = 2$, $f\'(1) = 4$, $g(1) = -3$ and $g\'(1) = 1$. If $h(x) = f(x)g(x)$, find $h\'(1)$.',
          choices: ['$4$', '$-12$', '$14$', '$-10$'],
          answer: 3,
          working: '$h\'(1) = f\'(1)g(1) + f(1)g\'(1) = (4)(-3) + (2)(1) = -12 + 2 = -10$.',
        },
      ],
      lines: [
        { say: 'Your turn. From the row of the table for x equals one, f of one is two, f prime of one is four, g of one is negative three, and g prime of one is one. If h of x is f of x times g of x, find h prime of one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. From the row for x equals one, h prime of one is four times negative three, plus two times one. That is negative twelve plus two, which is negative ten. Choice A multiplies the two derivatives, four and one.', show: 'q.answer' },
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
          items: ['At a point, the rules need only $f$, $f\'$, $g$ and $g\'$ there.', 'Read all four values from the right row, then substitute.', 'The quotient rule squares the value $g(a)$, not $g\'(a)$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. At a point, the product and quotient rules need only four numbers: f, f prime, g and g prime there.', show: 'sum.0' },
        { say: 'Read all four values from the right row of the table, then substitute.', show: 'sum.1' },
        { say: 'And the quotient rule squares the value of g, not its derivative. In the next part, we use these rules to find horizontal tangents and rates of change. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
