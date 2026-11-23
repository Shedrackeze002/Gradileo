import type { Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 3.1 (characteristics of polynomial functions). The question
// is an exercise from OpenStax College Algebra 2e, word for word (section 5.2, Power Functions and
// Polynomial Functions, CC BY-NC-SA 4.0), with its set's instruction in front of it. The highest
// power terms of the factors multiply to x · (−x²) · 2x = −2x⁴, so the degree is 4 and the leading
// coefficient is −2, as in the book's answer. Expanded, it is −2x⁴ − x³ + 8x² + 4x.

const P = (x: number) => x * (4 - x * x) * (2 * x + 1);
const g = plane({ x: [-3, 3], y: [-8, 12], yStep: 2, every: 2, width: 9, height: 9 });

/** y = x(4 − x²)(2x + 1) (`p`). */
const graph = (height = 420) => figure('gr', [g, plot(g, { id: 'p', f: P, from: -3, to: 3, tone: 'good', samples: 160 })], height);

const QUESTION = 'Find the degree and leading coefficient for the given polynomial. x(4 − x²)(2x + 1)';

const video: Explainer = {
  id: 'xq-m301-3-1',
  lessonId: '',
  exam: {
    lesson: 'm301-3-1',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.2, Power Functions and Polynomial Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-2-power-functions-and-polynomial-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Degree and Leading Coefficient of x(4 − x²)(2x + 1) (Characteristics of Polynomial Functions)',
  thumbnailTitle: 'Degree of x(4 − x²)(2x + 1)',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: find the degree and leading coefficient of x(4 − x²)(2x + 1). We multiply the highest power term of each factor, x · (−x²) · 2x = −2x⁴, so the degree is 4 and the leading coefficient is −2. Then we check by expanding, see what it means for the graph, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Degree of x(4 − x²)(2x + 1)', subtitle: 'Characteristics of polynomial functions, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about polynomial functions. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the degree and leading coefficient for the given polynomial. $x(4 - x^2)(2x + 1)$',
          answer: 'degree $4$, leading coefficient $-2$',
          working: 'Multiply the highest power term of each factor: $x \\cdot (-x^2) \\cdot 2x = -2x^4$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Find the degree and leading coefficient for the given polynomial. x, times 4 minus x squared, times 2 x plus 1.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The polynomial is written as a **product**. We need the **highest power** of $x$ it would have if we multiplied it out, and the **number** in front of that power.' }],
      lines: [
        { say: 'The polynomial is written as three factors multiplied together.', show: 't' },
        { say: 'We need the highest power of x it would have if we multiplied it out, and the number in front of that power.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Degree and leading coefficient', md: 'The **degree** is the highest power of $x$. The **leading coefficient** is the number multiplying that power.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A shortcut for a product', md: 'The highest power term of a product comes **only** from multiplying the highest power term of **each factor**.' },
      ],
      lines: [
        { say: 'Here is what we need. The degree of a polynomial is its highest power of x. The leading coefficient is the number multiplying that power.', show: 'def' },
        { say: 'And here is a shortcut. When a polynomial is a product, its highest power term comes only from multiplying the highest power term of each factor. We do not need to multiply everything out.', show: 'tip' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find the **highest power term** of each factor', '**Multiply** them together', 'Read off the **degree** and **leading coefficient**'] }],
      lines: [
        { say: 'Here is the plan. First, find the highest power term of each factor.', show: 'plan.0' },
        { say: 'Second, multiply those terms together.', show: 'plan.1' },
        { say: 'Third, read off the degree and the leading coefficient.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Each factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x \\ \\to \\ \\good{x}', '4 - x^2 \\ \\to \\ \\good{-x^2}', '2x + 1 \\ \\to \\ \\good{2x}'] }],
      lines: [
        { say: 'Step one. The first factor is just x.', show: 'm.0' },
        { say: 'In 4 minus x squared, the highest power is x squared, and its sign is negative. So we take negative x squared, not 4.', show: 'm.1' },
        { say: 'In 2 x plus 1, the highest power term is 2 x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x \\cdot ({-x^2}) \\cdot 2x', '= \\good{-2x^4}'] }],
      lines: [
        { say: 'Step two. Multiply them: x, times negative x squared, times 2 x.', show: 'm.0' },
        { say: 'The numbers give 1 times negative 1 times 2, which is negative 2. The powers add: 1 plus 2 plus 1 is 4. So the leading term is negative 2 x to the fourth.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Read it off',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{degree} = \\good{4}', '\\text{leading coefficient} = \\good{-2}'] }],
      lines: [
        { say: 'Step three. The highest power is 4, so the degree is 4.', show: 'm.0' },
        { say: 'And the number in front of it is negative 2, so the leading coefficient is negative 2.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(400), { kind: 'math', id: 'm', size: 'md', lines: ['x(4 - x^2)(2x + 1) = \\good{-2x^4} - x^3 + 8x^2 + 4x'] }],
      lines: [
        { say: 'Let us check by multiplying it all out. We get negative 2 x to the fourth, minus x cubed, plus 8 x squared, plus 4 x. The first term matches.', show: 'm.0' },
        { say: 'And here is the graph. An even degree with a negative leading coefficient means both ends point down, and that is what we see. It checks out.', show: ['gr.grid', 'gr.axes', 'gr.p'], focus: 'gr.p' },
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
            ['degree $3$', 'counting **factors**: the powers add to $1 + 2 + 1 = 4$'],
            ['leading coefficient $4$', 'the $4$ is a constant: use the **highest power** term, $-x^2$'],
            ['leading coefficient $2$', 'the minus sign on $-x^2$ is part of it'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'There are three factors, but the degree is not 3. Add the powers: 1 plus 2 plus 1 is 4.' },
        { say: 'The 4 in 4 minus x squared is the first number you see, but it is a constant. Use the highest power term, negative x squared.' },
        { say: 'And keep the minus sign. The leading coefficient is negative 2, not 2.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'What is the end behaviour of the graph of $f(x) = -3x^5 + 2x$?',
          choices: ['up on both ends', 'up on the left, down on the right', 'down on the left, up on the right', 'down on both ends'],
          answer: 1,
          working: 'The degree $5$ is odd, so the ends go opposite ways. The leading coefficient $-3$ is negative, so it falls to the right.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the end behaviour of the graph of f of x equals negative 3 x to the fifth, plus 2 x? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The degree is 5, which is odd, so the two ends go opposite ways. The leading coefficient is negative, so the graph falls on the right and rises on the left: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Degree**: the highest power of $x$', '**Leading coefficient**: the number in front of it', 'For a product, multiply the **highest power term** of each factor', 'Degree and sign decide the **end behaviour**'] }],
      lines: [
        { say: 'Here is what to remember. The degree is the highest power of x.', show: 'sum.0' },
        { say: 'The leading coefficient is the number in front of that power.', show: 'sum.1' },
        { say: 'For a product, multiply the highest power term of each factor, signs included.', show: 'sum.2' },
        { say: 'And the degree and the sign of the leading coefficient decide the end behaviour. For more on the characteristics of polynomial functions, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
