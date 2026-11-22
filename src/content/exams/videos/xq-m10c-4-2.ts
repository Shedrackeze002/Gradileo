import type { Explainer } from '@/video/script.ts';

// Exam question for Math 10 lesson 4.2 (multiplying larger polynomials): (b + 3)(2b² − 5b + 8) by
// the Distributive Property. The question is OpenStax Elementary Algebra 2e's own worked example,
// word for word (section 6.3, Multiply Polynomials, CC BY-NC-SA 4.0). Six products:
// 2b³ − 5b² + 8b + 6b² − 15b + 24 = 2b³ + b² − 7b + 24.

const QUESTION = 'Multiply using the Distributive Property: (b + 3)(2b² − 5b + 8).';

const video: Explainer = {
  id: 'xq-m10c-4-2',
  lessonId: '',
  exam: {
    lesson: 'm10c-4-2',
    source: 'OpenStax, Elementary Algebra 2e, Example in section 6.3, Multiply Polynomials',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/elementary-algebra-2e/pages/6-3-multiply-polynomials',
    question: QUESTION,
  },
  title: 'Exam Question: Multiply (b + 3)(2b² − 5b + 8). A Binomial Times a Trinomial',
  thumbnailTitle: 'A Binomial Times a Trinomial',
  thumbnail: 'box',
  summary:
    'A real test question, solved one small step at a time: we multiply the binomial (b + 3) by the trinomial (2b² − 5b + 8). We distribute each term of the binomial over all three terms of the trinomial, set the six products out in a grid, and collect like terms to get 2b³ + b² − 7b + 24. Then we check by putting in a number and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'A Binomial Times a Trinomial', subtitle: 'The distributive property, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about multiplying a binomial by a trinomial. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Elementary Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [{ kind: 'try', id: 'q', kicker: 'The question', prompt: 'Multiply using the Distributive Property: $(b + 3)(2b^2 - 5b + 8)$.', answer: '$2b^3 + b^2 - 7b + 24$', working: '$2b^3 - 5b^2 + 8b + 6b^2 - 15b + 24 = 2b^3 + b^2 - 7b + 24$.' }],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Multiply using the distributive property: b plus 3, times 2 b squared, minus 5 b, plus 8.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\underbrace{(b + 3)}_{2\\text{ terms}}\\,\\underbrace{(2b^2 - 5b + 8)}_{3\\text{ terms}}'] },
        { kind: 'text', id: 't', size: 'md', md: '$2 \\times 3 = 6$ products, then **collect like terms**. FOIL is only for two binomials.' },
      ],
      lines: [
        { say: 'The first bracket has two terms, a binomial. The second has three terms, a trinomial.', show: 'm' },
        { say: 'Every term in the first must multiply every term in the second. That is 2 times 3, six products, which we then add up and simplify. FOIL only covers four products, so we need the distributive property.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['a(x + y + z) = ax + ay + az', 'b \\cdot b^2 = b^3, \\quad b \\cdot b = b^2'] },
        { kind: 'text', id: 't', size: 'md', md: '**Like terms** have the same variable and the same exponent: $-5b^2$ and $6b^2$ are like terms.' },
      ],
      lines: [
        { say: 'Here is what we need. The distributive property: a number outside a bracket multiplies every term inside.', show: 'f.0' },
        { say: 'When we multiply powers of b, we add the exponents: b times b squared is b cubed, and b times b is b squared.', show: 'f.1' },
        { say: 'And like terms have the same variable with the same exponent, so they can be added. Minus 5 b squared and 6 b squared are like terms.', show: 't' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Distribute $b$ over the trinomial', 'Distribute $3$ over the trinomial', '**Collect** like terms'] }],
      lines: [
        { say: 'Here is the plan. First, distribute b over the trinomial.', show: 'plan.0' },
        { say: 'Second, distribute 3 over the trinomial.', show: 'plan.1' },
        { say: 'Third, collect the like terms.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Distribute',
      layout: 'center',
      main: [
        { kind: 'table', id: 'box', head: ['$\\times$', '$2b^2$', '$-5b$', '$+8$'], rows: [['$b$', '$2b^3$', '$-5b^2$', '$+8b$'], ['$+3$', '$+6b^2$', '$-15b$', '$+24$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['b(2b^2 - 5b + 8) = 2b^3 - 5b^2 + 8b', '3(2b^2 - 5b + 8) = 6b^2 - 15b + 24'] },
      ],
      lines: [
        { say: 'Step one. Multiply b by each term of the trinomial: b times 2 b squared is 2 b cubed, b times minus 5 b is minus 5 b squared, and b times 8 is 8 b.', show: ['box', 'm.0'] },
        { say: 'Then multiply 3 by each term: 6 b squared, minus 15 b, and plus 24. The grid shows all six products.', show: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Collect like terms',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2b^3 \\underbrace{- 5b^2 + 6b^2}_{b^2} \\underbrace{+ 8b - 15b}_{-7b} + 24', '= \\good{2b^3 + b^2 - 7b + 24}'] }],
      lines: [
        { say: 'Step two. Put the six products together and look for like terms. There is one b cubed term. Minus 5 b squared plus 6 b squared is 1 b squared. 8 b minus 15 b is minus 7 b. And 24 is on its own.', show: 'm.0' },
        { say: 'So the answer is 2 b cubed, plus b squared, minus 7 b, plus 24.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['b = 1: \\quad (1 + 3)(2 - 5 + 8) = 4 \\times 5 = 20', '2 + 1 - 7 + 24 = 20 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check by putting in a number. Try b equals 1. The question becomes 4 times 5, which is 20.', show: 'm.0' },
        { say: 'Our answer becomes 2 plus 1 minus 7 plus 24, which is also 20. They match.', show: 'm.1' },
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
            ['Multiplying the 3 by the first term only', 'only $4$ products: every term times **every** term'],
            ['$b \\cdot b^2 = b^2$', 'add the exponents: $b^3$'],
            ['$-5b^2 + 6b^2 = 11b^2$', 'keep the signs: $-5 + 6 = 1$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Forgetting to multiply 3 by all three terms leaves out products. There must be six.' },
        { say: 'b times b squared is b cubed, not b squared. Add the exponents.' },
        { say: 'And watch the signs when collecting: minus 5 plus 6 is 1, not 11.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Multiply: $(x - 2)(x^2 + 3x - 1)$.',
          choices: ['$x^3 + x^2 - 7x - 2$', '$x^3 + 5x^2 + 5x - 2$', '$x^3 + x^2 - 7x + 2$', '$x^3 + 3x^2 - x - 2$'],
          answer: 2,
          working: '$x^3 + 3x^2 - x - 2x^2 - 6x + 2 = x^3 + x^2 - 7x + 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Multiply x minus 2, times x squared plus 3 x minus 1. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'x times the trinomial is x cubed plus 3 x squared minus x. Minus 2 times it is minus 2 x squared minus 6 x plus 2. Collect: x cubed plus x squared minus 7 x plus 2, choice C. A got minus 2 times minus 1 wrong, B used plus 2 instead of minus 2, and D just added the minus 2 on the end instead of multiplying.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Every** term times **every** term', 'Binomial times trinomial: $2 \\times 3 = 6$ products', 'Collect **like terms**, keeping the signs', 'Check by putting in a number'] }],
      lines: [
        { say: 'Here is what to remember. Multiply every term in one bracket by every term in the other.', show: 'sum.0' },
        { say: 'A binomial times a trinomial gives six products.', show: 'sum.1' },
        { say: 'Collect like terms, keeping the signs.', show: 'sum.2' },
        { say: 'And check by putting in a number. For more on multiplying polynomials, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
