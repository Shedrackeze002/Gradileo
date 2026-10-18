import type { Explainer, TableEl } from '@/video/script.ts';

// The lesson's table of values for f and g.
const table: TableEl = {
  kind: 'table',
  id: 't',
  head: ['$x$', '$f(x)$', "$f'(x)$", '$g(x)$', "$g'(x)$"],
  rows: [
    ['$1$', '$3$', '$2$', '$4$', '$5$'],
    ['$4$', '$1$', '$-2$', '$2$', '$4$'],
  ],
};

const video: Explainer = {
  id: 'm31-4-3-e',
  lessonId: 'm31-4-3',
  title: 'The Chain Rule, Part 5: Using a Table of Values',
  thumbnailTitle: 'The Chain Rule with a Table',
  thumbnail: false,
  summary: 'Using the chain rule with a table of values: for h(x) = f(g(x)), h′(1) = f′(g(1)) · g′(1), so the outside derivative is read at the output of the inside function, g(1) = 4, in a different row: h′(1) = f′(4) · g′(1) = (−2)(5) = −10. Using f′(1) instead gives 10, which is wrong.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Differentiation Rules · Part 5', title: 'The Chain Rule with a Table', subtitle: 'Reading the outside derivative in the right row' }],
      lines: [
        { say: 'Like the product and quotient rules, the chain rule works with just a table of values. But there is a twist: the numbers you need may sit in different rows.', show: 'title' },
        { say: 'In this video, you will use the chain rule with a table of values, and see why the outside derivative is read at the output of the inside function.' },
      ],
    },
    {
      chapter: 'Where to read the outside',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['h(x) = f(g(x)) \\;\\Rightarrow\\; h\'(a) = f\'\\big(\\opp{g(a)}\\big)\\cdot \\adj{g\'(a)}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'The outside works on the inside’s output', md: 'The outside function $f$ never sees $a$ itself: its input is $g(a)$. So its derivative is read at $g(a)$, which may be in a different row of the table.' },
      ],
      lines: [
        { say: 'Suppose h of x is f of g of x. By the chain rule, h prime of "a" is f prime of g of "a", times g prime of "a".', show: 'm', focus: 'm' },
        { say: 'Look closely at the first factor. The outside derivative, f prime, is evaluated at g of "a", not at "a".', show: 'key' },
        { say: 'That is because the outside function never sees "a" itself. The inside function turns "a" into g of "a", and that is the input that f works on. So f prime must be read there.' },
      ],
    },
    {
      chapter: 'Find h′(1)',
      layout: 'split',
      leftWidth: 480,
      left: [table],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'If $h(x) = f(g(x))$, find $h\'(1)$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h\'(1) = f\'\\big(g(1)\\big)\\cdot g\'(1)', 'g(1) = 4, \\quad g\'(1) = 5', 'f\'(4) = -2', 'h\'(1) = f\'(4)\\cdot g\'(1)', '= (-2)(5) = \\good{-10}'] },
      ],
      lines: [
        { say: 'Use the table. If h of x is f of g of x, find h prime of one.', show: ['t', 'q'] },
        { say: 'By the chain rule, h prime of one is f prime of g of one, times g prime of one.', show: 'm.0', focus: 'm.0' },
        { say: 'Start with the inside. In the row for x equals one, g of one is four, and g prime of one is five.', show: 'm.1', focus: ['t.0', 'm.1'] },
        { say: 'Now the outside derivative is read at g of one, which is four. So move to the row for x equals four: f prime of four is negative two.', show: 'm.2', focus: ['t.1', 'm.2'] },
        { say: 'Multiply: h prime of one is f prime of four times g prime of one, which is negative two times five: negative ten.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reading the wrong row', md: 'Using $f\'(1) = 2$ instead of $f\'(g(1)) = f\'(4)$ gives $10$, which is wrong. The outside derivative is evaluated at the **output** of the inside function.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\bad{f\'(1)\\cdot g\'(1) = (2)(5) = 10}', '\\good{f\'(4)\\cdot g\'(1) = (-2)(5) = -10}'] },
      ],
      lines: [
        { say: 'The most common mistake is to stay in the row for x equals one, and use f prime of one, which is two. That gives two times five, which is ten: the wrong answer.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Always find the inside value first, g of "a". Then read the outside derivative in that row.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'From the table, $g(1) = 4$, $g\'(1) = 5$, $g(4) = 2$ and $g\'(4) = 4$. If $k(x) = g(g(x))$, find $k\'(1)$.',
          choices: ['$25$', '$4$', '$9$', '$20$'],
          answer: 3,
          working: '$k\'(1) = g\'(g(1))\\cdot g\'(1) = g\'(4)\\cdot g\'(1) = (4)(5) = 20$.',
        },
      ],
      lines: [
        { say: 'Your turn. From the table, g of one is four, g prime of one is five, g of four is two, and g prime of four is four. If k of x is g of g of x, find k prime of one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. k prime of one is g prime of g of one, times g prime of one. g of one is four, so that is g prime of four, which is four, times five: twenty. Choice A uses g prime of one twice, reading the outside derivative in the wrong row.', show: 'q.answer' },
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
          items: ['For $h(x) = f(g(x))$: $h\'(a) = f\'(g(a))\\cdot g\'(a)$.', 'Find the inside value $g(a)$ first.', 'Read the outside derivative $f\'$ in the row for $g(a)$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For h of x equals f of g of x, h prime of "a" is f prime of g of "a", times g prime of "a".', show: 'sum.0' },
        { say: 'Find the inside value, g of "a", first.', show: 'sum.1' },
        { say: 'Then read the outside derivative in the row for g of "a". In the next part, we apply the chain rule to functions with several layers, and to the speed of sound. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
