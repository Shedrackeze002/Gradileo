import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-1 lesson 6.1 (reciprocal, quotient and Pythagorean identities). The
// question is an exercise from OpenStax Precalculus 2e, word for word (section 7.1, Solving
// Trigonometric Equations with Identities, CC BY-NC-SA 4.0), with its set's instruction in front of
// it. tan x sin x = sin²x/cos x and sec x cos²x = cos x, so the sum is (sin²x + cos²x)/cos x =
// 1/cos x = sec x, as in the book's answer.

const QUESTION = 'Use the fundamental identities to fully simplify the expression. tan x sin x + sec x cos²x';

const video: Explainer = {
  id: 'xq-m301-6-1',
  lessonId: '',
  exam: {
    lesson: 'm301-6-1',
    source: 'OpenStax, Precalculus 2e, Exercise in section 7.1, Solving Trigonometric Equations with Identities',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/7-1-solving-trigonometric-equations-with-identities',
    question: QUESTION,
  },
  title: 'Exam Question: Simplify tan x sin x + sec x cos²x (Reciprocal, Quotient and Pythagorean Identities)',
  thumbnailTitle: 'Simplify tan x sin x + sec x cos²x',
  thumbnail: 'ids',
  summary:
    'A real test question, solved one small step at a time: use the fundamental identities to simplify tan x sin x + sec x cos²x. We write everything in sine and cosine, put the two terms over cos x, and the Pythagorean identity turns the top into 1, so the answer is sec x. Then we check with a value of x and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Simplify tan x sin x + sec x cos²x', subtitle: 'Reciprocal, quotient and Pythagorean identities, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about trigonometric identities. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Precalculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Use the fundamental identities to fully simplify the expression. $\\tan x \\sin x + \\sec x \\cos^2 x$',
          answer: '$\\sec x$',
          working: '$\\dfrac{\\sin^2 x}{\\cos x} + \\cos x = \\dfrac{\\sin^2 x + \\cos^2 x}{\\cos x} = \\dfrac{1}{\\cos x}$',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Use the fundamental identities to fully simplify the expression. tan x sin x, plus sec x cos squared x.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Rewrite the expression as **one simple** trigonometric expression that is **equal** to it for every $x$ where both are defined.' }],
      lines: [
        { say: 'We need to rewrite the expression as one simple trigonometric expression.', show: 't' },
        { say: 'It must be equal to the original for every x where both are defined, so we may only use identities.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'ids', size: 'lg', lines: ['\\text{quotient: } \\tan x = \\dfrac{\\sin x}{\\cos x}', '\\text{reciprocal: } \\sec x = \\dfrac{1}{\\cos x}', '\\text{Pythagorean: } \\sin^2 x + \\cos^2 x = 1'] },
      ],
      lines: [
        { say: 'Here is what we need. The quotient identity: tan x is sin x over cos x.', show: 'ids.0' },
        { say: 'The reciprocal identity: sec x is 1 over cos x.', show: 'ids.1' },
        { say: 'And the Pythagorean identity: sin squared x plus cos squared x is 1.', show: 'ids.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write everything in **sine** and **cosine**', 'Put the terms over a **common denominator**', 'Use $\\sin^2 x + \\cos^2 x = 1$'] }],
      lines: [
        { say: 'Here is the plan. First, write everything in terms of sine and cosine.', show: 'plan.0' },
        { say: 'Second, put the two terms over a common denominator.', show: 'plan.1' },
        { say: 'Third, use the Pythagorean identity.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Sine and cosine',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\tan x \\sin x = \\dfrac{\\sin x}{\\cos x} \\cdot \\sin x = \\good{\\dfrac{\\sin^2 x}{\\cos x}}', '\\sec x \\cos^2 x = \\dfrac{1}{\\cos x} \\cdot \\cos^2 x = \\good{\\cos x}'] }],
      lines: [
        { say: 'Step one. tan x is sin x over cos x, so tan x times sin x is sin squared x over cos x.', show: 'm.0' },
        { say: 'sec x is 1 over cos x, so sec x times cos squared x is cos x. One cos x cancels.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Common denominator',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\sin^2 x}{\\cos x} + \\cos x', '= \\dfrac{\\sin^2 x}{\\cos x} + \\dfrac{\\cos^2 x}{\\cos x}', '= \\good{\\dfrac{\\sin^2 x + \\cos^2 x}{\\cos x}}'] }],
      lines: [
        { say: 'Step two. Now we have sin squared x over cos x, plus cos x.', show: 'm.0' },
        { say: 'Write cos x as cos squared x over cos x, so both terms have the same denominator.', show: 'm.1' },
        { say: 'Add the tops: sin squared x plus cos squared x, all over cos x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Pythagorean identity',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['= \\dfrac{1}{\\cos x}', '= \\good{\\sec x}'] }],
      lines: [
        { say: 'Step three. The top, sin squared x plus cos squared x, is 1. So we have 1 over cos x.', show: 'm.0' },
        { say: 'And 1 over cos x is sec x. The expression simplifies to sec x.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = \\dfrac{\\pi}{3}: \\quad \\sqrt{3} \\cdot \\dfrac{\\sqrt{3}}{2} + 2 \\cdot \\dfrac{1}{4} = \\dfrac{3}{2} + \\dfrac{1}{2} = 2', '\\sec\\dfrac{\\pi}{3} = \\dfrac{1}{1/2} = 2 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with x equals pi over 3. tan is root 3, sin is root 3 over 2, sec is 2, and cos squared is one quarter. The original is 3 halves plus one half, which is 2.', show: 'm.0' },
        { say: 'And sec of pi over 3 is 1 over one half, which is 2. They match. It checks out.', show: 'm.1', focus: 'm.1' },
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
            ['$\\dfrac{\\sin^2 x}{\\cos x} + \\cos x = \\dfrac{\\sin^2 x + \\cos x}{\\cos x}$', 'turn $\\cos x$ into $\\dfrac{\\cos^2 x}{\\cos x}$ first'],
            ['$\\sec x = \\dfrac{1}{\\sin x}$', 'that is $\\csc x$; $\\sec x = \\dfrac{1}{\\cos x}$'],
            ['stopping at $\\dfrac{1}{\\cos x}$', '"fully simplify": write it as $\\sec x$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'You cannot just add cos x to the top. Rewrite it over the common denominator first, as cos squared x over cos x.' },
        { say: 'Do not mix up the reciprocals. sec is 1 over cos, and csc is 1 over sin.' },
        { say: 'And fully simplify: 1 over cos x is sec x.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Simplify $\\sin x \\cot x$.',
          choices: ['$\\tan x$', '$\\cos x$', '$\\sec x$', '$1$'],
          answer: 1,
          working: '$\\sin x \\cdot \\dfrac{\\cos x}{\\sin x} = \\cos x$',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify sin x cot x. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'cot x is cos x over sin x. Times sin x, the sines cancel, leaving cos x: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write everything in **sine** and **cosine**', 'Use a **common denominator** to add', '$\\sin^2 x + \\cos^2 x = 1$', 'Check with a value of $x$'] }],
      lines: [
        { say: 'Here is what to remember. Write everything in sine and cosine.', show: 'sum.0' },
        { say: 'Use a common denominator to add fractions.', show: 'sum.1' },
        { say: 'Look for sin squared plus cos squared, which is 1.', show: 'sum.2' },
        { say: 'And check with a value of x. For more on the reciprocal, quotient and Pythagorean identities, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
