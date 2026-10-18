import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm31-2-3-c',
  lessonId: 'm31-2-3',
  title: 'Limits at Infinity and Asymptotes, Part 3: Square Roots at Negative Infinity',
  thumbnailTitle: 'Square Roots at −∞',
  summary: 'Limits at negative infinity with a square root: √(x²) = |x|, which is −x when x < 0, so x = −√(x²). The limit of √(9x² + 1)/(2x − 5) as x → −∞ is −3/2 (checked with a table), not +3/2: check the signs before you divide.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 3', title: 'Square Roots at Negative Infinity', subtitle: 'Why the square root of x squared is |x|' }],
      lines: [
        { say: 'Dividing by the highest power of x works for square roots too, with one trap. When x is negative, the square root of x squared is not x.', show: 'title' },
        { say: 'In this video, you will see why, and find a limit at negative infinity without losing the sign.' },
      ],
    },
    {
      chapter: 'The square root of x squared',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{3^2} = \\sqrt{9} = 3', '\\sqrt{(-3)^2} = \\sqrt{9} = 3 \\ne -3', '\\sqrt{x^2} = |x| = \\begin{cases} x, & x \\ge 0 \\\\ -x, & x < 0 \\end{cases}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'For negative x', md: 'When $x < 0$: $\\sqrt{x^2} = -x$, so $x = -\\sqrt{x^2}$.' },
      ],
      lines: [
        { say: 'Try a positive number. The square root of three squared is the square root of nine, which is three. You get back the number you started with.', show: 'm.0', focus: 'm.0' },
        { say: 'Now try negative three. Negative three squared is also nine, and the square root of nine is three, not negative three. A square root is never negative.', show: 'm.1', focus: 'm.1' },
        { say: 'So the square root of x squared is the absolute value of x. That is x when x is positive or zero, but negative x when x is negative.', show: 'm.2', focus: 'm.2' },
        { say: 'Turn that around: when x is negative, x itself equals negative the square root of x squared. That is the fact we need.', show: 'key' },
      ],
    },
    {
      chapter: 'Signs first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\lim_{x \\to -\\infty} \\dfrac{\\sqrt{9x^2 + 1}}{2x - 5}', '\\dfrac{\\text{positive}}{\\text{negative}} = \\text{negative}'] },
      ],
      lines: [
        { say: 'Evaluate the limit as x approaches negative infinity of the square root of nine x squared plus one, over two x minus five.', show: 'm.0', focus: 'm.0' },
        { say: 'Before any algebra, check the signs. The top is a square root, so it is positive. When x is a large negative number, the bottom, two x minus five, is negative.', show: 'm.1', focus: 'm.1' },
        { say: 'A positive number over a negative number is negative. So whatever the limit is, it must be negative. Keep that in mind as a check.' },
      ],
    },
    {
      chapter: 'Dividing by x',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{bottom: } \\dfrac{2x - 5}{x} = 2 - \\dfrac{5}{x}', '\\text{top: } \\dfrac{\\sqrt{9x^2 + 1}}{x} = \\dfrac{\\sqrt{9x^2 + 1}}{\\opp{-\\sqrt{x^2}}}', '= -\\sqrt{\\dfrac{9x^2 + 1}{x^2}} = -\\sqrt{9 + \\dfrac{1}{x^2}}', '\\dfrac{-\\sqrt{9 + \\frac{1}{x^2}}}{2 - \\frac{5}{x}} \\to \\dfrac{-\\sqrt{9}}{2} = -\\dfrac{3}{2}'],
        },
      ],
      lines: [
        { say: 'Now divide the top and the bottom by x. The bottom is easy: two x minus five, over x, is two minus five over x.', show: 'm.0', focus: 'm.0' },
        { say: 'For the top, we want to move the x inside the square root. Since x is negative, replace x with negative the square root of x squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Now both are square roots, so they combine into one: negative the square root of nine x squared plus one, over x squared. That simplifies to negative the square root of nine plus one over x squared.', show: 'm.2', focus: 'm.2' },
        { say: 'As x approaches negative infinity, one over x squared and five over x both approach zero. That leaves negative the square root of nine, over two, which is negative three halves.', show: 'm.3', focus: 'm.3' },
        { say: 'The answer is negative, just as the signs predicted.' },
      ],
    },
    {
      chapter: 'Check with a table',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['f(x) = \\dfrac{\\sqrt{9x^2 + 1}}{2x - 5}'] },
        { kind: 'table', id: 't', head: ['$x$', '$f(x)$'], rows: [['$-100$', '$-1.4634$'], ['$-1000$', '$-1.4963$'], ['$-10\\,000$', '$-1.4996$']] },
        { kind: 'text', id: 'n', size: 'md', md: 'The values close in on $-1.5 = -\\tfrac{3}{2}$.' },
      ],
      lines: [
        { say: 'A table confirms it. At negative a hundred, the value is about negative 1.4634. At negative a thousand, about negative 1.4963. At negative ten thousand, about negative 1.4996.', show: ['f', 't'], focus: 't' },
        { say: 'The values close in on negative 1.5, which is negative three halves.', show: 'n' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the sign', md: 'Dividing $\\sqrt{9x^2 + 1}$ by $x$ as if $\\sqrt{x^2} = x$ gives $+\\tfrac{3}{2}$ at $-\\infty$. For negative $x$, the top is positive and the bottom is negative, so the answer must be negative.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x \\to \\infty\\colon \\ \\dfrac{3}{2} \\qquad x \\to -\\infty\\colon \\ -\\dfrac{3}{2}'] },
      ],
      lines: [
        { say: 'The common mistake is to treat the square root of x squared as x, even when x is negative. That gives positive three halves, which has the wrong sign.', show: 'oops' },
        { say: 'In fact, this function has two different horizontal asymptotes. As x approaches positive infinity, the limit is positive three halves. As x approaches negative infinity, it is negative three halves.', show: 'm', focus: 'm' },
        { say: 'So whenever a square root meets negative infinity, check the signs first, and use x equals negative the square root of x squared.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\displaystyle\\lim_{x \\to -\\infty} \\frac{\\sqrt{4x^2 + 3}}{x + 1}$.',
          choices: ['$2$', '$-2$', '$4$', '$0$'],
          answer: 1,
          working: 'For $x < 0$, $x = -\\sqrt{x^2}$. Dividing by $x$: $\\dfrac{-\\sqrt{4 + \\frac{3}{x^2}}}{1 + \\frac{1}{x}} \\to -\\sqrt{4} = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the limit as x approaches negative infinity of the square root of four x squared plus three, over x plus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The top is positive and the bottom is negative, so the limit is negative. Dividing by x, with x equal to negative the square root of x squared, gives negative the square root of four, over one, which is negative two. Choice A forgets that sign.', show: 'q.answer' },
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
          items: ['$\\sqrt{x^2} = |x|$, which is $-x$ when $x < 0$.', 'At $-\\infty$, use $x = -\\sqrt{x^2}$ to move $x$ inside a square root.', 'Check the signs of the top and bottom first: they tell you the sign of the answer.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The square root of x squared is the absolute value of x, which is negative x when x is negative.', show: 'sum.0' },
        { say: 'At negative infinity, use x equals negative the square root of x squared to move x inside a square root.', show: 'sum.1' },
        { say: 'And check the signs of the top and bottom first. In the next part, we look at limits that are infinite, and vertical asymptotes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
