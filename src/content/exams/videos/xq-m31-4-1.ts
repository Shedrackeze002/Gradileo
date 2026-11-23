import type { Explainer } from '@/video/script.ts';

// Exam question for Math 31 lesson 4.1 (the power, constant and sum rules). The question is an
// exercise from OpenStax Calculus Volume 1 (section 3.3, Differentiation Rules, CC BY-NC-SA 4.0):
// the book's instruction "For the following exercises, find f′(x) for each function." is put with
// the one function it asks about. Expanding first gives f(x) = 2 + 5x⁻¹, so f′(x) = −5x⁻² = −5/x²,
// as in the book's answer. Check: (f(1.001) − f(1))/0.001 = −4.995 ≈ f′(1) = −5.

const QUESTION = 'Find f′(x) for the function f(x) = x²(2/x² + 5/x³).';

const video: Explainer = {
  id: 'xq-m31-4-1',
  lessonId: '',
  exam: {
    lesson: 'm31-4-1',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 3.3, Differentiation Rules',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/3-3-differentiation-rules',
    question: QUESTION,
  },
  title: 'Exam Question: The Derivative of x²(2/x² + 5/x³) (The Power Rule)',
  thumbnailTitle: 'Simplify First, Then Differentiate',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: find f′(x) for f(x) = x²(2/x² + 5/x³). Instead of a long product rule, we multiply out first: f(x) = 2 + 5/x = 2 + 5x⁻¹. Then the power rule, the constant rule and the sum rule give f′(x) = −5x⁻² = −5/x². Then we check with a tiny secant slope and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Simplify First, Then Differentiate', subtitle: 'The power rule, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the power rule. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Find $f\'(x)$ for the function $f(x) = x^2\\left(\\dfrac{2}{x^2} + \\dfrac{5}{x^3}\\right)$.',
          answer: '$f\'(x) = -\\dfrac{5}{x^2}$',
          working: '$f(x) = 2 + 5x^{-1}$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Find f prime of x for f of x equals x squared, times the quantity 2 over x squared plus 5 over x cubed.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['f(x) = x^2\\left(\\dfrac{2}{x^2} + \\dfrac{5}{x^3}\\right)'] },
        { kind: 'text', id: 't', size: 'md', md: 'We want the derivative: the slope of $f$ at every $x$. It looks like a **product**, but multiplying out first makes it much simpler.' },
      ],
      lines: [
        { say: 'Here is what it is asking. We want the derivative, the slope of f at every x.', show: 'm' },
        { say: 'It looks like a product. But if we multiply it out first, it becomes much simpler.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'rules',
          head: ['Rule', 'In symbols'],
          rows: [
            ['Power rule', '$\\dfrac{d}{dx}x^n = nx^{n - 1}$'],
            ['Constant rule', '$\\dfrac{d}{dx}c = 0$'],
            ['Constant multiple and sum', 'differentiate **term by term**'],
            ['Negative powers', '$\\dfrac{1}{x^n} = x^{-n}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. The power rule: the derivative of x to the n is n times x to the n minus 1. Bring the power down, then take 1 off it.', show: 'rules' },
        { say: 'The derivative of a constant is 0. We can differentiate term by term, and keep any number in front.' },
        { say: 'And 1 over x to the n is x to the negative n, so the power rule works for fractions too.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['**Multiply out** the bracket', 'Write fractions as **negative powers**', 'Use the **power rule** term by term'] }],
      lines: [
        { say: 'Here is the plan. Multiply out the bracket.', show: 'plan.0' },
        { say: 'Write any fractions as negative powers.', show: 'plan.1' },
        { say: 'Then use the power rule, term by term.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Multiply out',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 \\cdot \\dfrac{2}{x^2} = 2', 'x^2 \\cdot \\dfrac{5}{x^3} = \\dfrac{5}{x}', 'f(x) = \\good{2 + \\dfrac{5}{x}}'] }],
      lines: [
        { say: 'Step one. x squared times 2 over x squared: the x squareds cancel, leaving 2.', show: 'm.0' },
        { say: 'x squared times 5 over x cubed: two of the three x\'s cancel, leaving 5 over x.', show: 'm.1' },
        { say: 'So f of x is just 2 plus 5 over x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Negative powers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{5}{x} = 5x^{-1}', 'f(x) = \\good{2 + 5x^{-1}}'] }],
      lines: [
        { say: 'Step two. 5 over x is 5 times x to the negative 1.', show: 'm.0' },
        { say: 'So f of x is 2 plus 5 x to the negative 1. Now every term is a power of x.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The power rule',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{d}{dx}(2) = 0', '\\dfrac{d}{dx}\\left(5x^{-1}\\right) = 5(-1)x^{-2} = -5x^{-2}', 'f\'(x) = \\good{-\\dfrac{5}{x^2}}'] }],
      lines: [
        { say: 'Step three. The derivative of the constant 2 is 0.', show: 'm.0' },
        { say: 'For 5 x to the negative 1: bring the negative 1 down and multiply, then take 1 off the power. Negative 1 minus 1 is negative 2. So we get negative 5 x to the negative 2.', show: 'm.1' },
        { say: 'As a fraction, f prime of x is negative 5 over x squared.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['f(1) = 7, \\quad f(1.001) = 6.995005', '\\dfrac{6.995005 - 7}{0.001} = -4.995 \\approx f\'(1) = -5 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check at x equals 1. f of 1 is 2 plus 5, which is 7. f of 1.001 is about 6.995005.', show: 'm.0' },
        { say: 'The slope of that tiny secant is negative 4.995, very close to our f prime of 1, which is negative 5. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$2x\\left(-\\dfrac{4}{x^3} - \\dfrac{15}{x^4}\\right)$', 'the derivative of a product is **not** the product of the derivatives'],
            ['$5x^{-1} \\to -5x^{0}$', 'take **1 off** the power: $-1 - 1 = -2$'],
            ['$\\dfrac{d}{dx}\\left(\\dfrac{5}{x}\\right) = \\dfrac{5}{1}$', 'differentiate a power of $x$, not the bottom alone'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'You cannot differentiate each factor and multiply. The derivative of a product is not the product of the derivatives. Multiply out first.' },
        { say: 'Negative 1 minus 1 is negative 2, not 0.' },
        { say: 'And do not differentiate the bottom of a fraction on its own. Rewrite it as a power of x first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find $f\'(x)$ for $f(x) = x^3\\left(\\dfrac{1}{x} + \\dfrac{4}{x^2}\\right)$.',
          choices: ['$3x^2\\left(-\\dfrac{1}{x^2} - \\dfrac{8}{x^3}\\right)$', '$2x + 4$', '$x^2 + 4x$', '$2x + 4x^{-1}$'],
          answer: 1,
          working: '$f(x) = x^2 + 4x$, so $f\'(x) = 2x + 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find f prime of x for f of x equals x cubed, times the quantity 1 over x plus 4 over x squared. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'Multiply out: x squared plus 4x. The power rule gives 2x plus 4. Choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['**Simplify** before you differentiate', '$\\dfrac{1}{x^n} = x^{-n}$', 'Power rule: bring the power down, **take 1 off**', 'Constants differentiate to $0$'] }],
      lines: [
        { say: 'Here is what to remember. Simplify before you differentiate.', show: 'sum.0' },
        { say: 'Write 1 over x to the n as x to the negative n.', show: 'sum.1' },
        { say: 'The power rule: bring the power down, then take 1 off it.', show: 'sum.2' },
        { say: 'And constants differentiate to 0. For more on the power rule, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
