import type { Explainer } from '@/video/script.ts';

// Exam question for Math 31 lesson 4.3 (the chain rule). The question is an exercise from OpenStax
// Calculus Volume 1 (section 3.6, The Chain Rule, CC BY-NC-SA 4.0), word for word. The chain rule
// gives dy/dx = 8(x − 6/x)⁷(1 + 6/x²); 1 + 6/x² > 0, so dy/dx = 0 only when x − 6/x = 0, that is
// x² = 6 and x = ±√6, as in the book's answer. Check: y is an even power, so y ≥ 0, and y = 0 at
// x = ±√6: those are lowest points, where a tangent must be flat.

const QUESTION = 'Find the x-coordinates at which the tangent line to y = (x − 6/x)⁸ is horizontal.';

const video: Explainer = {
  id: 'xq-m31-4-3',
  lessonId: '',
  exam: {
    lesson: 'm31-4-3',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 3.6, The Chain Rule',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/3-6-the-chain-rule',
    question: QUESTION,
  },
  title: 'Exam Question: Where Is the Tangent to (x − 6/x)⁸ Horizontal? (The Chain Rule)',
  thumbnailTitle: 'Outside, Then Inside',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: find the x-coordinates where the tangent line to y = (x − 6/x)⁸ is horizontal. A horizontal tangent has slope 0, so we need dy/dx = 0. The chain rule gives dy/dx = 8(x − 6/x)⁷(1 + 6/x²). The second factor is never 0, so x − 6/x = 0, which gives x² = 6 and x = ±√6. Then we check and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Outside, Then Inside', subtitle: 'The chain rule, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the chain rule. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the $x$-coordinates at which the tangent line to $y = \\left(x - \\dfrac{6}{x}\\right)^8$ is horizontal.',
          answer: '$x = \\pm\\sqrt{6}$',
          working: '$\\dfrac{dy}{dx} = 8\\left(x - \\dfrac{6}{x}\\right)^7\\left(1 + \\dfrac{6}{x^2}\\right)$',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Find the x coordinates at which the tangent line to y equals the quantity x minus 6 over x, to the power 8, is horizontal.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{horizontal tangent} \\iff \\dfrac{dy}{dx} = 0'] },
        { kind: 'text', id: 't', size: 'md', md: 'A horizontal line has slope $0$. So find $\\dfrac{dy}{dx}$, set it to $0$, and solve for $x$.' },
      ],
      lines: [
        { say: 'Here is what it is asking. A horizontal line has slope 0, so the derivative must be 0.', show: 'm' },
        { say: 'So we find dy by dx, set it equal to 0, and solve for x.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\dfrac{d}{dx}\\big[u^n\\big] = nu^{n - 1} \\cdot \\dfrac{du}{dx}'] },
        { kind: 'callout', id: 'c', tone: 'key', title: 'The chain rule', md: 'Differentiate the **outside** (the power), keep the inside the same, then multiply by the derivative of the **inside**.' },
      ],
      lines: [
        { say: 'Here is what we need. The derivative of u to the n is n u to the n minus 1, times the derivative of u.', show: 'f' },
        { say: 'In words: differentiate the outside, the power, and leave the inside alone. Then multiply by the derivative of the inside.', show: 'c' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Inside: $u = x - 6x^{-1}$; find $\\dfrac{du}{dx}$', '**Chain rule** for $\\dfrac{dy}{dx}$', 'Set each **factor** to $0$'] }],
      lines: [
        { say: 'Here is the plan. Name the inside, x minus 6 x to the negative 1, and differentiate it.', show: 'plan.0' },
        { say: 'Use the chain rule for dy by dx.', show: 'plan.1' },
        { say: 'Then set each factor to 0.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The inside',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['u = x - 6x^{-1}', '\\dfrac{du}{dx} = 1 + 6x^{-2} = \\good{1 + \\dfrac{6}{x^2}}'] }],
      lines: [
        { say: 'Step one. The inside is x minus 6 over x, which is x minus 6 x to the negative 1.', show: 'm.0' },
        { say: 'Its derivative: x gives 1. Negative 6 x to the negative 1 gives negative 6 times negative 1, x to the negative 2, which is plus 6 over x squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The chain rule',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{dy}{dx} = 8u^7 \\cdot \\dfrac{du}{dx}', '= \\good{8\\left(x - \\dfrac{6}{x}\\right)^7\\left(1 + \\dfrac{6}{x^2}\\right)}'] }],
      lines: [
        { say: 'Step two. Bring the 8 down and take 1 off the power: 8 u to the 7. Then multiply by du by dx.', show: 'm.0' },
        { say: 'So dy by dx is 8 times x minus 6 over x, to the 7, times 1 plus 6 over x squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Set it to 0',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['1 + \\dfrac{6}{x^2} > 0 \\ \\text{always}', 'x - \\dfrac{6}{x} = 0 \\implies x^2 = 6', 'x = \\good{\\pm\\sqrt{6}}'] }],
      lines: [
        { say: 'Step three. The 8 is never 0. And 1 plus 6 over x squared is never 0 either: 6 over x squared is positive, so the sum is more than 1.', show: 'm.0' },
        { say: 'So the only way to get 0 is x minus 6 over x equals 0. Multiply by x: x squared equals 6.', show: 'm.1' },
        { say: 'So x is the square root of 6 or negative the square root of 6.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = \\sqrt{6}: \\ x - \\dfrac{6}{x} = \\sqrt{6} - \\dfrac{6}{\\sqrt{6}} = \\sqrt{6} - \\sqrt{6} = 0', 'y = 0^8 = 0, \\ \\text{and } y \\ge 0 \\text{ always} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. At root 6, 6 over root 6 is root 6, so the inside is 0, and dy by dx is 0.', show: 'm.0' },
        { say: 'It makes sense too. y is an even power, so it is never negative, and it is 0 there. Those are the lowest points of the graph, where the tangent must be flat. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$8\\left(x - \\dfrac{6}{x}\\right)^7$ only', 'you must multiply by the **inside\'s** derivative'],
            ['$1 + \\dfrac{6}{x^2} = 0$', 'it is **never** $0$: no solutions there'],
            ['Only $x = \\sqrt{6}$', '$x^2 = 6$ has **two** roots'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Forgetting to multiply by the derivative of the inside is the most common chain rule mistake.' },
        { say: '1 plus 6 over x squared is never 0, so it gives no solutions. Do not invent any.' },
        { say: 'And x squared equals 6 has two roots, positive and negative.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Where is the tangent line to $y = (x^2 - 4)^5$ horizontal?',
          choices: ['$x = 0$ only', '$x = \\pm 2$ only', '$x = 4$', '$x = 0$ and $x = \\pm 2$'],
          answer: 3,
          working: '$\\dfrac{dy}{dx} = 5(x^2 - 4)^4 \\cdot 2x = 0$, so $x = 0$ or $x^2 = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Where is the tangent line to y equals x squared minus 4, to the power 5, horizontal? Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The chain rule gives 5 times x squared minus 4 to the 4, times 2x. The 2x is 0 at x equals 0, and the bracket is 0 at x equals 2 and negative 2. All three: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Horizontal tangent: $\\dfrac{dy}{dx} = 0$', 'Chain rule: **outside** first, then times the **inside\'s** derivative', 'Set **each factor** to $0$', 'Check which factors can really be $0$'] }],
      lines: [
        { say: 'Here is what to remember. A horizontal tangent means dy by dx is 0.', show: 'sum.0' },
        { say: 'The chain rule: differentiate the outside first, then multiply by the derivative of the inside.', show: 'sum.1' },
        { say: 'Set each factor to 0.', show: 'sum.2' },
        { say: 'And check which factors can really be 0. For more on the chain rule, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
