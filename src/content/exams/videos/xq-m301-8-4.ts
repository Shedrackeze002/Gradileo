import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-1 lesson 8.4 (sums, differences, products and quotients of functions).
// The question is an exercise from OpenStax College Algebra 2e, word for word (section 3.4,
// Composition of Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. f is
// defined everywhere and g needs x ≥ 5, so f + g, f − g and fg have domain [5, ∞); f/g also needs
// g(x) ≠ 0, which leaves out x = 5, so its domain is (5, ∞), as in the book's answer.

const QUESTION =
  'Determine the domain for each function in interval notation. Given f(x) = 3x² and g(x) = √(x − 5), find f + g, f − g, fg, and f/g.';

const video: Explainer = {
  id: 'xq-m301-8-4',
  lessonId: '',
  exam: {
    lesson: 'm301-8-4',
    source: 'OpenStax, College Algebra 2e, Exercise in section 3.4, Composition of Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/3-4-composition-of-functions',
    question: QUESTION,
  },
  title: 'Exam Question: f + g, f − g, fg and f/g With Their Domains (Sums, Differences, Products and Quotients of Functions)',
  thumbnailTitle: 'f + g, f − g, fg and f/g',
  thumbnail: 'res',
  summary:
    'A real test question, solved one small step at a time: with f(x) = 3x² and g(x) = √(x − 5), find f + g, f − g, fg and f/g, and give each domain in interval notation. Each new function is defined only where both f and g are, which is [5, ∞), and the quotient also needs g(x) ≠ 0, so its domain is (5, ∞). Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'f + g, f − g, fg and f/g', subtitle: 'Sums, differences, products and quotients of functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about combining functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Determine the domain for each function in interval notation. Given $f(x) = 3x^2$ and $g(x) = \\sqrt{x - 5}$, find $f + g$, $f - g$, $fg$, and $f/g$.',
          answer: '$3x^2 \\pm \\sqrt{x - 5}$ and $3x^2\\sqrt{x - 5}$ on $[5, \\infty)$; $\\dfrac{3x^2}{\\sqrt{x - 5}}$ on $(5, \\infty)$',
          working: 'Both $f$ and $g$ must be defined: $x \\ge 5$. For $\\dfrac{f}{g}$, also $g(x) \\ne 0$, so $x \\ne 5$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Determine the domain for each function in interval notation. Given f of x equals 3 x squared and g of x equals the square root of x minus 5, find f plus g, f minus g, f g, and f over g.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Four new functions: **add**, **subtract**, **multiply** and **divide** $f$ and $g$. For each one, say which $x$-values are **allowed**.' }],
      lines: [
        { say: 'We build four new functions by adding, subtracting, multiplying and dividing f and g.', show: 't' },
        { say: 'And for each one, we give the domain: the x-values that are allowed.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'ops', size: 'lg', lines: ['(f + g)(x) = f(x) + g(x), \\quad (fg)(x) = f(x) \\cdot g(x)', '\\left(\\dfrac{f}{g}\\right)(x) = \\dfrac{f(x)}{g(x)}'] },
        { kind: 'callout', id: 'dom', tone: 'key', title: 'The domain', md: 'Where **both** $f$ and $g$ are defined. For $\\dfrac{f}{g}$, also leave out every $x$ with $g(x) = 0$.' },
      ],
      lines: [
        { say: 'Here is what we need. f plus g at x is just f of x plus g of x. The same for minus and times.', show: 'ops.0' },
        { say: 'And f over g at x is f of x divided by g of x.', show: 'ops.1' },
        { say: 'The new domain is where both f and g are defined. For the quotient, we also leave out any x that makes g of x equal 0.', show: 'dom' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the domains of $f$ and $g$', 'Write the **four** new functions', 'Find each **domain**, watching the quotient'] }],
      lines: [
        { say: 'Here is the plan. First, find the domains of f and g.', show: 'plan.0' },
        { say: 'Second, write the four new functions.', show: 'plan.1' },
        { say: 'Third, find each domain, taking extra care with the quotient.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Domains of f and g',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(x) = 3x^2: \\quad (-\\infty, \\infty)', 'g(x) = \\sqrt{x - 5}: \\quad x - 5 \\ge 0 \\ \\Rightarrow \\ [5, \\infty)', '\\text{both: } \\good{[5, \\infty)}'] }],
      lines: [
        { say: 'Step one. f of x is 3 x squared, a polynomial, so any x works. Its domain is all real numbers.', show: 'm.0' },
        { say: 'g of x is a square root, so the inside must not be negative: x minus 5 is at least 0, so x is at least 5.', show: 'm.1' },
        { say: 'Where both are defined is the overlap: from 5 to infinity, including 5.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The four functions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(f + g)(x) = 3x^2 + \\sqrt{x - 5}', '(f - g)(x) = 3x^2 - \\sqrt{x - 5}', '(fg)(x) = 3x^2\\sqrt{x - 5}', '\\left(\\dfrac{f}{g}\\right)(x) = \\dfrac{3x^2}{\\sqrt{x - 5}}'] }],
      lines: [
        { say: 'Step two. f plus g is 3 x squared plus the square root of x minus 5.', show: 'm.0' },
        { say: 'f minus g is 3 x squared minus the square root of x minus 5.', show: 'm.1' },
        { say: 'f g is 3 x squared times the square root of x minus 5.', show: 'm.2' },
        { say: 'And f over g is 3 x squared over the square root of x minus 5.', show: 'm.3' },
      ],
    },
    {
      chapter: 'Step 3: The domains',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'res',
          head: ['Function', 'Domain'],
          rows: [
            ['$f + g$, $\\ f - g$, $\\ fg$', '$[5, \\infty)$'],
            ['$\\dfrac{f}{g}$', '$g(5) = 0$, so $\\ (5, \\infty)$'],
          ],
        },
      ],
      lines: [
        { say: 'Step three. f plus g, f minus g, and f g only need f and g to be defined, so their domain is from 5 to infinity, with a square bracket at 5.', show: 'res' },
        { say: 'For f over g, we also cannot divide by 0. g of 5 is the square root of 0, which is 0. So 5 is left out, and the domain is from 5 to infinity with a round bracket.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = 9: \\quad (f + g)(9) = 243 + 2 = 245', '\\left(\\dfrac{f}{g}\\right)(5) = \\dfrac{75}{0}: \\ \\text{undefined} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. At x equals 9, f is 3 times 81, which is 243, and g is the square root of 4, which is 2. So f plus g at 9 is 245. Fine.', show: 'm.0' },
        { say: 'But f over g at 5 would be 75 over 0, which is undefined. That is why 5 is in the domain of f plus g, but not of f over g. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$f + g$ on $(-\\infty, \\infty)$', '$g$ still needs $x \\ge 5$'],
            ['$\\dfrac{f}{g}$ on $[5, \\infty)$', '$g(5) = 0$: leave $5$ **out**'],
            ['$(5, \\infty)$ for $f + g$', '$\\sqrt{0} = 0$ is fine to **add**: keep $[5$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Adding f does not make g work everywhere. The square root still needs x at least 5.' },
        { say: 'For the quotient, check where the denominator is 0. x equals 5 must be left out.' },
        { say: 'But only for the quotient. Adding, subtracting or multiplying by the square root of 0 is fine, so the others keep the square bracket at 5.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'If $f(x) = x - 2$ and $g(x) = \\sqrt{x}$, what is the domain of $\\left(\\dfrac{g}{f}\\right)(x)$?',
          choices: ['$[0, \\infty)$', '$[0, 2) \\cup (2, \\infty)$', '$(2, \\infty)$', '$(-\\infty, 2) \\cup (2, \\infty)$'],
          answer: 1,
          working: '$\\sqrt{x}$ needs $x \\ge 0$, and the denominator $x - 2 \\ne 0$, so $x \\ne 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. If f of x equals x minus 2 and g of x equals the square root of x, what is the domain of g over f? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The square root needs x at least 0. Now f is on the bottom, and f of 2 is 0, so 2 is left out. That gives 0 up to 2, joined with 2 to infinity: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Combine the **formulas**: add, subtract, multiply, divide', 'Domain: where **both** functions are defined', 'Quotient: also leave out zeros of the **denominator**', 'Square bracket: included; round bracket: left out'] }],
      lines: [
        { say: 'Here is what to remember. Combine the formulas by adding, subtracting, multiplying or dividing.', show: 'sum.0' },
        { say: 'The domain is where both functions are defined.', show: 'sum.1' },
        { say: 'For a quotient, also leave out every zero of the denominator.', show: 'sum.2' },
        { say: 'And in interval notation, a square bracket means included, and a round bracket means left out. For more on sums, differences, products and quotients of functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
