import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-1 lesson 8.5 (composite functions). The question is an exercise from
// OpenStax College Algebra 2e, word for word (section 3.4, Composition of Functions, CC BY-NC-SA
// 4.0), with its set's instruction in front of it. f(g(x)) = √(x² + 3) + 2, and
// g(f(x)) = (√x + 2)² + 3 = x + 4√x + 4 + 3 = x + 4√x + 7, as in the book's answer. At x = 1 both
// formulas match working one function at a time: f(g(1)) = 4 and g(f(1)) = 12.

const QUESTION = 'Use each pair of functions to find f(g(x)) and g(f(x)). Simplify your answers. f(x) = √x + 2, g(x) = x² + 3';

const video: Explainer = {
  id: 'xq-m301-8-5',
  lessonId: '',
  exam: {
    lesson: 'm301-8-5',
    source: 'OpenStax, College Algebra 2e, Exercise in section 3.4, Composition of Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/3-4-composition-of-functions',
    question: QUESTION,
  },
  title: 'Exam Question: f(g(x)) and g(f(x)) for √x + 2 and x² + 3 (Composite Functions)',
  thumbnailTitle: 'Find f(g(x)) and g(f(x))',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: with f(x) = √x + 2 and g(x) = x² + 3, find and simplify f(g(x)) and g(f(x)). We put the whole of g(x) in place of x in f, and then the whole of f(x) in place of x in g, expanding (√x + 2)² carefully. The answers are √(x² + 3) + 2 and x + 4√x + 7. Then we check with x = 1 and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Find f(g(x)) and g(f(x))', subtitle: 'Composite functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about composite functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: 'Use each pair of functions to find $f(g(x))$ and $g(f(x))$. Simplify your answers. $f(x) = \\sqrt{x} + 2$, $\\ g(x) = x^2 + 3$',
          answer: '$f(g(x)) = \\sqrt{x^2 + 3} + 2$; $\\ g(f(x)) = x + 4\\sqrt{x} + 7$',
          working: 'Put $g(x)$ into $f$, and $f(x)$ into $g$: $(\\sqrt{x} + 2)^2 + 3 = x + 4\\sqrt{x} + 7$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Use each pair of functions to find f of g of x and g of f of x. Simplify your answers. f of x equals the square root of x, plus 2. g of x equals x squared plus 3.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: '$f(g(x))$: do $g$ **first**, then feed the result into $f$. $\\ g(f(x))$: do $f$ first, then $g$. Write each as **one** formula in $x$.' }],
      lines: [
        { say: 'f of g of x means: do g first, then feed the result into f.', show: 't' },
        { say: 'g of f of x is the other way round: f first, then g. We write each one as a single formula in x.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'sub', tone: 'key', title: 'Composition', md: 'To find $f(g(x))$, replace **every** $x$ in $f$ with the **whole** expression $g(x)$, in brackets.' },
        { kind: 'math', id: 'sq', size: 'lg', lines: ['(a + b)^2 = a^2 + 2ab + b^2'] },
      ],
      lines: [
        { say: 'Here is what we need. To find f of g of x, replace every x in f with the whole expression g of x, in brackets.', show: 'sub' },
        { say: 'And we will need to square a sum: "a" plus b, squared, is "a" squared, plus 2 "a" b, plus b squared.', show: 'sq' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Put $g(x)$ into $f$: $f(g(x))$', 'Put $f(x)$ into $g$: $g(f(x))$', '**Expand** and simplify'] }],
      lines: [
        { say: 'Here is the plan. First, put g of x into f.', show: 'plan.0' },
        { say: 'Second, put f of x into g.', show: 'plan.1' },
        { say: 'Third, expand and simplify.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: f(g(x))',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(\\square) = \\sqrt{\\square} + 2', 'f(g(x)) = \\sqrt{\\good{x^2 + 3}} + 2'] }],
      lines: [
        { say: 'Step one. Think of f as a machine: f of a box is the square root of the box, plus 2.', show: 'm.0' },
        { say: 'Put g of x, which is x squared plus 3, in the box. f of g of x is the square root of x squared plus 3, plus 2. Nothing more simplifies, since the square root of a sum does not split.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: g(f(x))',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['g(\\square) = \\square^2 + 3', 'g(f(x)) = (\\good{\\sqrt{x} + 2})^2 + 3'] }],
      lines: [
        { say: 'Step two. g of a box is the box squared, plus 3.', show: 'm.0' },
        { say: 'Put f of x, which is the square root of x plus 2, in the box, in brackets: the square root of x plus 2, all squared, plus 3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Expand',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(\\sqrt{x} + 2)^2 = x + 4\\sqrt{x} + 4', 'g(f(x)) = x + 4\\sqrt{x} + 4 + 3', '= \\good{x + 4\\sqrt{x} + 7}'] }],
      lines: [
        { say: 'Step three. Square the sum. The square root of x, squared, is x. 2 times root x times 2 is 4 root x. And 2 squared is 4.', show: 'm.0' },
        { say: 'Then add the 3.', show: 'm.1' },
        { say: '4 plus 3 is 7. So g of f of x is x plus 4 root x plus 7.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['g(1) = 4, \\ f(4) = 4; \\quad \\sqrt{1 + 3} + 2 = 4 \\ \\checkmark', 'f(1) = 3, \\ g(3) = 12; \\quad 1 + 4 + 7 = 12 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with x equals 1. One machine at a time: g of 1 is 4, and f of 4 is 2 plus 2, which is 4. Our formula gives the square root of 4, plus 2, which is also 4.', show: 'm.0' },
        { say: 'The other way: f of 1 is 3, and g of 3 is 12. Our formula gives 1 plus 4 plus 7, which is also 12. Both check out.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['$f(g(x)) = f(x) \\cdot g(x)$', 'composition **feeds** one into the other; it does not multiply'],
            ['$(\\sqrt{x} + 2)^2 = x + 4$', 'do not forget the middle term $4\\sqrt{x}$'],
            ['$f(g(x)) = g(f(x))$', 'the **order** matters: $12 \\ne 4$ at $x = 1$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'f of g of x is not f times g. One function is fed into the other.' },
        { say: 'Squaring a sum has a middle term. The square root of x plus 2, squared, is not just x plus 4.' },
        { say: 'And the order matters. At x equals 1, one order gave 4 and the other gave 12.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'If $f(x) = 2x + 1$ and $g(x) = x^2$, find $f(g(3))$.',
          choices: ['$49$', '$15$', '$19$', '$10$'],
          answer: 2,
          working: '$g(3) = 9$, then $f(9) = 2 \\cdot 9 + 1 = 19$.',
        },
      ],
      lines: [
        { say: 'Your turn. If f of x equals 2 x plus 1 and g of x equals x squared, find f of g of 3. Pause the video and try it.', show: 'q2', wait: 7 },
        { say: 'Do g first: g of 3 is 9. Then f of 9 is 2 times 9, plus 1, which is 19: choice C. Doing f first would give 49, the wrong order.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$f(g(x))$: do $g$ **first**, then $f$', 'Replace **every** $x$ with the whole inner function, in brackets', 'Expand carefully: $(a + b)^2$ has a **middle term**', 'Check with one value of $x$'] }],
      lines: [
        { say: 'Here is what to remember. f of g of x means do g first, then f.', show: 'sum.0' },
        { say: 'Replace every x in the outer function with the whole inner function, in brackets.', show: 'sum.1' },
        { say: 'Expand carefully. A squared sum has a middle term.', show: 'sum.2' },
        { say: 'And check with one value of x. For more on composite functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
