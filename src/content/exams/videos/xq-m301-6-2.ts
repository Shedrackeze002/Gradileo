import type { Explainer } from '@/video/script.ts';

// Exam question for Math 30-1 lesson 6.2 (sum, difference and double-angle identities). The
// question is an exercise from OpenStax Precalculus 2e, word for word (section 7.2, Sum and
// Difference Identities, CC BY-NC-SA 4.0), with its set's instruction in front of it. π/12 is
// π/3 − π/4, so cos(π/12) = cos(π/3)cos(π/4) + sin(π/3)sin(π/4) = √2/4 + √6/4 = (√2 + √6)/4, as in
// the book's answer (about 0.9659, which is cos 15°).

const QUESTION = 'Find the exact value. cos(π/12)';

const video: Explainer = {
  id: 'xq-m301-6-2',
  lessonId: '',
  exam: {
    lesson: 'm301-6-2',
    source: 'OpenStax, Precalculus 2e, Exercise in section 7.2, Sum and Difference Identities',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/precalculus-2e/pages/7-2-sum-and-difference-identities',
    question: QUESTION,
  },
  title: 'Exam Question: The Exact Value of cos(π/12) (Sum, Difference and Double-Angle Identities)',
  thumbnailTitle: 'The Exact Value of cos(π/12)',
  thumbnail: 'ids',
  summary:
    'A real test question, solved one small step at a time: find the exact value of cos(π/12). π/12 is not a special angle, but it is π/3 − π/4, the difference of two special angles. The difference identity for cosine then gives (√2 + √6)/4. Then we check with a calculator and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'The Exact Value of cos(π/12)', subtitle: 'Sum and difference identities, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about the sum and difference identities. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Find the exact value. $\\cos\\left(\\dfrac{\\pi}{12}\\right)$',
          answer: '$\\dfrac{\\sqrt{2} + \\sqrt{6}}{4}$',
          working: '$\\dfrac{\\pi}{12} = \\dfrac{\\pi}{3} - \\dfrac{\\pi}{4}$, then use $\\cos(A - B) = \\cos A \\cos B + \\sin A \\sin B$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Find the exact value of cos of pi over 12.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: '$\\dfrac{\\pi}{12}$ is $15^\\circ$. It is **not** on the unit circle we know, and **exact** means no calculator decimals: the answer uses roots, like $\\dfrac{\\sqrt{3}}{2}$.' }],
      lines: [
        { say: 'Pi over 12 is 15 degrees. It is not one of the special angles we know on the unit circle.', show: 't' },
        { say: 'And exact means no calculator decimals. The answer will have square roots in it, like root 3 over 2.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'ids', size: 'lg', lines: ['\\cos(A - B) = \\cos A \\cos B + \\sin A \\sin B', '\\cos(A + B) = \\cos A \\cos B - \\sin A \\sin B'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Split the angle', md: 'Write the angle as a **sum or difference** of special angles, like $\\dfrac{\\pi}{3}$, $\\dfrac{\\pi}{4}$ and $\\dfrac{\\pi}{6}$.' },
      ],
      lines: [
        { say: 'Here is what we need. cos of A minus B is cos A cos B, plus sin A sin B. Notice the sign flips: a minus inside gives a plus outside.', show: 'ids.0' },
        { say: 'And cos of A plus B is cos A cos B, minus sin A sin B.', show: 'ids.1' },
        { say: 'To use them, split the angle into a sum or difference of special angles.', show: 'tip' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $\\dfrac{\\pi}{12}$ as a **difference** of special angles', 'Use the **difference identity**', 'Put in the **exact values** and simplify'] }],
      lines: [
        { say: 'Here is the plan. First, write pi over 12 as a difference of two special angles.', show: 'plan.0' },
        { say: 'Second, use the difference identity for cosine.', show: 'plan.1' },
        { say: 'Third, put in the exact values and simplify.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Split the angle',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\pi}{3} - \\dfrac{\\pi}{4} = \\dfrac{4\\pi}{12} - \\dfrac{3\\pi}{12} = \\dfrac{\\pi}{12}', '\\cos\\dfrac{\\pi}{12} = \\good{\\cos\\left(\\dfrac{\\pi}{3} - \\dfrac{\\pi}{4}\\right)}'] }],
      lines: [
        { say: 'Step one. Pi over 3 is 4 pi over 12, and pi over 4 is 3 pi over 12. Their difference is pi over 12. In degrees, that is 60 minus 45, which is 15.', show: 'm.0' },
        { say: 'So cos of pi over 12 is cos of pi over 3 minus pi over 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: The identity',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['= \\cos\\dfrac{\\pi}{3} \\cos\\dfrac{\\pi}{4} + \\sin\\dfrac{\\pi}{3} \\sin\\dfrac{\\pi}{4}', '= \\dfrac{1}{2} \\cdot \\dfrac{\\sqrt{2}}{2} + \\dfrac{\\sqrt{3}}{2} \\cdot \\dfrac{\\sqrt{2}}{2}'] }],
      lines: [
        { say: 'Step two. Use the difference identity: cos pi over 3 times cos pi over 4, plus sin pi over 3 times sin pi over 4.', show: 'm.0' },
        { say: 'Now the exact values. cos pi over 3 is one half, cos pi over 4 is root 2 over 2, sin pi over 3 is root 3 over 2, and sin pi over 4 is root 2 over 2.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: Simplify',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['= \\dfrac{\\sqrt{2}}{4} + \\dfrac{\\sqrt{6}}{4}', '= \\good{\\dfrac{\\sqrt{2} + \\sqrt{6}}{4}}'] }],
      lines: [
        { say: 'Step three. One half times root 2 over 2 is root 2 over 4. And root 3 times root 2 is root 6, so the second product is root 6 over 4.', show: 'm.0' },
        { say: 'Both have 4 on the bottom, so cos of pi over 12 is root 2 plus root 6, all over 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{\\sqrt{2} + \\sqrt{6}}{4} \\approx \\dfrac{1.414 + 2.449}{4} \\approx 0.9659', '\\cos 15^\\circ \\approx 0.9659 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with a calculator. Root 2 is about 1.414 and root 6 is about 2.449. Their sum over 4 is about 0.9659.', show: 'm.0' },
        { say: 'And cos of 15 degrees is about 0.9659. They match. It also makes sense: 15 degrees is a small angle, so its cosine is close to 1.', show: 'm.1', focus: 'm.1' },
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
            ['$\\cos\\dfrac{\\pi}{3} - \\cos\\dfrac{\\pi}{4}$', 'cosine does **not** split over a minus: use the identity'],
            ['$\\cos A \\cos B - \\sin A \\sin B$', 'that is $\\cos(A + B)$; a **minus** inside gives a **plus**'],
            ['$\\sqrt{3} \\cdot \\sqrt{2} = \\sqrt{5}$', 'roots **multiply**: $\\sqrt{3} \\cdot \\sqrt{2} = \\sqrt{6}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'cos of pi over 3 minus pi over 4 is not cos pi over 3 minus cos pi over 4. Cosine does not split like that. That is why we need the identity.' },
        { say: 'Watch the sign. For cos of a difference, the middle sign is plus.' },
        { say: 'And root 3 times root 2 is root 6, not root 5. Roots multiply, they do not add.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the exact value of $\\sin 75^\\circ$. (Hint: $75^\\circ = 45^\\circ + 30^\\circ$ and $\\sin(A + B) = \\sin A \\cos B + \\cos A \\sin B$.)',
          choices: ['$\\dfrac{\\sqrt{6} - \\sqrt{2}}{4}$', '$\\dfrac{\\sqrt{3} + 1}{2}$', '$\\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$', '$\\dfrac{\\sqrt{3} + \\sqrt{2}}{2}$'],
          answer: 2,
          working: '$\\dfrac{\\sqrt{2}}{2} \\cdot \\dfrac{\\sqrt{3}}{2} + \\dfrac{\\sqrt{2}}{2} \\cdot \\dfrac{1}{2} = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$',
        },
      ],
      lines: [
        { say: 'Your turn. Find the exact value of sin 75 degrees. Use 75 equals 45 plus 30, and sin of A plus B is sin A cos B plus cos A sin B. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'sin 45 times cos 30 is root 6 over 4. cos 45 times sin 30 is root 2 over 4. Add them: root 6 plus root 2, all over 4: choice C.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Split the angle into **special angles**', '$\\cos(A - B) = \\cos A \\cos B + \\sin A \\sin B$', 'Put in the **exact values** and multiply the roots', 'Check with a calculator'] }],
      lines: [
        { say: 'Here is what to remember. Split the angle into a sum or difference of special angles.', show: 'sum.0' },
        { say: 'cos of A minus B is cos A cos B plus sin A sin B.', show: 'sum.1' },
        { say: 'Put in the exact values, and multiply the roots carefully.', show: 'sum.2' },
        { say: 'And check with a calculator. For more on the sum, difference and double-angle identities, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
